import DBModel from "./dbModel";

class AgendaModel extends DBModel {
  constructor() {
    super("dnevni_red");
  }
  async addNewAgenda(text, IDMeeting) {
    const query = "CALL dodajDnevniRed (?,?)";
    return await this.doExecuteQuery(query, [text, IDMeeting]);
  }

  async updateAgenda(text, IDMeeting) {
    const query = "CALL azurirajDnevniRed (?,?)";
    return await this.doExecuteQuery(query, [IDMeeting, text]);
  }

  async deleteAgenda(IDAgenda) {
    const upit = "CALL obrisiDnevniRed (?)";
    return await this.doExecuteQuery(upit, [IDAgenda]);
  }
}

export default AgendaModel;
