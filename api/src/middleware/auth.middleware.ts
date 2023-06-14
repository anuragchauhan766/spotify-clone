import { NextFunction, Request, RequestHandler, Response } from "express";
import ErrorResponse from "../utils/ErrorResponse.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/userSchema.js";
import { CustomRequest } from "../types/express/index.js";

export const authenticate: RequestHandler = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  let accessToken: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    accessToken = req.headers.authorization.split(" ")[1];
  }

  if (!accessToken) {
    return next(new ErrorResponse("Unauthoriazed not present", 401));
  }
  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET_KEY as string
    ) as JwtPayload;

    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new ErrorResponse("User not exists", 404));
    }
    req.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
    next();
  } catch (error) {
    next(error);
  }
};
