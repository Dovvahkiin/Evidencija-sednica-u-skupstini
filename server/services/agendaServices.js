import AgendaModel from "../models/agendaModel.js";

class AgendaServices {
  static createAgenda = async (agendaContent, meetingID) => {
    return await AgendaModel.addNewAgenda(agendaContent, meetingID);
  };

  static updateAgenda = async (IDMeeting, agendaContent) => {
    return await AgendaModel.updateAgenda(IDMeeting, agendaContent);
  };

  static deleteAgenda = async (agendaID) => {
    return await AgendaModel.deleteAgenda(agendaID);
  };
}

export default AgendaServices;
