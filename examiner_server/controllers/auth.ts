import { Request, Response } from "express";
import StudentModel from "../models/student";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import examinerModel from "../models/examiner";

const SECRET = process.env.SECRET || "secret";

export const loginHandler = async function (req: Request, res: Response) {
  const { rollno, password } = req.query;
  const student = await StudentModel.findOne({ rollno });
  if (student == null) throw new Error("Student not found");
  if (!(await compare(String(password), student.password)))
    throw new Error("Invalid Password");
  const token = await sign({ rollno }, SECRET, { expiresIn: "6h" });
  res.setHeader("Authorization", `Bearer ${token}`);
  res.status(200).json({ message: "Login Successful", token });
};

export const examinerLoginHandler = async (req: Request, res: Response) => {
  const { username, password } = req.query;
  const examiner = await examinerModel.findOne({ username });
  if (examiner == null) throw new Error("Examiner not found");
  if (!(await compare(String(password), examiner.password)))
    throw new Error("Invalid Password");
  const token = await sign({ username }, SECRET, { expiresIn: "1d" });
  res.setHeader("Authorization", `Bearer ${token}`);
  res.status(200).json({ message: "Login Successful", token });
};

export const registerHandler = async (req: Request, res: Response) => {
  const { rollno, name, password, email } = req.body;
  await StudentModel.create({ rollno, name, password, email });
  const token = await sign({ rollno }, SECRET, { expiresIn: "6h" });
  res.status(200).json({ message: "Registration Successful", token });
};

export const registerExaminer = async (req: Request, res: Response) => {
  const { name, username, password, email } = req.body;
  await examinerModel.create({ name, username, password, email });
  const token = await sign({ username }, SECRET, { expiresIn: "1d" });
  res.status(200).json({ message: "Registration Successful", token });
};
