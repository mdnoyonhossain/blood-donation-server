"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../error/AppError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const auth = (...role) => {
    return (0, catchAsync_1.default)((req, res, next) => {
        const token = req.headers.authorization;
        let decode;
        try {
            decode = jsonwebtoken_1.default.verify(token, config_1.config.JWT_ACCESS_SECRET);
            if (role.length && !role.includes(decode.role)) {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized!");
            }
        }
        catch (error) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized!");
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
exports.default = auth;
