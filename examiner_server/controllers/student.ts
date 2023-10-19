import studentModel from "../models/student";
import examModel from "../models/exam";
import { Student } from "../interfaces/student";
import { sign, verify } from "jsonwebtoken";
import { compareSync } from "bcrypt";
import reportModel from "../models/report";

import dotenv from "dotenv";

dotenv.config();
const SECRET = process.env.SECRET || "";

// Identity Controllers

/**
 * Registers a student.
 *
 * @param {Student} p - The student object to register.
 * @return {Promise<string>} The token generated after successful registration.
 * @throws {Error} Throws an error if the student cannot be registered with the given credentials.
 */
export const registerStudent = async (p: Student) => {
  try {
    let student = await studentModel.create({ ...p });
    let token = await generateToken({
      rollno: student.rollno,
      password: student.password,
    });
    return token;
  } catch (err) {
    throw new Error("Cannot register student with this credentials.");
  }
};

/**
 * Generates a token based on the provided roll number and password.
 *
 * @param {Object} params - The parameters for generating the token.
 * @param {string} params.rollno - The roll number.
 * @param {string} params.password - The password.
 * @return {Promise<string>} The generated token.
 */
export const generateToken = async ({
  rollno,
  password,
}: {
  rollno: string;
  password: string;
}): Promise<string> => {
  try {
    let token = sign({ rollno, password }, SECRET, { expiresIn: "1d" });
    return token;
  } catch (error) {
    throw new Error("Cannot Create Token");
  }
};

/**
 * Verifies a token.
 *
 * @param {Object} token - The token to be verified.
 * @param {string} token.token - The token string.
 * @return {Promise<any>} The decoded token.
 */
export const verifyToken = async ({ token }: { token: string }) => {
  try {
    let d = verify(token, SECRET);
    return d;
  } catch (error) {
    throw new Error("Invalid Token");
  }
};

export const loginStudent = async ({
  rollno,
  password,
}: {
  rollno: string;
  password: string;
}) => {
  try {
    let student = await studentModel.findOne({ rollno });
    if (student == null)
      throw new Error("Couldn't find user, with given credentials");
    if (!compareSync(password, student.password))
      throw new Error("Invalid Credentials");
    let token = await generateToken({ rollno, password });
    student.isLoggedIn = true;
    await student.save();
    return token;
  } catch (error) {
    throw new Error("Cannot Login Student");
  }
};

// Logout student
export const logoutStudent = async ({ rollno }: { rollno: string }) => {
  try {
    let student = await studentModel.findOne({ rollno });
    if (student) {
      student.isLoggedIn = false;
      await student.save();
    } else {
      throw new Error("Could not find student with this rollno");
    }
  } catch (error) {
    throw new Error("Cannot Logout Student");
  }
};

// select exams
export const getExams = async () => {
  try {
    let exams = await examModel
      .find(
        {},
        {
          questions: 0,
        }
      )
      .sort({ startedAt: -1 });
    return exams.map((e) => {
      return {};
    });
  } catch (error) {
    throw new Error("Cannot get exams");
  }
};

export const getExam = async ({ examId }: { examId: string }) => {
  try {
    let exam = await examModel.findById(examId, {
      "questions.$.correctAnswer": 0,
    });
    return exam;
  } catch (error) {
    throw new Error(`Cannot get exam with id: ${examId}`);
  }
};

export const startExam = async ({
  examId,
  rollno,
  name,
}: {
  examId: string;
  rollno: string;
  name?: string;
}) => {
  try {
    // find if there is previous report instance of exam
    const report = await reportModel.findOne({
      examId,
      rollno,
    });
    // if there is no previous report then only create new report
    if (report == null) {
      let exam = await examModel.findById(examId, { questions: 1 });
      await reportModel.create({
        name,
        rollno,
        examId,
        questions: exam?.questions,
      });
    } else
      throw new Error(
        `Report for rollno: ${rollno} and this exam already exists, Contact your examiner`
      );
  } catch (error) {
    throw new Error("Could not start exam, try again later!!");
  }
};

export const answerQuestion = async ({
  questionId,
  reportId,
  selectedAnswer,
}: {
  questionId: string;
  reportId: string;
  selectedAnswer: string;
}) => {
  try {
    await reportModel.findByIdAndUpdate(
      reportId,
      {
        $set: {
          "questions.$[question].selectedAnswer": selectedAnswer,
        },
      },
      {
        arrayFilters: [{ "question.id": questionId }],
      }
    );
  } catch (error) {
    throw new Error("Could not answer question, try again later!!");
  }
};

export const resetAnswerQuestion = async ({
  questionId,
  reportId,
}: {
  questionId: string;
  reportId: string;
  selectedAnswer: string;
}) => {
  try {
    reportModel.findByIdAndUpdate(
      reportId,
      {
        $set: {
          "questions.$[question].selectedAnswer": "",
        },
      },
      {
        arrayFilters: [{ "question.id": { $eq: questionId } }],
      }
    );
  } catch (error) {
    throw new Error("Could not answer question, try again later!!");
  }
};

export const endTest = async ({
  examId,
  rollno,
}: {
  examId: string;
  rollno: string;
}) => {
  try {
    const report = await reportModel.findOne({ examId, rollno });
    if (report == null) throw new Error("");
    report.isExamEnded = true;
    await report.save();
  } catch (error) {
    throw new Error("Could not end test, try again later!!");
  }
};

export const getReport = async ({
  rollno,
  examId,
}: {
  rollno: string;
  examId: string;
}) => {
  try {
    let report = await reportModel.findOne({ examId, rollno });
    if (report == null) throw new Error("");
    return report;
  } catch (error) {
    throw new Error("Could not get report, try again later!!");
  }
};

export const getReports = async ({ rollno }: { rollno: string }) => {
  let reports: any;
  try {
    reports = await reportModel.find({ rollno });
  } catch (error) {
    throw new Error("Could not get reports, try again later!!");
  }
  if (reports.length == 0) throw new Error("No reports found");
  return reports;
};

export const editProfile = async ({
  rollno,
  name,
  password,
  email,
}: {
  rollno: string;
  name?: string;
  password?: string;
  email?: string;
}) => {
  try {
    let q: any = {};
    if (name) q.name = name;
    if (password) q.password = password;
    if (email) q.email = email;
    await studentModel.findOneAndUpdate({ rollno }, q);
  } catch (error) {
    throw new Error("Could not edit profile, try again later!!");
  }
};
