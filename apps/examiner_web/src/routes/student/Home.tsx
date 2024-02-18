import { Route, Routes } from "react-router-dom";
import RegisterStudentForm from "./Register";
import LoginStudentForm from "./Login";
import ExamStudent from "./exam/Home";
import Profile from "./Profile";

export default function Home() {
  return (
    <div>
      <Routes>
        <Route element={<RegisterStudentForm />} path="/register" />
        <Route element={<LoginStudentForm />} path="/login" />
        <Route element={<ExamStudent />} path="/exam/*" />
        <Route element={<Profile />} path="/profile" />
      </Routes>
    </div>
  );
}
