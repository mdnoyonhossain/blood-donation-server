import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { DonationService } from "./donation.service";
import pickFromQueryParams from "../../utils/pickFromQueryParams";
import { donorListQueryParams } from "./donation.constant";
import { metaData } from "../../constant/metaData";

// donation request
const donationRequest = catchAsync(async (req, res) => {
  const result = await DonationService.donationRequest(req.body, req.user);

  sendResponse(res, false, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Request successfully made",
    data: result,
  });
});

// get all donation request
const getAllDonationRequest = catchAsync(async (req, res) => {
  const result = await DonationService.getAllDonationRequest(req.user);

  sendResponse(res, false, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Donation requests retrieved successfully",
    data: result,
  });
});

// update donation request status
const updateDonationRequest = catchAsync(async (req, res) => {
  const { requestId } = req.params;

  const result = await DonationService.updateDonationRequest(
    requestId,
    req.user,
    req.body
  );

  sendResponse(res, false, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Donation request status successfully updated",
    data: result,
  });
});

// get donor list
const getDonorList = catchAsync(async (req, res) => {
  const filterData = pickFromQueryParams(req.query, donorListQueryParams);
  const metaInfo = pickFromQueryParams(req.query, metaData);

  const { meta, data } = await DonationService.getDonorList(
    filterData,
    metaInfo
  );

  sendResponse(res, true, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Donors successfully found",
    meta,
    data,
  });
});

const getDonorByIdFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DonationService.getDonorByIdFromDB(id);

  sendResponse(res, false, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Donation Id or Info retrieved successfully",
    data: result,
  });
});

export const DonationController = {
  donationRequest,
  getAllDonationRequest,
  updateDonationRequest,
  getDonorList,
  getDonorByIdFromDB
};
