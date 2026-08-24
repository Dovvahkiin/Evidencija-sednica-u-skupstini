import express from "express";
const router = express.Router();

import AuthMiddleware from "../middleware/auth.js";
import AgendaController from "../controllers/agendaController.js";

router
  .route("/meeting/:id/agenda")
  .all(AuthMiddleware.Authentication, AuthMiddleware.Authorization("admin"))
  .post(AgendaController.createAgenda)
  .put(AgendaController.updateAgenda)
  .delete(AgendaController.deleteAgenda);

export default router;
