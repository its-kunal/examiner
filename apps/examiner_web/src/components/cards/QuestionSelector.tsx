import { Box, Divider, Typography } from "@mui/material";
import React from "react";

export default function QuestionSelector() {
  const questionNumbers = Array(50).fill(0);
  const status = [
    {
      color: "green-500",
      status: "Answered",
    },
    {
      color: "yellow-400",
      status: "Visited",
    },
    {
      color: "gray-400",
      status: "Unanswered",
    },
  ];
  return (
    <Box>
      <Typography>Questions: </Typography>
      <Divider sx={{ mb: 2 }} />
      <div className="flex flex-wrap w-72 gap-2">
        {/* <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", width: 300 }}> */}
        {questionNumbers.map((v, idx) => {
          return (
            <div
              className="h-8 w-8 bg-gray-50 rounded shadow flex justify-center items-center text-sm"
              key={idx}
            >
              {idx + 1}
            </div>
          );
        })}
      </div>
      <div className="h-5"></div>
      <div className="flex gap-2 justify-evenly">
        {status.map((v, idx) => {
          return (
            <div key={idx} className="flex gap-1 items-center">
              <ColorBox color={v.color} />
              <div className="text-sm">{v.status}</div>
            </div>
          );
        })}
      </div>
    </Box>
  );
}

function ColorBox({ color }: { color: string }) {
  const divString = `h-3 aspect-square bg-${color} shadow-sm rounded border border-black`;
  return <div className={divString}></div>;
}

/*
 "h-3 w-3 bg-" + v.color + " rounded shadow-sm" 
*/
