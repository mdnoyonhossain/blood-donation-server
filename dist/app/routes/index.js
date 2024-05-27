"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const profile_route_1 = require("../modules/profile/profile.route");
const donation_route_1 = require("../modules/donation/donation.route");
const router = express_1.default.Router();
const routes = [
    {
        path: "/register",
        router: auth_route_1.RegistrationRoute,
    },
    {
        path: "/login",
        router: auth_route_1.loginRoute,
    },
    {
        path: "/change-password",
        router: auth_route_1.changePasswordRoute,
    },
    {
        path: "/my-profile",
        router: profile_route_1.ProfileRoute,
    },
    {
        path: "/donation-request",
        router: donation_route_1.DonationRequestRoute,
    },
    {
        path: "/donor-list",
        router: donation_route_1.DonorListRoute,
    },
    {
        path: "/all-user",
        router: auth_route_1.AllUserRoute,
    },
    {
        path: "/update-user-staus",
        router: auth_route_1.updateUserRoutes,
    },
];
routes.map((route) => {
    router.use(route.path, route.router);
});
exports.default = router;
