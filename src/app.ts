import express, { Request, Response } from "express";
import router from "./routes";
const app = express();
app.use(express.json());
router(app);

app.get("/", (req: Request, res: Response) => {
  res.send("Bem vindo ao curso de TypeScript!");
});

export default app;
