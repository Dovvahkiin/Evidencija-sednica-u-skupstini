import MeetingValidators from "../validations/meetingValidations";
import MeetingServices from "../services/meetingServices";
import chalk from "chalk";
import { genericCatchBlock } from "../utils/constants";

class MeetingController {
  async getAllMeetings(req, res) {
    try {
      const result = MeetingServices.getAllMeetings();
      if (result === 0)
        return res
          .status(404)
          .json({ Message: "There is no recorded meetings." });

      return res.status(200).json({ result });
    } catch (error) {
      return genericCatchBlock(res, error);
    }
  }

  async getMeetingById(req, res) {
    try {
      const ID = parseInt(req.params.id, 10);
      const result = MeetingServices.getMeetingById(ID);

      if (result === 0)
        return res.status(404).json({
          Message: `Meeting with ${ID} does not exists.`,
        });

      return res.status(200).json({ result });
    } catch (error) {
      return genericCatchBlock(res, error);
    }
  }

  async createMeeting(req, res) {
    try {
      const data = req.body;
      const validationResult = await MeetingValidators.dataValidation(
        "create",
        data,
      );

      if (validationResult.length > 0) {
        return res.status(400).json({ errors: validationResult.errors });
      }

      const { meetingTitle, date, attendees, meetingStatusId, content } = data;
      let newMeetingStatusId = meetingStatusId;

      const newMeeting = await MeetingServices.createMeeting(
        meetingTitle,
        date,
        attendees,
        newMeetingStatusId,
        content,
      );
      console.log(chalk.green("Successfully created meeting."));
      return res.status(201).json({ success: true, newMeeting });
    } catch (error) {
      return genericCatchBlock(res, error);
    }
  }

  deleteMeeting = async (req, res) => {
    try {
      const meetingID = parseInt(req.params.id, 10);
      const result = await MeetingServices.deleteMeeting(meetingID);

      if (result > 0)
        return res.status(200).json({
          success: true,
          message: `Meeting with an ID ${meetingID} is successfully deleted!`,
        });
      else
        return res
          .status(404)
          .json({ success: false, message: "Meeting does not exists." });
    } catch (error) {
      return genericCatchBlock(res, error);
    }
  };

  async editMeeting(req, res) {
    try {
      const data = req.body;
      const validationResult = await MeetingValidators.dataValidation(
        "update",
        data,
      );

      if (validationResult.length > 0) {
        return res.status(400).json({ Errors: validationResult.errors });
      }

      const { meetingTitle, date, attendees, meetingStatusId, content } = data;

      const ID = parseInt(req.params.id, 10);
      const updateMeeting = await MeetingServices.editMeeting(
        ID,
        meetingTitle,
        date,
        attendees,
        meetingStatusId,
        content,
      );

      console.log(chalk.green("Successfully updated meeting."));
      return res.status(201).json({ success: true, updateMeeting });
    } catch (error) {
      return genericCatchBlock(res, error);
    }
  }
}

export default MeetingController;
