import AgendaModel from "../models/agendaModel";

class AgendaServices {
  createAgenda = async (agendaContent, meetingID) => {
    return await AgendaModel.createAgenda(agendaContent, meetingID);
  };

  updateAgenda = async (agendaContent, meetingID) => {
    return await AgendaModel.updateAgenda(agendaContent, meetingID);
  };

  deleteAgenda = async (agendaID) => {
    return await AgendaModel.deleteAgenda(agendaID);
  };
}

export default AgendaServices;
