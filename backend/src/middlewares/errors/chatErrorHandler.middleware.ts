import type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export function chatErrorHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(401).json(result.array());
  } else {
    next();
  }
}
