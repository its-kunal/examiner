import { NextFunction, Request, Response } from "express";

export function tryCatchRequest(fn: Function) {
  return async (req: Request, res: Response) => {
    try {
      await fn(req, res);
    } catch (error: any) {
      if (error.message)
        return res.status(401).json({ message: error.message });
      return res.status(401);
    }
  };
}

export const middlewareHelper = async (cb: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await cb(req, res, next);
    } catch (error: any) {
      return res.status(401).send(error.message);
    }
  };
};
