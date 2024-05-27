"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generatePaginationAndSorting = (metaOptions, sortByFields) => {
    const page = Number(metaOptions.page) || 1;
    const limit = Number(metaOptions.limit) || 10;
    const skip = (page - 1) * limit;
    let sortObj = {};
    const sortBy = sortByFields.includes(metaOptions.sortBy)
        ? metaOptions.sortBy
        : "";
    const sortOrder = metaOptions.sortOrder || "asc";
    if (sortBy) {
        sortObj = {
            [sortBy]: sortOrder,
        };
    }
    return {
        page,
        limit,
        skip,
        sortObj,
    };
};
exports.default = generatePaginationAndSorting;
