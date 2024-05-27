"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileValidation = void 0;
const zod_1 = require("zod");
const updateProfileValidationSchema = zod_1.z.object({
    age: zod_1.z
        .number({
        required_error: "Age is required",
        invalid_type_error: "Age must be number",
    })
        .optional(),
    bio: zod_1.z
        .string({
        required_error: "Bio is required",
        invalid_type_error: "Bio must be string",
    })
        .optional(),
    lastDonationDate: zod_1.z
        .string({
        required_error: "Last donation date is required",
        invalid_type_error: "Last donation date must be string",
    })
        .optional(),
});
exports.ProfileValidation = {
    updateProfileValidationSchema,
};
