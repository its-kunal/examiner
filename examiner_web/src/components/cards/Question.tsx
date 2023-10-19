import React from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
export default function Question() {
  const options = new Array(4).fill("Option");
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
        possimus.
      </Typography>
      <Divider sx={{ my: 3 }} />
      <Box sx={{ height: 10 }}></Box>
      <FormControl>
        <RadioGroup>
          {options.map((v, idx) => {
            return (
              <FormControlLabel
                value={`${v}-${idx + 1}`}
                control={<Radio />}
                label={`${v}-${idx + 1}`}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
      <Box sx={{ height: 50 }}></Box>
      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
        <Button color="warning" startIcon={<RefreshIcon></RefreshIcon>}>
          Reset
        </Button>
        <Button variant="contained" startIcon={<WestIcon></WestIcon>}>
          Previous
        </Button>
        <Button variant="contained" startIcon={<EastIcon></EastIcon>}>
          Next
        </Button>
      </Box>
    </Box>
  );
}
