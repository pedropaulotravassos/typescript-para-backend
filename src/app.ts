import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Bem vindo ao curso de TypeScript!");
});

function criaPet(id: number, nome: string, especie: string, idade: number) {
  return {
    id,
    nome,
    especie,
    idade,
  };
}

let id = 0;
function geraId() {
  id = id + 1;
  return id;
}

app.post("/pets", (req: Request, res: Response) => {
  const pet1 = criaPet(geraId(), "Bolt", "cachorro", 3);
  const pet2 = criaPet(geraId(), "Mel", "gato", 2);

  res.send([pet1, pet2]);
});

export default app;
