import multer from "multer";
import path from "path";

export const indexPath = path.join(__dirname, "../");
export const storagePath = path.join(__dirname, "../temp");
export const upload = multer({ dest: storagePath });
