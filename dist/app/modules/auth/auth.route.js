"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserRoutes = exports.AllUserRoute = exports.changePasswordRoute = exports.loginRoute = exports.RegistrationRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const client_1 = require("@prisma/client");
const registration = express_1.default.Router();
registration.post("/", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.registrationValidationSchema), auth_controller_1.AuthController.registration);
const login = express_1.default.Router();
login.post("/", (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginValidationSchema), auth_controller_1.AuthController.login);
const changePassword = express_1.default.Router();
changePassword.post("/", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), (0, validateRequest_1.default)(auth_validation_1.AuthValidation.changePasswordValidationSchema), auth_controller_1.AuthController.changePassword);
const allUser = express_1.default.Router();
allUser.get("/", (0, auth_1.default)(client_1.UserRole.ADMIN), auth_controller_1.AuthController.getAllUser);
const updateUser = express_1.default.Router();
updateUser.put("/:id", (0, auth_1.default)(client_1.UserRole.ADMIN), auth_controller_1.AuthController.updateUserStatus);
exports.RegistrationRoute = registration;
exports.loginRoute = login;
exports.changePasswordRoute = changePassword;
exports.AllUserRoute = allUser;
exports.updateUserRoutes = updateUser;
