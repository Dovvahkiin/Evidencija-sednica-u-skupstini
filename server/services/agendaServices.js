import AgendaModel from "../models/agendaModel.js";

class AgendaServices {
  static createAgenda = async (agendaContent, meetingID) => {
    return await AgendaModel.addNewAgenda(agendaContent, meetingID);
  };

  static updateAgenda = async (agendaContent, meetingID) => {
    return await AgendaModel.updateAgenda(agendaContent, meetingID);
  };

  static deleteAgenda = async (agendaID) => {
    return await AgendaModel.deleteAgenda(agendaID);
  };
}

export default AgendaServices;
