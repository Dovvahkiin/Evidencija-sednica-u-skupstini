import express from "express";
const router = express.Router();

import AuthMiddleware from "../middleware/auth";
import UserController from "../controllers/userController";

router.post(
  "/profile",
  AuthMiddleware.Authentication,
  UserController.getProfile,
);

export default router;
