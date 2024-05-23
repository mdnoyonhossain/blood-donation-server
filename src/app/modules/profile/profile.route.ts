import express from "express";
import auth from "../../middleware/auth";
import { ProfileController } from "./profile.controller";
import validateRequest from "../../middleware/validateRequest";
import { ProfileValidation } from "./profile.validation";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.get("/", auth(UserRole.ADMIN, UserRole.USER), ProfileController.getMyProfile);

router.put(
  "/",
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(ProfileValidation.updateProfileValidationSchema),
  ProfileController.updateMyProfile
);

export const ProfileRoute = router;
