import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";
const listaDePets: TipoPet[] = [];
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
    return res.status(200).json(novoPet);
  }
  listaPets(req: Request, res: Response) {
    return res.status(200).json(listaDePets);
  }
  atualizaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { especie, idade, nome } = req.body as TipoPet;
    const pet = listaDePets.find((pet) => pet.id === Number(id));

    if (!pet) {
      return res.status(400).json({ mensagem: "Pet não encontrado" });
    }
    pet.nome = nome;
    pet.idade = idade;
    pet.especie = especie;
    return res.status(200).json(pet);
  }

  deletaPet(req: Request, res: Response) {
    const { id } = req.params;
    const pet = listaDePets.find((pet) => pet.id === Number(id));
    if (!pet) {
      return res.status(400).json({ mensagem: "Pet não encontrado" });
    }

    const indice = listaDePets.indexOf(pet);
    listaDePets.splice(indice, 1);
    return res.status(204).json();
  }
}
