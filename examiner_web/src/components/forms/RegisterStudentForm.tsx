import { AccountCircle } from "@mui/icons-material";
import BadgeIcon from "@mui/icons-material/Badge";
import { Box, TextField, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import KeyIcon from "@mui/icons-material/Key";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { Button } from "@mui/material";
export default function RegisterStudentForm() {
  const [name, setName] = useState("");
  const [rollno, setRollno] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert("Are you sure you want to submit this form.");
      }}
    >
      <Typography variant="h6" component="h1" align="center">
        Student Registration
      </Typography>
      {/* Name */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          width: "400px",
          marginBottom: "10px",
        }}
      >
        <Tooltip title="Name">
          <AccountCircle sx={{ color: "action.active", mr: 2, my: 0.5 }} />
        </Tooltip>
        <TextField
          id="name"
          label="Name"
          variant="standard"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          fullWidth
        />
      </Box>
      {/* Roll No */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          width: "400px",
          marginBottom: "10px",
        }}
      >
        <Tooltip title="Roll_Number">
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
          marginBottom: "10px",
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
      {/* Confirm Password */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          width: "400px",
          marginBottom: "20px",
        }}
      >
        <Tooltip
          title={`Renter Password : ${
            cnfPassword == password
              ? "Password Matched"
              : "Password Doesn't Match"
          } `}
        >
          <ThumbUpAltIcon
            sx={{ mr: 2, my: 0.5 }}
            color={`${
              cnfPassword === password && password != "" ? "success" : "action"
            }`}
          />
        </Tooltip>
        <TextField
          id="rollno"
          label="Confirm Password"
          variant="standard"
          value={cnfPassword}
          onChange={(e) => {
            setCnfPassword(e.target.value);
          }}
          fullWidth
          type="password"
          autoComplete="password"
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end", my: 0.5 }}>
        <Button variant="contained" type="submit">
          Register
        </Button>
      </Box>
    </form>
  );
}
