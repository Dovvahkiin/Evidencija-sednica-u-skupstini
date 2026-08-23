import express from "express";
const router = express.Router();

import AuthMiddleware from "../middleware/auth.js";
import UserController from "../controllers/userController.js";

router.post(
  "/profile",
  AuthMiddleware.Authentication,
  UserController.getProfile,
);

export default router;
