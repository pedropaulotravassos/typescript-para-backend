import express, { Response } from "express";
import router from "./routes";
import "reflect-metadata";
import { AppDataSource } from "./config/dataSource";
AppDataSource.initialize()
  .then(() => {
    console.log("Database conectado");
  })
  .catch((ex) => {
    console.log("Erro ao conectar com a base de dados");
    console.log(ex);
  });

const app = express();
app.use(express.json());
router(app);

app.get("/", (_, res: Response) => {
  res.send("Bem vindo ao curso de TypeScript!");
});

export default app;
