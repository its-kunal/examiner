import {
  Box,
  Container,
  FormControlLabel,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

export default function Form() {
  return (
    <Container
      sx={{
        display: "flex",
        marginTop: 7,
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4">User Details</Typography>
      <Paper
        elevation={2}
        sx={{
          width: "600px",
          paddingX: 4,
          paddingY: 5,
          display: "flex",
          flexDirection: "column",
          marginTop: "10px",
          gap: 2,
        }}
      >
        <TextField
          fullWidth
          id="outlined-basic"
          label="Name"
          variant="outlined"
        />

        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Add Merch"
        />
      </Paper>
    </Container>
  );
}
