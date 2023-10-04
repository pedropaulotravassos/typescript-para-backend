import express from "express";
import petRoutes from "../routes/petRoutes";
const router = (app: express.Router) => {
  app.use("/pets", petRoutes);
};

export default router;
