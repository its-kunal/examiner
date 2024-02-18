import { OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import { lazy, useState, Suspense } from "react";
// import ExamCard from "../../../components/cards/ExamCard";
const ExamCard = lazy(() => import("../../../components/cards/ExamCard"));
import ExamCardSkeleton from "../../../components/cards/ExamCardSkeleton";
export default function StudentExam() {
  const [search, setSearch] = useState("");
  const handleSearch: React.MouseEventHandler<HTMLButtonElement> | undefined = (
    e,
  ) => {
    e.preventDefault();
  };

  // TO DELETE
  const l = new Array(50).fill(0);
  return (
    <>
      <div className="h-10"></div>
      {/* Search Box */}
      <div className="flex justify-center">
        <div>
          <OutlinedInput
            sx={{
              height: "40px",
              width: "400px",
            }}
            placeholder="Search For Exams"
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchOutlined />
                </IconButton>
              </InputAdornment>
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      {/* Exam Cards */}
      <div className="h-10"></div>
      <div className="grid grid-cols-4 max-w-6xl mx-auto gap-x-4 gap-y-4">
        {l.map((_v, idx) => {
          return (
            <Suspense fallback={<ExamCardSkeleton key={idx} />}>
              <ExamCard key={idx}></ExamCard>
            </Suspense>
          );
        })}
      </div>
      <div className="h-10"></div>
    </>
  );
}
