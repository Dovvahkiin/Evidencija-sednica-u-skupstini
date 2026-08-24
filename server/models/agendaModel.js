import DBModel from "./dbModel.js";

class AgendaModel extends DBModel {
  constructor() {
    super("agenda");
  }
  static async addNewAgenda(agendaContent, IDMeeting) {
    const query = "CALL addAgenda (?,?)";
    return await this.doExecuteQuery(query, [agendaContent, IDMeeting]);
  }

  static async updateAgenda(agendaContent, IDMeeting) {
    const query = "CALL updateAgenda (?,?)";
    return await this.doExecuteQuery(query, [agendaContent, IDMeeting]);
  }

  static async deleteAgenda(IDAgenda) {
    const query = "CALL deleteAgenda (?)";
    return await this.doExecuteQuery(query, [IDAgenda]);
  }
}

export default AgendaModel;
