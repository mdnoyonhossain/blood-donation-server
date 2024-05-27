import express from "express";
import { AllUserRoute, RegistrationRoute, changePasswordRoute, loginRoute, updateUserRoutes } from "../modules/auth/auth.route";
import { ProfileRoute } from "../modules/profile/profile.route";
import { DonationRequestRoute, DonorListRoute } from "../modules/donation/donation.route";

const router = express.Router();

const routes = [
  {
    path: "/register",
    router: RegistrationRoute,
  },
  {
    path: "/login",
    router: loginRoute,
  },
  {
    path: "/change-password",
    router: changePasswordRoute,
  },
  {
    path: "/my-profile",
    router: ProfileRoute,
  },
  {
    path: "/donation-request",
    router: DonationRequestRoute,
  },
  {
    path: "/donor-list",
    router: DonorListRoute,
  },
  {
    path: "/all-user",
    router: AllUserRoute,
  },
  {
    path: "/update-user-staus",
    router: updateUserRoutes,
  },
];

routes.map((route) => {
  router.use(route.path, route.router);
});

export default router;
