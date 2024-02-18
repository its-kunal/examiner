import { Warning, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import React from "react";

export default function EndtestBar() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const [open, setOpen] = React.useState(false);
  const handleClose: any = () => {
    setOpen(false);
  };
  return (
    <Box
      sx={{
        width: "100%",
        color: "gray",
        display: "flex",
        justifyContent: "end",
      }}
    >
      <Button sx={{ backgroundColor: "red" }} variant="contained">
        End Test
      </Button>{" "}
      <Modal open={open} onClose={handleClose}>
        <Card
          elevation={3}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CardHeader
            avatar={<Warning />}
            title="Attention"
            action={
              <IconButton
                onClick={() => {
                  handleClose();
                }}
              >
                <Close />
              </IconButton>
            }
            subheader="Want to End Examination"
          ></CardHeader>
          <CardContent>
            <Typography variant="body2">
              This Action can't be undone. Your exam will be ended.
            </Typography>
          </CardContent>
          <CardActions>
            <Button sx={{ marginLeft: "auto", color: "blue" }}>Cancel</Button>
            <Button sx={{ marginLeft: "auto", color: "red" }}>End Test</Button>
          </CardActions>
        </Card>
      </Modal>
    </Box>
  );
}
