import DBModel from "./dbModel";

class MeetingModel extends DBModel {
  constructor() {
    super("sednica");
  }

  async addNewMeeting(meetingTitle, date, attendees, meetingStatusId, content) {
    const upit = "CALL dodajNovuSednicu (?,?,?,?,?)";
    return await this.doExecuteQuery(upit, [
      meetingTitle,
      date,
      attendees,
      meetingStatusId,
      content,
    ]);
  }

  async deleteMeeting(id) {
    const query = "CALL obrisiSednicu(?)";
    const result = await this.doExecuteQuery(query, [id]);
    return result[0]?.[0]?.deleted ?? 0;
  }

  async editMeeting(
    meetingId,
    meetingTitle,
    date,
    attendees,
    meetingStatusId,
    content,
  ) {
    const upit = "CALL azurirajSednicu (?,?,?,?,?,?)";
    return await this.izvrsiUpit(upit, [
      meetingId,
      meetingTitle || null,
      date || null,
      attendees || null,
      meetingStatusId || null,
      content || null,
    ]);
  }
}

// for SQL VIEWS use code below
// const foo = new DBModel("viewName");

export default MeetingModel;
