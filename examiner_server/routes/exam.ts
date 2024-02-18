import { Router } from "express";
import { tryCatchRequest } from "../helpers/tryCatchRequest";
import {
  examCb,
  createExamCb,
  deleteExamHandler,
  getExamHandler,
  editExamHandler,
  questionExamHandler,
  examReportHandler,
  deleteQuestionExamHandler,
} from "../controllers/exam";
import { upload } from "../helpers/constants";

const router = Router();

router.get("/", tryCatchRequest(examCb));

router.post("/", upload.single("instituteLogo"), tryCatchRequest(createExamCb));

router.get("/:examId", tryCatchRequest(getExamHandler));

router.put(
  "/:examId",
  upload.single("instituteLogo"),
  tryCatchRequest(editExamHandler),
);

router.delete("/:examId", tryCatchRequest(deleteExamHandler));

router.put("/:examId/question", tryCatchRequest(questionExamHandler));

router.get("/:examId/report", tryCatchRequest(examReportHandler));

router.delete(
  "/:examId/:questionId",
  tryCatchRequest(deleteQuestionExamHandler),
);

export default router;
