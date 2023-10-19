import { Route, Routes } from "react-router-dom";
import Exams from "./Exams";
import StartExam from "./StartExam";
import QuestionExam from "./QuestionExam";

export default function StudentExam() {
  return (
    <Routes>
      <Route path="/" element={<Exams />} />
      <Route path=":examId/" element={<QuestionExam />} />
      <Route path=":examId/start" element={<StartExam />} />
    </Routes>
  );
}
