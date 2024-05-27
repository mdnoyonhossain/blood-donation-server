"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const requestStatus = [
    client_1.RequestStatus.APPROVED,
    client_1.RequestStatus.REJECTED,
];
const updateDonationRequestValidationSchema = zod_1.z.object({
    status: zod_1.z
        .enum(requestStatus)
        .refine((status) => requestStatus.includes(status), {
        message: "Status must be either APPROVED or REJECTED!",
    }),
});
exports.DonationValidation = {
    updateDonationRequestValidationSchema,
};
