"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const registrationValidationSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be string",
    }),
    email: zod_1.z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be string",
    }),
    password: zod_1.z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be string",
    }),
    bloodType: zod_1.z.enum(Object.values(client_1.BloodType)),
    location: zod_1.z.string({
        required_error: "Location is required",
        invalid_type_error: "Location must be string",
    }),
    age: zod_1.z.number({
        required_error: "Age is required",
        invalid_type_error: "Age must be number",
    }),
    bio: zod_1.z.string({
        required_error: "Bio is required",
        invalid_type_error: "Bio must be string",
    }),
    lastDonationDate: zod_1.z.string({
        required_error: "Last donation date is required",
        invalid_type_error: "Last donation date must be string",
    }),
});
const loginValidationSchema = zod_1.z.object({
    email: zod_1.z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be string",
    }),
    password: zod_1.z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be string",
    }),
});
const changePasswordValidationSchema = zod_1.z.object({
    oldPassword: zod_1.z.string({ required_error: "Old Password is required", invalid_type_error: "Old Password must be string" }),
    newPassword: zod_1.z.string({ required_error: "New Password is required", invalid_type_error: "New Password must be string" }),
});
exports.AuthValidation = {
    registrationValidationSchema,
    loginValidationSchema,
    changePasswordValidationSchema
};
