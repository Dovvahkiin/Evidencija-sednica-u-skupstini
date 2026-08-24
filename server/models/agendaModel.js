import DBModel from "./dbModel.js";

class AgendaModel extends DBModel {
  constructor() {
    super("agenda");
  }
  static async addNewAgenda(agendaContent, IDMeeting) {
    const query = "CALL addAgenda (?,?)";
    const result = await this.doExecuteQuery(query, [agendaContent, IDMeeting]);
    return result[0][0];
  }

  static async updateAgenda(IDMeeting, agendaContent) {
    const query = "CALL updateAgenda (?,?)";
    const result = await this.doExecuteQuery(query, [IDMeeting, agendaContent]);
    return result[0][0];
  }

  static async deleteAgenda(IDAgenda) {
    const query = "CALL deleteAgenda (?)";
    const [result] = await this.doExecuteQuery(query, [IDAgenda]);
    return result[0][0];
  }
}

export default AgendaModel;
