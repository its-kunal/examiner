import { Router } from "express";
import { verifyStudent } from "../middleware/verification";
import { logoutStudent } from "../controllers/student";

const router = Router();

router.use(verifyStudent);

router.get("/logout", async (req, res) => {
  try {
    res.setHeader("Authorization", "");
    await logoutStudent({ rollno: req.body.rollno });
    res.status(200).json({ message: "Logout Successful" });
  } catch (err) {
    return res
      .status(401)
      .json({ messsage: "Error occured, try again later!!" });
  }
});

// Incomplete
router.put("/profile", async (req, res) => {
  try {
    res.status(200).json({ message: "Profile Updated" });
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
});

// exam
// get exams
// Incomplete
router.get("/exams", async (req, res) => {
  try {
    res.status(200).json({ message: "Exams" });
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
});

// Incomplete
router.get("/exam/:examId", async (req, res) => {
  try {
    const { examId } = req.params;
    res.status(200).json({ message: "Exam" });
  } catch (err: any) {
    return res.status(401).json({ message: err.message });
  }
});

// Incomplete
router.post("/exam/:examId/start", async (req, res) => {});

// End Test - Incomplete
router.get("/exam/:examId/end", async (req, res) => {});

router.post("/exam/:examId/answer", async (req, res) => {});

router.post("/exam/:examId/reset", async (req, res) => {});

router.get("/exam/:examId/result", async (req, res) => {});

router.get("/exam/result", async (req, res) => {});

export default router;
