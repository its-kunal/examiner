import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Tooltip,
} from "@mui/material";
import { Schedule } from "@mui/icons-material";

export default function ExamCard() {
  return (
    <Card sx={{ width: 270 }} elevation={3}>
      <CardActionArea>
        <CardMedia>
          <Avatar variant="square" sx={{ width: "100%", height: 80 }}>
            Institute Logo
          </Avatar>
        </CardMedia>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Institute Name
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Exam Name
          </Typography>
          <div className="flex mb-1 items-center">
            <Tooltip title="Exam Start Time">
              <Schedule sx={{ color: "#16a34a", height: 14 }}></Schedule>
            </Tooltip>
            <Typography
              variant="body2"
              sx={{ fontSize: 12 }}
              color="text.secondary"
            >
              18:00
            </Typography>
          </div>
          <div className="flex items-center">
            <Tooltip title="Exam End Time">
              <Schedule sx={{ color: "#dc2626", height: 14 }}></Schedule>
            </Tooltip>
            <Typography
              sx={{ fontSize: 12 }}
              variant="body2"
              color="text.secondary"
            >
              18:00
            </Typography>
          </div>
        </CardContent>
        <CardActions>
          <Button>Join Now</Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
