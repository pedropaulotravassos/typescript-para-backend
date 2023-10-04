import express, { Response } from "express";
import router from "./routes";

const app = express();
app.use(express.json());
router(app);

export default app;
