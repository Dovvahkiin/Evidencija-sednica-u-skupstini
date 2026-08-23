import meetingRouter from "./meetingRoutes.js";
import userRouter from "./userRoutes.js";
import agendaRouter from "./agendaRoutes.js";
import authRouter from "./authRoutes.js";

const centralizedRouter = (app) => {
  app.use("/", meetingRouter);
  app.use("/", userRouter);
  app.use("/", agendaRouter);
  app.use("/", authRouter);
};

export default centralizedRouter;
