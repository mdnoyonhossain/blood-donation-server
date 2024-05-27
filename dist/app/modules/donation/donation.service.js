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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationService = void 0;
const prismaClient_1 = __importDefault(require("../../utils/prismaClient"));
const donation_constant_1 = require("./donation.constant");
const generatePaginationAndSorting_1 = __importDefault(require("../../utils/generatePaginationAndSorting"));
// donation request
const donationRequest = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const donationRequest = {
        donorId: payload.donorId,
        requesterId: user.id,
        phoneNumber: payload.phoneNumber,
        dateOfDonation: payload.dateOfDonation,
        hospitalName: payload.hospitalName,
        hospitalAddress: payload.hospitalAddress,
        reason: payload.reason,
    };
    const createdRequest = yield prismaClient_1.default.request.create({
        data: donationRequest,
    });
    const requestDetails = yield prismaClient_1.default.request.findUniqueOrThrow({
        where: {
            id: createdRequest.id,
        },
        include: {
            donor: {
                include: {
                    userProfile: true,
                },
            },
        },
    });
    const { requesterId } = requestDetails, result = __rest(requestDetails, ["requesterId"]);
    return result;
});
// get all donation request
const getAllDonationRequest = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.default.request.findMany({
        where: {
            donorId: user.id,
        },
        include: {
            requester: true,
            donor: true
        },
    });
    return result;
});
// update donation request status
const updateDonationRequest = (requestId, user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient_1.default.request.findUniqueOrThrow({
        where: {
            id: requestId,
            donorId: user.id,
        },
    });
    const result = yield prismaClient_1.default.request.update({
        where: {
            id: requestId,
            donorId: user.id,
        },
        data: {
            requestStatus: payload.status,
        },
    });
    return result;
});
// get donor list
const getDonorList = (query, metaData) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = query, filterData = __rest(query, ["searchTerm"]);
    const { page, limit, skip, sortObj } = (0, generatePaginationAndSorting_1.default)(metaData, donation_constant_1.donorListSortByFields);
    let nestedSortObj = {};
    if ("age" in sortObj || "lastDonationDate" in sortObj) {
        nestedSortObj = {
            userProfile: Object.assign({}, sortObj),
        };
    }
    const finalSortObj = Object.keys(nestedSortObj).length === 0 ? sortObj : nestedSortObj;
    const conditions = [];
    if (searchTerm) {
        conditions.push({
            OR: donation_constant_1.donorListSearchFields.map((searchField) => {
                return {
                    [searchField]: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                };
            }),
        });
    }
    const filterFieldsName = Object.keys(filterData);
    if (filterFieldsName.length > 0) {
        conditions.push({
            AND: filterFieldsName.map((filterField) => {
                const equalValue = filterData[filterField];
                if (equalValue === "true" || equalValue === "false") {
                    return {
                        [filterField]: {
                            equals: equalValue === "true" ? true : false,
                        },
                    };
                }
                else {
                    return {
                        [filterField]: {
                            equals: filterData[filterField],
                        },
                    };
                }
            }),
        });
    }
    const whereCondition = {
        AND: conditions,
    };
    const result = yield prismaClient_1.default.user.findMany({
        where: whereCondition,
        include: {
            userProfile: true
        },
        skip,
        take: limit,
        orderBy: finalSortObj,
    });
    const total = yield prismaClient_1.default.user.count({
        where: whereCondition,
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getDonorByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.default.user.findUniqueOrThrow({
        where: {
            id,
        },
        include: {
            userProfile: true,
            requestsAsDonor: true,
            requestsAsRequester: true
        },
    });
    return result;
});
exports.DonationService = {
    donationRequest,
    getAllDonationRequest,
    updateDonationRequest,
    getDonorList,
    getDonorByIdFromDB
};
