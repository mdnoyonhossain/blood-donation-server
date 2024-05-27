"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zodErrorHandler = (error) => {
    let message = "";
    error.issues.forEach((issue) => {
        message += `${issue.message}. `;
    });
    message = message.trim();
    const issues = error.issues.map((issue) => {
        return {
            field: issue.path[0],
            message: issue.message,
        };
    });
    return {
        message,
        issues,
    };
};
exports.default = zodErrorHandler;
