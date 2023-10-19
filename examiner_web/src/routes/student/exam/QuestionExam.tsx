import React from "react";
import Timer from "../../../components/cards/Timer";
import QuestionSelector from "../../../components/cards/QuestionSelector";
import Question from "../../../components/cards/Question";

export default function QuestionExam() {
  return (
    <div className="h-[94vh]">
      <div className="h-0.5"></div>
      <div className="grid grid-cols-12 h-full ">
        <div className="col-span-3 bg-gray-100 flex flex-col justify-around items-center rounded">
          <Timer />
          <QuestionSelector />
        </div>
        <div className="col-span-9">
          <Question />
        </div>
      </div>
    </div>
  );
}
/*
 
*/
