import Card1 from "./Card1";
import ExaminerSvg from "../../assets/examiner.svg";
import { useNavigate } from "react-router-dom";

export default function Examiner() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/examiner/register");
  };
  const handleLogin = () => {
    navigate("/examiner/login");
  };

  return (
    <Card1>
      <div className="flex flex-col gap-y-4 items-center">
        <img src={ExaminerSvg} className="h-20 w-20" alt="" />
        <div className="flex flex-col gap-y-2">
          <h6 className="font-semibold text-2xl text-center">Examiner</h6>
          <button
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-opacity-80 duration-75 w-56"
            onClick={handleRegister}
          >
            Register
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-opacity-80 duration-75 w-56"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </Card1>
  );
}
