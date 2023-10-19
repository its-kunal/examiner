import { Route, Routes } from "react-router-dom";
import RegisterPage from "./Register";
import LoginPage from "./Login";

export default function Home() {
  return (
    <div>
      <Routes>
        <Route element={<RegisterPage />} path="/register" />
        <Route element={<LoginPage />} path="/login" />
      </Routes>
    </div>
  );
}
