"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, isMetaAvailable, data) => {
    const resObj = {
        success: data.success,
        statusCode: data.statusCode,
        message: data.message,
    };
    if (isMetaAvailable) {
        resObj.meta = data.meta;
    }
    resObj.data = data.data;
    res.status(data.statusCode).json(resObj);
};
exports.default = sendResponse;
