import DBModel from "./dbModel.js";

class MeetingModel extends DBModel {
  constructor() {
    super("meetings");
  }

  static async addNewMeeting(
    meetingTitle,
    date,
    attendees,
    meetingStatusId,
    content,
  ) {
    const query = "CALL createMeeting (?,?,?,?,?)";
    console.log(meetingTitle, date, attendees, meetingStatusId, content);
    return await this.doExecuteQuery(query, [
      meetingTitle,
      date,
      attendees,
      meetingStatusId,
      content,
    ]);
  }

  static async deleteMeeting(id) {
    const query = "CALL deleteMeeting(?)";
    const [result] = await this.doExecuteQuery(query, [id]);
    console.log(result);
    return result[0][0];
  }

  static async editMeeting(
    meetingId,
    meetingTitle,
    date,
    attendees,
    meetingStatusId,
    content,
  ) {
    const query = "CALL updateMeeting (?,?,?,?,?,?)";
    return await this.doExecuteQuery(query, [
      meetingId,
      meetingTitle || null,
      date || null,
      attendees || null,
      meetingStatusId || null,
      content || null,
    ]);
  }
}

// for SQL VIEWS use code below (if it uses default functions from DBModel)
// const foo = new DBModel("viewName");

export default MeetingModel;
