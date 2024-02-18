import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { middlewareHelper } from "../helpers/tryCatchRequest";

const SECRET = process.env.SECRET || "";

const secureRoutes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send("Invalid token");
  }
  verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }
    req.headers = { ...req.headers, ...(decoded as JwtPayload) };
  });
  next();
};

export const secureMiddleware = middlewareHelper(secureRoutes);
