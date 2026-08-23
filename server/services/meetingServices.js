import DBModel from "../models/dbModel.js";
import MeetingModel from "../models/meetingModel.js";
import MembersClass from "../utils/quota.js";
import chalk from "chalk";

class MeetingServices {
  static getAllMeetings = async () => {
    const getMeetings = new DBModel("detaljanpregledsednice");
    const meetings = await getMeetings.getAll();

    if (meetings.length === 0) {
      console.log(chalk.red("There is no recored meetings."));
    } else {
      console.log(chalk.green("List of meetings:\n"));
      console.log(meetings);
    }
    return meetings;
  };

  static getMeetingById = async (id) => {
    const getMeeting = new DBModel("detaljanpregledsednice");
    const meeting = await getMeeting.getById(id);

    if (meeting.length === 0) {
      console.log(chalk.red("There is no recored meeting with that ID."));
    } else {
      console.log(chalk.green("Selected meeting:\n"));
      console.log(meeting);
    }
    return meeting;
  };

  static createMeeting = async (data) => {
    const [meetingTitle, date, attendees, meetingStatusId, content] = data;
    let newStatus = meetingStatusId;
    const currentMembersNumber = await MembersClass.membersCheck(attendees);
    if (currentMembersNumber === 0) newStatus = 3;

    return MeetingModel.createMeeting(
      meetingTitle,
      date,
      attendees,
      newStatus,
      content,
    );
  };

  static deleteMeeting = async (id) => {
    const deleteResult = await MeetingModel.deleteMeeting(id);
    if (deleteResult > 0) {
      return true;
    } else return false;
  };

  static editMeeting = async (data, id) => {
    const [meetingTitle, date, attendees, meetingStatusId, content] = data;
    return MeetingModel.editMeeting(
      id,
      meetingTitle,
      date,
      attendees,
      meetingStatusId,
      content,
    );
  };
}

export default MeetingServices;
