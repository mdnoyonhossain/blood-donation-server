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
exports.DonationController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const donation_service_1 = require("./donation.service");
const pickFromQueryParams_1 = __importDefault(require("../../utils/pickFromQueryParams"));
const donation_constant_1 = require("./donation.constant");
const metaData_1 = require("../../constant/metaData");
// donation request
const donationRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield donation_service_1.DonationService.donationRequest(req.body, req.user);
    (0, sendResponse_1.default)(res, false, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "Request successfully made",
        data: result,
    });
}));
// get all donation request
const getAllDonationRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield donation_service_1.DonationService.getAllDonationRequest(req.user);
    (0, sendResponse_1.default)(res, false, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Donation requests retrieved successfully",
        data: result,
    });
}));
// update donation request status
const updateDonationRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { requestId } = req.params;
    const result = yield donation_service_1.DonationService.updateDonationRequest(requestId, req.user, req.body);
    (0, sendResponse_1.default)(res, false, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Donation request status successfully updated",
        data: result,
    });
}));
// get donor list
const getDonorList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filterData = (0, pickFromQueryParams_1.default)(req.query, donation_constant_1.donorListQueryParams);
    const metaInfo = (0, pickFromQueryParams_1.default)(req.query, metaData_1.metaData);
    const { meta, data } = yield donation_service_1.DonationService.getDonorList(filterData, metaInfo);
    (0, sendResponse_1.default)(res, true, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Donors successfully found",
        meta,
        data,
    });
}));
const getDonorByIdFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield donation_service_1.DonationService.getDonorByIdFromDB(id);
    (0, sendResponse_1.default)(res, false, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Donation Id or Info retrieved successfully",
        data: result,
    });
}));
exports.DonationController = {
    donationRequest,
    getAllDonationRequest,
    updateDonationRequest,
    getDonorList,
    getDonorByIdFromDB
};
