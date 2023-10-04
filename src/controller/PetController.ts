import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";
let listaDePets: Array<TipoPet> = [];

export default class PetController {
  criaPet(req: Request, res: Response) {
    const { id, adotado, especie, idade, nome } = <TipoPet>req.body;
    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(400).json({ error: "Especie inválida" });
    }

    const novoPet: TipoPet = { id, adotado, especie, idade, nome };
    listaDePets.push(novoPet);
    return res.status(201).json(novoPet);
  }

  listaPet(req: Request, res: Response) {
    return res.status(200).json(listaDePets);
  }

  atualizaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, idade, especie, adotado } = req.body as TipoPet;
    const pet = listaDePets.find((pet) => pet.id === Number(id));
    if (!pet) {
      return res.status(400).json({ mensagem: "Pet não encontrado" });
    }
    pet.nome = nome;
    pet.idade = idade;
    pet.especie = especie;
    pet.adotado = adotado;
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
