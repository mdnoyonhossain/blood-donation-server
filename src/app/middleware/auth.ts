import httpStatus from "http-status";
import AppError from "../error/AppError";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import { UserRole } from "@prisma/client";

const auth = (...role: UserRole[]) => {
  return catchAsync((req, res, next) => {
    const token = req.headers.authorization as string;

    let decode;

    try {
      decode = jwt.verify(token, config.JWT_ACCESS_SECRET as string) as JwtPayload;

      if (role.length && !role.includes(decode.role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      }
    }
    catch (error: any) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    req.user = {
      id: decode.id,
      name: decode.name,
      email: decode.email,
      role: decode.role
    };
    next();
  });
};

export default auth;
