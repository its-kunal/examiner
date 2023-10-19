import { JwtPayload, verify } from "jsonwebtoken";
import dotenv from "dotenv";
import { decode } from "punycode";
import { NextFunction, Request, Response } from "express";
import { getExaminerId } from "../controllers/examiner";

dotenv.config();
const SECRET = process.env.SECRET || "";


export async function verifyStudent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1] || "";
  try {
    let decoded = verify(token, SECRET);
    req.headers = { ...req.headers, ...(decoded as JwtPayload) };
    next();
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
}

export async function verifyExaminer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1] || "";
  try {
    let decoded = verify(token, SECRET);
    req.body = { ...req.body, ...(decoded as JwtPayload) };
    let examinerId = String(
      await getExaminerId({ username: req.body.username })
    );
    req.body.examinerId = examinerId;
    req.headers["examinerId"] = examinerId;
    next();
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
}
