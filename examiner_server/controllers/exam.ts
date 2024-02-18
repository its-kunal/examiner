import { Request, Response } from "express";
import ExamModel from "../models/exam";
import fs from "fs/promises";
import fsa from "fs";
import path from "path";
import sharp from "sharp";
import crypto from "crypto";
import { storagePath } from "../helpers/constants";
import ReportModel from "../models/report";
import { Document, Types } from "mongoose";
import { Report } from "../interfaces/report";

export const examCb = async (req: Request, res: Response) => {
  let exams = await ExamModel.find({}, { questions: 0 });
  exams = exams.map((exam) => {
    if (fsa.existsSync(exam.instituteLogo)) {
      exam.instituteLogo = fsa.readFileSync(exam.instituteLogo, "base64");
    }
    return exam;
  });
  return res.json({ exams });
};

export const createExamCb = async (req: Request, res: Response) => {
  // if (typeof req.headers.username !== "string")
  //   throw new Error("Not Authorized");
  let newInstituteLogoPath;
  if (req.file) {
    const ext = req.file?.originalname.split(".").pop() || "webp";
    // console.log(req.file?.originalname);
    // console.log(ext);
    const uuid = crypto.randomBytes(4).toString("hex");
    const instituteLogoPath = path.join(storagePath, `${uuid}.${ext}`);
    await fs.rename(
      path.join(storagePath, `${req.file?.filename}`),
      instituteLogoPath,
    );
    const instituteLogo = await sharp(instituteLogoPath)
      .resize(200)
      .webp()
      .toBuffer();
    await fs.writeFile(instituteLogoPath, instituteLogo);
    newInstituteLogoPath = path.join(storagePath, `${uuid}.webp`);
    await fs.rename(instituteLogoPath, newInstituteLogoPath);
  }
  const { name, instituteName, startedAt, endsAt } = req.body;
  let obj = Object.fromEntries(
    Object.entries({ name, instituteName, startedAt, endsAt }).filter(
      ([key, value]) => value,
    ),
  );
  await ExamModel.create({
    ...obj,
    username: String(req.headers),
    instituteLogo: newInstituteLogoPath,
  });

  res.json({ message: "Exam created successfully" });
};

export const getExamHandler = async (req: Request, res: Response) => {
  const { examId } = req.params;
  const exam = await ExamModel.findById(examId, {
    "questions.$.correctAnswer": 0,
  });
  return res.json({ exam });
};

export const editExamHandler = async (req: Request, res: Response) => {
  const { examId } = req.params;
  const { username } = req.headers;
  if (typeof username !== "string") throw new Error("Not Authorized");
  const exam = await ExamModel.findOne({ _id: examId });
  if (exam?.username !== username) throw new Error("Not Authorized");

  if (req.file) {
    const newFilePath = path.join(storagePath, `${req.file.filename}`);
    let newFile = await sharp(newFilePath).resize(300).webp().toBuffer();
    await fs.writeFile(exam.instituteLogo, newFile);
    await fs.rm(newFilePath);
  }

  const { name, institutesName, startedAt, endsAt } = req.body;
  let obj = Object.fromEntries(
    Object.entries({ name, institutesName, startedAt, endsAt }).filter(
      ([key, value]) => value,
    ),
  );
  await ExamModel.updateOne({ _id: examId }, obj);
  return res.json({ message: "Exam updated successfully" });
};

export const deleteExamHandler = async (req: Request, res: Response) => {
  const { examId } = req.params;
  const { username } = req.headers;
  if (typeof username !== "string") throw new Error("Not Authorized");
  const exam = await ExamModel.findOne({ _id: examId });
  if (exam?.username !== username) throw new Error("Not Authorized");
  await ExamModel.deleteOne({ _id: examId });
  return res.json({ message: "Exam deleted successfully" });
};

export const questionExamHandler = async (req: Request, res: Response) => {
  const { id, question, options, correctAnswer, negativeMarks, positiveMarks } =
    req.body;
  const { examId } = req.params;
  const exam = await ExamModel.findOne({ _id: examId });
  if (!exam) throw new Error("Exam not found");
  if (exam.username !== req.headers.username) throw new Error("Not Authorized");
  let q = exam?.questions.filter((v) => v.id === id);
  if (!q)
    exam.questions.push({
      id,
      question,
      options,
      correctAnswer,
      negativeMarks,
      positiveMarks,
      isImage: false,
    });
  else
    exam.questions = exam.questions.map((v) => {
      if (v.id === id) {
        return {
          id,
          question,
          options,
          correctAnswer,
          negativeMarks,
          positiveMarks,
          isImage: false,
        };
      }
      return v;
    });
  await exam.save();
  return res.json({ message: "Question added successfully" });
};

export const examReportHandler = async (req: Request, res: Response) => {
  const { username } = req.headers;
  if (typeof username !== "string") throw new Error("Not Authorized");
  const { examId } = req.params;
  const exam = await ExamModel.findOne({ _id: examId });
  if (!exam) throw new Error("Exam not found");
  if (exam.username !== username) throw new Error("Not Authorized");
  if (exam.endsAt > new Date()) throw new Error("Exam has not ended yet");

  // Reports Calculation
  const reports = await ReportModel.find({ examId });
  const reportGenerator = async (
    report: Document<unknown, any, Report> &
      Omit<
        Report & {
          _id: Types.ObjectId;
        },
        never
      >,
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        let totalMarks = 0,
          maxMarks = 0,
          totalQuestions = 0,
          questionsCorrect = 0,
          questionsWrong = 0,
          questionUnanswered = 0,
          questionAnswered = 0,
          percentage = 0;

        report.questions.forEach((v) => {
          maxMarks += v.positiveMarks;
          // no response
          if (v.selectedAnswer === "") {
            questionUnanswered++;
          }
          // incorrect response
          else if (v.correctAnswer !== v.selectedAnswer) {
            questionAnswered++;
            questionsWrong++;
            totalMarks -= v.negativeMarks;
          }
          // correct response
          else {
            questionAnswered++;
            questionsCorrect++;
            totalMarks += v.positiveMarks;
          }
          totalQuestions++;
        });
        percentage = (totalMarks / maxMarks) * 100;

        report.totalMarks = totalMarks;
        report.maxMarks = maxMarks;
        report.totalQuestions = totalQuestions;
        report.questionsCorrect = questionsCorrect;
        report.questionsWrong = questionsWrong;
        report.questionUnanswered = questionUnanswered;
        report.questionAnswered = questionAnswered;
        report.percentage = percentage;
        await report.save();
        resolve(null);
      } catch (err) {
        reject(err);
      }
    });
  };

  const promises: Promise<any>[] = [];
  reports.forEach(async (report) => {
    promises.push(reportGenerator(report));
  });

  await Promise.all(promises);

  return res.json({ message: "Exam report generated successfully" });
};

export const deleteQuestionExamHandler = async (
  req: Request,
  res: Response,
) => {
  const { examId, questionId } = req.params;
  const exam = await ExamModel.findOne({ _id: examId });
  if (!exam) throw new Error("Exam not found");
  if (exam.username !== req.headers.username) throw new Error("Not Authorized");
  exam.questions = exam.questions.filter((v) => v.id !== questionId);
  await exam.save();
  return res.json({ message: "Question deleted successfully" });
};
