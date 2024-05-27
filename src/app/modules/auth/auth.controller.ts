import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

// registration
const registration = catchAsync(async (req, res) => {
  const result = await AuthService.registration(req.body);

  sendResponse(res, false, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Registration successful",
    data: result,
  });
});

// login
const login = catchAsync(async (req, res) => {
  const result = await AuthService.login(req.body);

  sendResponse(res, false, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Login successful",
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await AuthService.changePassword(user, req.body);

  sendResponse(res, false, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Password Changed successfully",
    data: result
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await AuthService.getAllUser();

  sendResponse(res, false, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All User Retrived",
    data: result
  });
});

const updateUserStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  const result = await AuthService.updateUserStatus(id, userData);

  sendResponse(res, false, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Update User Status Successfully!",
    data: result
  });
});

export const AuthController = {
  registration,
  login,
  changePassword,
  getAllUser,
  updateUserStatus
};
