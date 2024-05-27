"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const profile_controller_1 = require("./profile.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const profile_validation_1 = require("./profile.validation");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), profile_controller_1.ProfileController.getMyProfile);
router.put("/", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), (0, validateRequest_1.default)(profile_validation_1.ProfileValidation.updateProfileValidationSchema), profile_controller_1.ProfileController.updateMyProfile);
exports.ProfileRoute = router;
