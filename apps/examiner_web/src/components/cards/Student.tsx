import Card1 from "./Card1";
import StudentSvg from "../../assets/student.svg";
import { useNavigate } from "react-router-dom";

export default function Student() {
  const navigate = useNavigate();
  return (
    <Card1>
      <div className="flex flex-col gap-y-4 items-center">
        <img src={StudentSvg} className="h-20 w-20" alt="" />
        <div className="flex flex-col gap-y-2">
          <h6 className="font-semibold text-2xl text-center">Student</h6>
          <button
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-opacity-80 duration-75 w-56"
            onClick={(e) => {
              e.preventDefault();
              navigate("/student/register");
            }}
          >
            Register
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-opacity-80 duration-75 w-56"
            onClick={(e) => {
              e.preventDefault();
              navigate("/student/login");
            }}
          >
            Login
          </button>
        </div>
      </div>
    </Card1>
  );
}
