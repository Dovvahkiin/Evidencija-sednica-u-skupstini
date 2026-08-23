import express from "express";
const router = express.Router();

import MeetingController from "../controllers/meetingController";
import AuthMiddleware from "../middleware/auth";

router
  .route("/meetings")
  .post(
    AuthMiddleware.LoginCheck,
    AuthMiddleware.Authorization("admin"),
    MeetingController.createMeeting,
  )
  .get(MeetingController.getAllMeetings);

router
  .route("/meetings/:id")
  .get(MeetingController.getMeetingById)
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
