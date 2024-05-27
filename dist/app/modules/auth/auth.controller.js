"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_service_1 = require("./auth.service");
// registration
const registration = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.registration(req.body);
    (0, sendResponse_1.default)(res, false, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Registration successful",
        data: result,
    });
}));
// login
const login = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.login(req.body);
    (0, sendResponse_1.default)(res, false, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Login successful",
        data: result,
    });
}));
const changePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield auth_service_1.AuthService.changePassword(user, req.body);
    (0, sendResponse_1.default)(res, false, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Password Changed successfully",
        data: result
    });
}));
const getAllUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.getAllUser();
    (0, sendResponse_1.default)(res, false, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "All User Retrived",
        data: result
    });
}));
const updateUserStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userData = req.body;
    const result = yield auth_service_1.AuthService.updateUserStatus(id, userData);
    (0, sendResponse_1.default)(res, false, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Update User Status Successfully!",
        data: result
    });
}));
exports.AuthController = {
    registration,
    login,
    changePassword,
    getAllUser,
    updateUserStatus
};
