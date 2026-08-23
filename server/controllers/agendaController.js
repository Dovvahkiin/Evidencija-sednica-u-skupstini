import MeetingValidators from "../validations/meetingValidations.js";
import AgendaServices from "../services/agendaServices.js";
import chalk from "chalk";
import { genericCatchBlock } from "../utils/constants.js";

class AgendaController {
  static createAgenda = async (req, res) => {
    try {
      const ID = parseInt(req.params.id, 10);
      const content = req.body;

      const validationResult = await MeetingValidators.dataValidation(
        "agenda",
        content,
      );

      if (validationResult.length > 0)
        return res.status(400).json({ errors: validationResult.errors });

      const newAgenda = await AgendaServices.createAgenda(content, ID);
      console.log(chalk.green("Successfully created agenda."));
      return res.status(201).json({ success: true, newAgenda });
    } catch (error) {
      return genericCatchBlock(res, error);
    }
  };

  static updateAgenda = async (req, res) => {
    try {
      const ID = parseInt(req.params.id, 10);
      const content = req.body;

      const validationResult = await MeetingValidators.dataValidation(
        "agenda",
        content,
      );

      if (validationResult.length > 0)
        return res.status(400).json({ errors: validationResult.errors });

      const updatedAgenda = await AgendaServices.updateAgenda(content, ID);
      console.log(chalk.green("Successfully updated agenda."));
      return res.status(201).json({ success: true, updatedAgenda });
    } catch (error) {
      return genericCatchBlock(res, error);
    }
  };

  static deleteAgenda = async (req, res) => {
    try {
      const ID = parseInt(req.params.id, 10);
      const result = await AgendaServices.deleteAgenda(ID);

      if (result === 1) {
        console.log(chalk.green("Successfully deleted agenda."));
        return res
          .status(200)
          .json({ success: true, message: "Successfully deleted agenda" });
      } else
        return res
          .status(404)
          .json({ success: false, message: "Agenda does not exists." });
    } catch (error) {
      return genericCatchBlock(res, error);
    }
  };
}

export default AgendaController;
