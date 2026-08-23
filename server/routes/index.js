import meetingRouter from "./meetingRoutes";
import userRouter from "./userRoutes";
import agendaRouter from "./agendaRoutes";
import authRouter from "./authRoutes";

const centralizedRouter = (app) => {
  app.use("/", meetingRouter);
  app.use("/", userRouter);
  app.use("/", agendaRouter);
  app.use("/", authRouter);
};

export default centralizedRouter;
