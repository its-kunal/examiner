import { Router } from "express";
import { tryCatchRequest } from "../helpers/tryCatchRequest";
import {
  examinerLoginHandler,
  loginHandler,
  registerHandler,
  registerExaminer,
} from "../controllers/auth";

const router = Router();

router.get("/", tryCatchRequest(loginHandler));

router.get("/examiner", tryCatchRequest(examinerLoginHandler));

router.post("/", tryCatchRequest(registerHandler));

router.post("/examiner", tryCatchRequest(registerExaminer));

export default router;
  