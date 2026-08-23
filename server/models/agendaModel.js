import DBModel from "./dbModel";

class AgendaModel extends DBModel {
  constructor() {
    super("dnevni_red");
  }
  static async addNewAgenda(text, IDMeeting) {
    const query = "CALL dodajDnevniRed (?,?)";
    return await this.doExecuteQuery(query, [text, IDMeeting]);
  }

  static async updateAgenda(text, IDMeeting) {
    const query = "CALL azurirajDnevniRed (?,?)";
    return await this.doExecuteQuery(query, [IDMeeting, text]);
  }

  static async deleteAgenda(IDAgenda) {
    const query = "CALL obrisiDnevniRed (?)";
    return await this.doExecuteQuery(query, [IDAgenda]);
  }
}

export default AgendaModel;
