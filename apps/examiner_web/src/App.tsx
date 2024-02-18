import Navbar from "./components/navbar/Navbar";
import StudentRoute from "./routes/student/Home";
import ExaminerRoute from "./routes/examiner/Home";
import Footer from "./components/footer/Footer";
import Home from "./routes/Home";
import { Route, Routes } from "react-router-dom";

const routes = [
  { path: "/", element: <Home /> },
  {
    path: "/student/*",
    element: <StudentRoute />,
  },
  { path: "/examiner/*", element: <ExaminerRoute /> },
];

function App() {
  return (
    <div className="font-roboto select-none text-black resize-none">
      <Navbar />
      <Routes>
        {routes.map((v, idx) => {
          return <Route path={v.path} element={v.element} key={idx} />;
        })}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
