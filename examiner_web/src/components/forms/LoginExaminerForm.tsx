import BadgeIcon from "@mui/icons-material/Badge";
import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import KeyIcon from "@mui/icons-material/Key";
import { Button, Tooltip } from "@mui/material";
export default function RegisterStudentForm() {
  const [rollno, setRollno] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert("Are you sure you want to submit this form.");
      }}
    >
      <Typography variant="h6" component="h1" align="center">
        Examiner Login
      </Typography>

      {/* Roll No */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          width: "400px",
          marginBottom: "10px",
        }}
      >
        <Tooltip title="Roll Number">
          <BadgeIcon sx={{ color: "action.active", mr: 2, my: 0.5 }} />
        </Tooltip>
        <TextField
          id="rollno"
          label="Roll Number"
          variant="standard"
          value={rollno}
          onChange={(e) => {
            setRollno(e.target.value);
          }}
          fullWidth
          autoComplete="rollno"
        />
      </Box>
      {/* Password */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          width: "400px",
          marginBottom: "20px",
        }}
      >
        <Tooltip title="Password">
          <KeyIcon sx={{ color: "action.active", mr: 2, my: 0.5 }} />
        </Tooltip>
        <TextField
          id="password"
          label="Password"
          variant="standard"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          fullWidth
          type="password"
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "end", my: 0.5 }}>
        <Button variant="contained" type="submit">
          Login
        </Button>
      </Box>
    </form>
  );
}
