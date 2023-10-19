import { compareSync } from "bcrypt";
import examModel, { questionSchema } from "../models/exam";
import examinerModel from "../models/examiner";
import studentModel from "../models/student";
import reportModel from "../models/report";
import dotenv from "dotenv";
import { sign, verify } from "jsonwebtoken";
import { Examiner } from "../interfaces/examiner";
import { Exam } from "../interfaces/exam";
import { Question } from "../interfaces/question";
import { createTransport, SendMailOptions } from "nodemailer";
import crypto from "crypto";
import { writeFileSync } from "fs";
dotenv.config();
const SECRET = process.env.SECRET || "";

// Identity
export const getExaminerId = async ({ username }: { username: string }) => {
  let examiner = await examinerModel.findOne({ username });
  if (examiner == null) return new Error("Invalid Username");
  return examiner._id;
};

export const loginExaminer = async ({
  username,
  password,
}: Pick<Examiner, "username" | "password">) => {
  try {
    let examiner = await examinerModel.findOne({ _id: username });
    if (examiner == null) throw {};
    if (!compareSync(password, examiner.password))
      throw new Error("Invalid Credentials");
    let token = sign({ username, password }, SECRET, { expiresIn: "1d" });
    return token;
  } catch (err) {
    throw new Error("Invalid Credentials");
  }
};

export const registerExaminer = async ({
  name,
  username,
  password,
  instituteName,
  instituteLogo,
}: Omit<Examiner, "email" | "emailPassword">) => {
  try {
    await examinerModel.create({
      name,
      username,
      password,
      instituteName,
      instituteLogo,
    });
    let token = sign({ username, password }, SECRET, { expiresIn: "1d" });
    return token;
  } catch (err) {
    throw new Error("Cannot register examiner with this credentials.");
  }
};

// Manage Exams
export const createExam = async (
  examobj: Omit<Exam, "questions" | "createdAt">
) => {
  try {
    await examModel.create(examobj);
  } catch (error) {
    throw new Error("Could not create exam, try again later!!");
  }
};

export const getExams = async ({ examinerId }: { examinerId: string }) => {
  try {
    let exams = await examModel
      .find(
        { examinerId },
        {
          questions: 0,
        }
      )
      .sort({ startedAt: -1 });
    return exams;
  } catch (error) {
    throw new Error("Cannot get exams");
  }
};

export const deleteExam = async ({
  examId,
  examinerId,
}: {
  examId: string;
  examinerId: string;
}) => {
  try {
    let exam = await examModel.findById(examId);
    if (exam == null) throw new Error("Cannot delete exam, try again later!!");
    if (exam?.examinerId == examinerId) {
      await reportModel.deleteMany({ examId });
      await exam.delete();
    } else throw new Error("Do not have required credentials to delete exam");
  } catch (error) {
    throw new Error("Cannot delete exam, try again later!!");
  }
};

export const addQuestions = async ({
  examId,
  questions,
  examinerId,
}: {
  examId: string;
  questions: Question[];
  examinerId: string;
}) => {
  // strictly edit questions before start time of exam.
  try {
    let exam = await examModel.findOne({ examinerId, _id: examId });
    if (exam == null) throw Error();
    if (new Date(Date.now()) < exam.startedAt) {
      await exam.update({
        $push: { questions: { $each: questions } },
      });
      await exam.save();
    } else throw Error();
  } catch (error) {
    throw new Error("Cannot add questions, try again later!!");
  }
};

export const editQuestion = async ({
  examId,
  questionId,
  question,
}: {
  examId: string;
  questionId: string;
  question: Question;
}) => {
  // strictly edit questions before start time of exam.
  try {
    let exam = await examModel.findById(examId);
    if (exam == null) throw Error();
    if (new Date(Date.now()) < exam.startedAt) {
      await examModel.findOneAndUpdate(
        { _id: examId, "questions.id": questionId },
        {
          $set: { "questions.$": question },
        }
      );
    } else throw Error();
  } catch (error) {
    throw new Error("Cannot edit questions, try again later!!");
  }
};

export const editEndTime = async ({
  examId,
  updatedEndsAt,
}: {
  examId: string;
  updatedEndsAt: Date;
}) => {
  // for specific exam edit end time
  try {
    await examModel.findByIdAndUpdate(examId, {
      $set: { endsAt: updatedEndsAt },
    });
  } catch (error) {
    throw new Error("Cannot update test end time, try again later!!");
  }
};

export const editStartTime = async ({
  examId,
  updatedStartsAt,
}: {
  examId: string;
  updatedStartsAt: Date;
}) => {
  // for specific exam edit end time
  try {
    await examModel.findByIdAndUpdate(examId, {
      $set: { startedAt: updatedStartsAt },
    });
  } catch (error) {
    throw new Error("Cannot update test start time, try again later!!");
  }
};

export const endAllExams = async ({ examId }: { examId: string }) => {
  try {
    await reportModel.updateMany({ examId }, { $set: { isExamEnded: true } });
  } catch (error) {
    throw new Error("Couldn't end all exams, try again later!!");
  }
};

// Edit Profile
export const editExaminerDetails = async (obj: Partial<Examiner>) => {
  try {
    obj = Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v !== undefined)
    );
    await examinerModel.findOneAndUpdate({ username: obj.username }, obj);
  } catch (error) {
    throw new Error("Could not edit profile, try again later!!");
  }
};

// Manage Students
export const removeStudent = async ({ rollno }: { rollno: string }) => {
  try {
    await studentModel.deleteOne({ rollno });
  } catch (error) {
    throw new Error("Couldn't remove student, try again later");
  }
};

export const resetStudentSession = async ({ rollno }: { rollno: string }) => {
  try {
    await studentModel.findOneAndUpdate(
      { rollno },
      {
        $set: { isLoggedIn: false },
      }
    );
  } catch (error) {
    throw new Error("Couldn't update student session, try again later!!");
  }
};

// Manage Reports - TODO: Incomplete pdf generate
export const generateReports = async ({ examId }: any) => {
  try {
    let reports = await reportModel.find({ examId });
    await Promise.all(
      reports.map(async (report) => {
        let positiveMarks = 0,
          questionsAnswered = 0,
          questionUnanswered = 0,
          questionsCorrect = 0,
          questionIncorrect = 0,
          negativeMarks = 0,
          totalQuestions = 0,
          maxMarks = 0;
        totalQuestions = report.questions.length;
        report.questions.forEach((v) => {
          maxMarks += v.positiveMarks;
          if (v.selectedAnswer === "" || v.selectedAnswer === undefined)
            questionUnanswered++;
          else if (v.correctAnswer === v.selectedAnswer) {
            questionsAnswered++;
            questionsCorrect++;
            positiveMarks += v.positiveMarks;
          } else {
            questionsAnswered++;
            questionIncorrect++;
            negativeMarks += v.negativeMarks;
          }
        });
        report.positiveMarks = positiveMarks;
        report.negativeMarks = negativeMarks;
        report.totalMarks = positiveMarks - negativeMarks;
        report.questionsCorrect = questionsCorrect;
        report.questionsWrong = questionIncorrect;
        report.questionUnanswered = questionUnanswered;
        report.questionAnswered = questionsAnswered;
        report.totalQuestions = totalQuestions;
        report.percentage = ((positiveMarks - negativeMarks) / maxMarks) * 100;
        report.percentage < 0
          ? (report.percentage = 0)
          : report.percentage.toPrecision(4);
        report.maxMarks = maxMarks;
        await report.save();
      })
    );
    // generate PDF for a specific report
    let l: [] = [];
    let reports1: any = reports.map((report) => {
      return {
        rollno: report.rollno,
        name: report.name,
        positiveMarks: report.positiveMarks,
        negativeMarks: report.negativeMarks,
        totalMarks: report.totalMarks,
      };
    });
    let maxMarks = reports[0].maxMarks;
    let avgMarks = await reportModel.aggregate([
      {
        $group: {
          examId: examId,
          averageMarks: { $avg: "$totalMarks" },
        },
      },
    ]);
    avgMarks = avgMarks[0]?.averageMarks;

    let csvContent = "";
    let keys = Object.keys(reports1[0]);
    csvContent += keys.join(",") + "\n";
    reports1 = reports1.map((report: any) => {
      return Object.values(report).join(",");
    });
    reports1 = reports1.join("\n");
    csvContent += reports1 + "\n";
    csvContent += `Average Marks: ${avgMarks}\n`;
    csvContent += `Max Marks: ${maxMarks}\n`;

    writeFileSync(`./files/report_${examId}.csv`, csvContent);
    return `./files/report_${examId}.csv`;
    // send pdf to each student
  } catch (error) {
    throw new Error("Process failed, try again later!!");
  }
};

export const getExamReport = async ({ examId }: { examId: string }) => {
  try {
    let reports = await reportModel.find({ examId });
    return reports;
  } catch (error) {
    throw new Error("Process failed, try again later!!");
  }
};

const generatePassString = () => {
  return crypto.randomBytes(4).toString("hex");
};

export const sendPassword = async ({
  rollno,
  examinerId,
}: {
  rollno: string;
  examinerId: string;
}) => {
  // use examiner email id and password to create and send password to a student in his/her email.
  const newPass = generatePassString();
  try {
    let examiner = await examinerModel.findById(examinerId);
    if (examiner?.email == undefined)
      throw new Error("Couldn't find proper credentials to send email");
    let st = await studentModel.findOne({ rollno });
    if (st == null) throw new Error("No student find with given rollno");

    st.isLoggedIn = false;
    st.password = newPass;
    await st.save();

    let gmailTransport =  createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: examiner.email, // mail id
        pass: examiner.emailPassword, // password
      },
    });

    let message: SendMailOptions = {
      from: examiner.email,
      to: st.email, // reciever's email address
      subject: "Your new Password", // subject of email
      html: `<h1>Dear ${st.name}, Your password is ${newPass}</h1>`, // html as string,
      // attachments: [{ filename: "", content: "" }], // attach files mention filename, content as base64 string
    };
    await gmailTransport.sendMail(message);
  } catch (error) {
    throw new Error("Couldn't Send Email, try again later!!");
  }
};

