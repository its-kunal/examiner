import { Skeleton } from "@mui/material";

export default function FormLoader() {
  return (
    <div>
      <Skeleton variant="text" animation="wave" width={200} />
      <Skeleton
        variant="rectangular"
        animation="wave"
        width={400}
        height={200}
        className="rounded"
      />
      <Skeleton variant="text" animation="wave" width={150} />
      <Skeleton
        variant="rectangular"
        animation="wave"
        width={150}
        height={50}
        sx={{ marginLeft: "auto" }}
        className="rounded"
      />
    </div>
  );
}
