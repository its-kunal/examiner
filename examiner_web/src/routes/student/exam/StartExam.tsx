import { Schedule } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardMedia,
  Avatar,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Modal,
  Paper,
  CardHeader,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Close, Warning } from "@mui/icons-material";

export default function StartExam() {
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
  const { examId } = useParams();
  const instructions = [
    "1. Click on the start exam button",
    "2. Enter your exam id",
    "3. Click on the join exam button",
    "4. Click on the start exam button",
    "5. Enter your exam id",
    "6. Click on the join exam button",
    "7. Click on the start exam button",
    "8. Enter your exam id",
    "9. Click on the join exam button",
    "10. Click on the start exam button",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum cumque tenetur accusamus dolorem ratione! Dicta tenetur, sed, saepe ipsam facilis libero nihil consectetur non qui explicabo expedita repellendus earum recusandae!",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum cumque tenetur accusamus dolorem ratione! Dicta tenetur, sed, saepe ipsam facilis libero nihil consectetur non qui explicabo expedita repellendus earum recusandae!",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum cumque tenetur accusamus dolorem ratione! Dicta tenetur, sed, saepe ipsam facilis libero nihil consectetur non qui explicabo expedita repellendus earum recusandae!",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum cumque tenetur accusamus dolorem ratione! Dicta tenetur, sed, saepe ipsam facilis libero nihil consectetur non qui explicabo expedita repellendus earum recusandae!",
  ];
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="h-10"></div>
      <div className="max-w-5xl mx-auto">
        <CardMedia>
          <Avatar variant="square" sx={{ width: "100%", height: 80 }}>
            Institute Logo
          </Avatar>
        </CardMedia>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
            Institute Name
          </Typography>
          <Typography variant="h5" component="div">
            Exam Name
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Exam Id: #{examId}
          </Typography>
          <div className="flex mb-1 items-center gap-x-2">
            <Schedule sx={{ color: "#16a34a", height: 20 }}></Schedule>
            <Typography
              variant="body2"
              sx={{ fontSize: 18 }}
              color="text.secondary"
            >
              18:00
            </Typography>
          </div>
          <div className="flex items-center gap-x-2">
            <Schedule sx={{ color: "#dc2626", height: 20 }}></Schedule>
            <Typography
              sx={{ fontSize: 18 }}
              variant="body2"
              color="text.secondary"
            >
              18:00
            </Typography>
          </div>
        </CardContent>
        <div className="h-10"></div>
        <Typography variant="h5" align="center" gutterBottom>
          Instructions
        </Typography>
        <Box sx={{ color: "text.secondary" }}>
          {instructions.map((instruction, idx) => {
            return (
              <Typography variant="body2" key={idx} sx={{ marginBottom: 1 }}>
                {instruction}
              </Typography>
            );
          })}
        </Box>
        <div className="h-5"></div>
        <Box
          sx={{ display: "flex", justifyContent: "center" }}
          onClick={() => setOpen(true)}
        >
          <Button variant="contained">Start Now</Button>
        </Box>
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
                <IconButton onClick={handleClose}>
                  <Close />
                </IconButton>
              }
              subheader="Want to Start Examination"
            ></CardHeader>
            <CardContent>
              <Typography variant="body2">
                This Action can't be undone. Your exam will be started.
              </Typography>
            </CardContent>
            <CardActions>
              <Button sx={{ marginLeft: "auto", color: "red" }}>Cancel</Button>
              <Button sx={{ marginLeft: "auto" }}>Start Now</Button>
            </CardActions>
          </Card>
        </Modal>
      </div>
      <div className="h-24"></div>
    </>
  );
}
