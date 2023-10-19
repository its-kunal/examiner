import React from "react";
import { Paper } from "@mui/material";

export default function Card1({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Paper elevation={3} className="p-4 px-10 pb-7">
        {children}
      </Paper>
    </>
  );
}
