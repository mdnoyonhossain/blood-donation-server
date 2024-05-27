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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = require("../../config");
const AppError_1 = __importDefault(require("../../error/AppError"));
const prismaClient_1 = __importDefault(require("../../utils/prismaClient"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtHelpers_1 = require("../../utils/jwtHelpers");
// registration
const registration = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, bloodType, location, age, bio, lastDonationDate, } = payload;
    // hash password
    const hashedPassword = yield bcrypt_1.default.hash(password, Number(config_1.config.SALT_ROUNDS));
    const userData = {
        name,
        email,
        password: hashedPassword,
        bloodType,
        location,
    };
    const result = yield prismaClient_1.default.$transaction((transaction) => __awaiter(void 0, void 0, void 0, function* () {
        // create user
        const userCreatedData = yield transaction.user.create({
            data: userData,
        });
        // create user profile
        yield transaction.userProfile.create({
            data: {
                userId: userCreatedData.id,
                bio,
                age,
                lastDonationDate,
            },
        });
        return yield transaction.user.findUniqueOrThrow({
            where: {
                id: userCreatedData.id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                bloodType: true,
                location: true,
                availability: true,
                createdAt: true,
                updatedAt: true,
                userProfile: true,
                userStatusChange: true
            },
        });
    }));
    return result;
});
// login
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prismaClient_1.default.user.findFirstOrThrow({
        where: {
            email: payload.email,
        },
    });
    const passwordMatched = yield bcrypt_1.default.compare(payload.password, userData.password);
    if (!passwordMatched) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Password is incorrect!");
    }
    // generate access token
    const token = jwtHelpers_1.jwtHelpers.generateToken({ id: userData.id, name: userData.name, email: userData.email, role: userData.role }, config_1.config.JWT_ACCESS_SECRET, config_1.config.JWT_ACCESS_EXPIRES_IN);
    return {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        token,
    };
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prismaClient_1.default.user.findUniqueOrThrow({
        where: {
            email: user.email
        }
    });
    const isCorrectPassword = yield bcrypt_1.default.compare(payload.oldPassword, userData.password);
    if (!isCorrectPassword) {
        throw new Error("Password incorrect!");
    }
    const hashedPassword = yield bcrypt_1.default.hash(payload.newPassword, 12);
    yield prismaClient_1.default.user.update({
        where: {
            email: userData.email
        },
        data: {
            password: hashedPassword
        }
    });
    return {
        message: "Password changed successfully!"
    };
});
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prismaClient_1.default.user.findMany();
    return result;
});
const updateUserStatus = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { role, userStatusChange } = payload;
    const updatedUser = yield prismaClient_1.default.user.update({
        where: { id: id },
        data: {
            role: role,
            userStatusChange: userStatusChange
        }
    });
    return updatedUser;
});
exports.AuthService = {
    registration,
    login,
    changePassword,
    getAllUser,
    updateUserStatus
};
