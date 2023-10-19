import express, { Request, Response, Router } from "express";
import { verifyExaminer } from "../middleware/verification";
import {
  addQuestions,
  createExam,
  deleteExam,
  editEndTime,
  editExaminerDetails,
  editQuestion,
  editStartTime,
  endAllExams,
  generateReports,
  getExamReport,
  getExaminerId,
  getExams,
  removeStudent,
  resetStudentSession,
  sendPassword,
} from "../controllers/examiner";
import { readFileSync } from "fs";

import ExaminerModel from "../models/examiner";
import { tryCatchRequest } from "../helpers/tryCatchRequest";
import { upload } from "../helpers/constants";

const router = Router();

router.use(verifyExaminer);

const examinerPutHandler = async (req: Request, res: Response) => {
  // TODO : File handler for institute Logo
  const { name, email, emailPassword, instituteName } = req.body;
  const { username } = req.headers;
  let obj = Object.fromEntries(
    Object.entries({ name, email, emailPassword, instituteName }).filter(
      ([x, y]) => y
    )
  );
  await ExaminerModel.updateOne({ username }, obj);
  res.status(200).json({ message: "Profile Updated" });
};

router.put("/", upload.single("instituteLogo") ,tryCatchRequest(examinerPutHandler));

const examinerGetHandler = async (req: Request, res: Response) => {
  let username: string;
  if (typeof req.headers.username !== "string") {
    username = String(req.query.username) || "";
  } else {
    username = req.headers.username;
  }
  const examiner = await ExaminerModel.findOne(
    { username },
    { password: -1, emailPassword: -1 }
  );
  res.json({ examiner });
};

router.get("/", tryCatchRequest(examinerGetHandler));

router.get("/exams", async (req, res) => {
  try {
    const exams = await getExams({ examinerId: req.body.examinerId });
    res.json({ exams });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
});

router.post("/exams", async (req, res) => {
  try {
    const {
      name,
      examinerId,
      instituteName,
      instituteLogo,
      instructions,
      startedAt,
      endsAt,
      status,
    } = req.body;
    const exam = await createExam({
      name,
      username: String(req.headers.username),
      instituteName,
      instituteLogo,
      instructions,
      startedAt,
      endsAt,
      status,
    });
    res.json({ exam, message: "Successfully created exam" });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
});

router.delete("/exams/:examId", async (req, res) => {
  try {
    const { examId } = req.params;
    await deleteExam({ examId, examinerId: req.body.examinerId });
    res.json({ message: "Exam deleted" });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
});

router.post("/exams/:examId/question", async (req, res) => {
  try {
    const { examId } = req.params;
    const { examinerId, questions } = req.body;
    await addQuestions({ examId, examinerId, questions });
    res.json({ message: "Questions added" });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
});

router.put("/exams/:examId/question", async (req, res) => {
  try {
    const { examId } = req.params;
    const { question, questionId } = req.body;
    await editQuestion({ examId, question, questionId });
    res.json({ message: "Questions added" });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
});

router.put("/exams/:examId/endTime", async (req, res) => {
  const { examId, updatedEndsAt } = req.body;
  try {
    await editEndTime({ examId, updatedEndsAt });
    res.status(200).json({ message: "Exam End Time Updated" });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
});

router.put("/exams/:examId/startTime", async (req, res) => {
  const { examId, updatedStartsAt } = req.body;
  try {
    await editStartTime({ examId, updatedStartsAt });
    res.status(200).json({ message: "Exam Start Time Updated" });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
});

router.get("exams/:examId/end", async (req, res) => {
  const { examId } = req.params;
  try {
    await endAllExams({ examId });
    res.status(200).json({ message: "Exam Ended" });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
});

router.put("/profile", async (req, res) => {
  const {
    name,
    username,
    password,
    email,
    emailPassword,
    instituteName,
    instituteLogo,
  } = req.body;
  try {
    await editExaminerDetails({
      name,
      username,
      password,
      email,
      emailPassword,
      instituteName,
      instituteLogo,
    });
    res.json({ message: "Profile Updated" });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
});

router.delete("/:rollno", async (req, res) => {
  const { rollno } = req.params;
  try {
    await removeStudent({ rollno });
    res.json({ message: "Student Removed" });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
});

router.get("/:rollno/logout", async (req, res) => {
  const { rollno } = req.params;
  try {
    await resetStudentSession({ rollno });
    res.json({ message: "Student Session Logged Out" });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
});

router.get("/:examId/report", async (req, res) => {
  const { examId } = req.params;
  try {
    const filePath = await generateReports({ examId });
    const base64String = readFileSync(filePath).toString("base64");
    res.json({ message: "Reports Generated", report: base64String });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
});

router.get("/:rollno/forgot", async (req, res) => {
  const { rollno } = req.params;
  try {
    await sendPassword({ rollno, examinerId: req.body.examinerId });
    res.json({ message: "Mail Sent" });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
});

router.get("/:examId/reports", async (req, res) => {
  const { examId } = req.params;
  try {
    const reports = await getExamReport({ examId });
    res.json({ reports });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
});

export default router;
