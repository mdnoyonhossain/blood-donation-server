import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";
import auth from "../../middleware/auth";
import { UserRole } from "@prisma/client";

const registration = express.Router();
registration.post(
  "/",
  validateRequest(AuthValidation.registrationValidationSchema),
  AuthController.registration
);

const login = express.Router();
login.post(
  "/",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.login
);

const changePassword = express.Router();
changePassword.post(
  "/",
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthController.changePassword
);

const allUser = express.Router();
allUser.get("/", auth(UserRole.ADMIN), AuthController.getAllUser)

const updateUser = express.Router();
updateUser.put("/:id", auth(UserRole.ADMIN), AuthController.updateUserStatus)

export const RegistrationRoute = registration;
export const loginRoute = login;
export const changePasswordRoute = changePassword;
export const AllUserRoute = allUser;
export const updateUserRoutes = updateUser;
