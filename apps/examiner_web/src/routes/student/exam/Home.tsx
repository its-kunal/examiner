import { Route, Routes } from "react-router-dom";
import Exams from "./ExamsPage";
import StartExam from "./StartExam";
import ExamPage from "./ExamPage";
import EndExamPage from "./EndExamPage";
import QuestionPage from "./QuestionPage";
import AllQuestionPage from "./AllQuestionPage";

export default function StudentExam() {
  return (
    <Routes>
      <Route path="/" element={<Exams />} />
      <Route path=":examId/" element={<ExamPage />} />
      <Route path=":examId/start" element={<StartExam />} />
      <Route path=":examId/going" element={<QuestionPage />} />
      <Route path=":examId/view" element={<AllQuestionPage />} />
      <Route path=":examId/end" element={<EndExamPage />} />
    </Routes>
  );
}
