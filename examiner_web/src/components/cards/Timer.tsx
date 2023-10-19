import { Box, Typography } from "@mui/material";
import React from "react";

export default function Timer() {
  const hoursLeft = 1;
  const minutesLeft = 32;
  return (
    <Box sx={{ width: 300 }}>
      <Typography  variant="body1">
        Time Left:
      </Typography>
      <Typography sx={{ color: "red", textAlign: "center" }} variant="h3">
        {hoursLeft.toString().padStart(2, "0")}:
        {minutesLeft.toString().padStart(2, "0")}
      </Typography>
    </Box>
  );
}
