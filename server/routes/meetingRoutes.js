import express from "express";
const router = express.Router();

import MeetingController from "../controllers/meetingController.js";
import AuthMiddleware from "../middleware/auth.js";

router
  .route("/meetings")
  .post(
    AuthMiddleware.Authentication,
    AuthMiddleware.Authorization("admin"),
    MeetingController.createMeeting,
  )
  .get(AuthMiddleware.Authentication, MeetingController.getAllMeetings);

router
  .route("/meeting/:id")
  .get(AuthMiddleware.Authentication, MeetingController.getMeetingById)
  .put(
    AuthMiddleware.Authentication,
    AuthMiddleware.Authorization("admin"),
    MeetingController.editMeeting,
  )
  .delete(
    AuthMiddleware.Authentication,
    AuthMiddleware.Authorization("admin"),
    MeetingController.deleteMeeting,
  );

export default router;
