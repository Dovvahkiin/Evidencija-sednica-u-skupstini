import express from "express";
const router = express.Router();

import AuthMiddleware from "../middleware/auth";
import AuthenticationController from "../controllers/authController";

router.post(
  "/login",
  AuthMiddleware.LoginCheck,
  AuthenticationController.login,
);
router.post("logout", AuthenticationController.logout);

export default router;
