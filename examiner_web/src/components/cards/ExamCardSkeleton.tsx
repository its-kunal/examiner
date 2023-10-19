import {
  Skeleton,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

export default function ExamCardSkeleton() {
  return (
    <Card elevation={3}>
      <Skeleton
        variant="rectangular"
        animation="wave"
        width={400}
        height={100}
      ></Skeleton>
      <CardContent>
        <Skeleton variant="text" animation="wave" width={150} />
        <Skeleton variant="text" animation="wave" width={150} height={50} />
        <div className="flex mb-1 gap-x-4 items-center">
          <Skeleton
            variant="rounded"
            sx={{ height: 14, width: 20 }}
          ></Skeleton>
          <Skeleton variant="text" animation="wave" width={150}></Skeleton>
        </div>
        <div className="flex mb-1 gap-x-4 items-center">
          <Skeleton
            variant="rounded"
            sx={{ height: 14, width: 20 }}
          ></Skeleton>
          <Skeleton variant="text" animation="wave" width={150}></Skeleton>
        </div>
      </CardContent>
      <CardActions>
        <Skeleton variant="rectangular" width={100} height={30}></Skeleton>
      </CardActions>
    </Card>
  );
}
