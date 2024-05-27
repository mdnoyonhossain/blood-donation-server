"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const zod_1 = require("zod");
const zodErrorHandler_1 = __importDefault(require("../error/zodErrorHandler"));
const AppError_1 = __importDefault(require("../error/AppError"));
const globalErrorHandler = (error, _req, res, _next) => {
    const errorResponse = {
        success: false,
        message: error.message || "error mesage",
        errorDetails: error,
    };
    let statustCode = http_status_1.default.INTERNAL_SERVER_ERROR;
    if (error instanceof zod_1.ZodError) {
        const { message, issues } = (0, zodErrorHandler_1.default)(error);
        errorResponse.message = message;
        errorResponse.errorDetails = { issues };
        statustCode = http_status_1.default.BAD_REQUEST;
    }
    else if (error instanceof AppError_1.default) {
        errorResponse.message = error.message;
        statustCode = error.statusCode;
    }
    res.status(statustCode).json(errorResponse);
};
exports.default = globalErrorHandler;
