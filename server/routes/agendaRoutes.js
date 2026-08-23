import express from "express";
const router = express.Router();

import AuthMiddleware from "../middleware/auth";
import AgendaController from "../controllers/agendaController";

router
  .route("/meeting/:id/agenda")
  .all(AuthMiddleware.LoginCheck, AuthMiddleware.Authorization("admin"))
  .post(AgendaController.createAgenda)
  .put(AgendaController.updateAgenda)
  .delete(AgendaController.deleteAgenda);

export default router;
