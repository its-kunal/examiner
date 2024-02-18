import StudentCard from "../components/cards/Student";
import ExaminerCard from "../components/cards/Examiner";

export default function Home() {
  return (
    <>
      <div className="h-20"></div>
      <div>
        <h3 className="text-center font-bold text-2xl">Select Your Role</h3>
      </div>
      <div className="h-10"></div>
      <div className="flex justify-center">
        <div className="flex p-4 gap-x-8">
          {/* Card 1, As student */}
          <StudentCard />
          <ExaminerCard />
          {/* Card 2, As examiner */}
        </div>
      </div>
    </>
  );
}
