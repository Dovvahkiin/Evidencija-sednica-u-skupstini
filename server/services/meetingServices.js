import DBModel from "../models/dbModel.js";
import MeetingModel from "../models/meetingModel.js";
import MembersClass from "../utils/quota.js";
import chalk from "chalk";

class MeetingServices {
  static getAllMeetings = async () => {
    const getMeetings = new DBModel("allmeetings");
    const meetings = await getMeetings.getAll();

    if (meetings.length === 0) {
      console.log(chalk.red("There is no recored meetings."));
      return false;
    } else {
      console.log(chalk.green("List of meetings:\n"));
      return meetings;
    }
  };

  static getMeetingById = async (id) => {
    const getMeeting = new DBModel("meetingdetails");
    const meeting = await getMeeting.getById(id);

    if (meeting) {
      console.log(chalk.green("Selected meeting:\n"));
      console.log(meeting);
      return meeting;
    } else {
      console.log(chalk.red("There is no recored meeting with that ID."));
      return false;
    }
  };

  static createMeeting = async (data) => {
    const { meetingTitle, date, attendees, meetingStatusId, content } = data;
    console.log(data);
    let newStatus = meetingStatusId;
    const currentMembersNumber = await MembersClass.membersCheck(attendees);
    if (currentMembersNumber === 0) newStatus = 3;

    return MeetingModel.addNewMeeting(
      meetingTitle,
      date,
      attendees,
      newStatus,
      content,
    );
  };

  static deleteMeeting = async (id) => {
    const deleteResult = await MeetingModel.deleteMeeting(id);
    if (deleteResult.deleted > 0) {
      return true;
    } else return false;
  };

  static editMeeting = async (data, id) => {
    const { meetingTitle, date, attendees, meetingStatusId, content } = data;
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
