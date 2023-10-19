import Navbar from "./components/navbar/Navbar";
import StudentRoute from "./routes/student/Home";
import ExaminerRoute from "./routes/examiner/Home";
import Footer from "./components/footer/Footer";
import Home from "./routes/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="font-roboto select-none text-black resize-none">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/student/*" element={<StudentRoute />} />
        <Route path="/examiner/*" element={<ExaminerRoute />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
