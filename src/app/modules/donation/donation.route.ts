import express from "express";
import auth from "../../middleware/auth";
import { DonationController } from "./donation.controller";
import validateRequest from "../../middleware/validateRequest";
import { DonationValidation } from "./donation.validation";
import { UserRole } from "@prisma/client";

const donationRequest = express.Router();

donationRequest.post("/", auth(UserRole.ADMIN, UserRole.USER), DonationController.donationRequest);

donationRequest.get("/", auth(UserRole.ADMIN, UserRole.USER), DonationController.getAllDonationRequest);

donationRequest.put(
  "/:requestId",
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(DonationValidation.updateDonationRequestValidationSchema),
  DonationController.updateDonationRequest
);

const donorList = express.Router();

donorList.get("/", DonationController.getDonorList);
donorList.get("/:id", DonationController.getDonorByIdFromDB);


export const DonationRequestRoute = donationRequest;
export const DonorListRoute = donorList;
