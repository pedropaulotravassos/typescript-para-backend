import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";
const listaDePets = [];
export default class PetController {
  criaPet(req: Request, res: Response) {
    const { id, especie, idade, nome } = <TipoPet>req.body;
    if (
      id == undefined ||
      especie == undefined ||
      idade == undefined ||
      nome == undefined
    ) {
      return res
        .status(400)
        .json({ mensagem: "Todos os campos são obrigatórios" });
    }
    const novoPet: TipoPet = {
      id: Number(id),
      especie,
      idade: Number(id),
      nome,
    };
    listaDePets.push(novoPet);
    return res.json(novoPet);
  }
}
