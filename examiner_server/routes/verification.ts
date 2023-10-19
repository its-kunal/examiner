import { Router } from "express";
import {
  loginStudent,
  logoutStudent,
  registerStudent,
} from "../controllers/student";
import { Student } from "../interfaces/student";
import { loginExaminer, registerExaminer } from "../controllers/examiner";

const router = Router();

router.post("/student/login", async (req, res) => {
  const { rollno, password } = req.body;
  try {
    const token = await loginStudent({ rollno, password });
    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(200).json({ message: "Login Successful" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/student/register", async (req, res) => {
  const { name, rollno, password, email, isLoggedIn, standard } = req.body;
  try {
    const token = await registerStudent({
      name,
      rollno,
      password,
      email,
      isLoggedIn,
      standard,
    });
    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(200).json({ message: "Registration Successful" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/examiner/register", async (req, res) => {
  const { name, username, password, instituteName, instituteLogo } = req.body;
  try {
    let token = await registerExaminer({
      name,
      username,
      password,
      instituteName,
      instituteLogo,
    });
    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(200).json({ message: "Registration Successful" });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
});

router.post("/examiner/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = await loginExaminer({ username, password });
    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(200).json({ message: "Login Successful" });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
});

export default router;
