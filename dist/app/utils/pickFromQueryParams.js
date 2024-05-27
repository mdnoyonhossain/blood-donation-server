"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pickFromQueryParams = (query, keys) => {
    const finalObj = {};
    for (const key of keys) {
        if (query && query[key]) {
            finalObj[key] = query[key];
        }
    }
    return finalObj;
};
exports.default = pickFromQueryParams;
