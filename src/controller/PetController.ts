import { Request, Response } from "express";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";

let listaDePets: PetEntity[] = [];

export default class PetController {
  constructor(private repository: PetRepository) {}

  criaPet(req: Request, res: Response) {
    const { dataDeNascimento, especie, adotado, nome } = <PetEntity>req.body;
    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(404).json({ mensagem: "especie errada" });
    }

    const novoPet = new PetEntity(nome, especie, dataDeNascimento, adotado);
    novoPet.dataDeNascimento = dataDeNascimento;
    novoPet.especie = especie;
    novoPet.adotado = adotado;
    novoPet.nome = nome;

    this.repository.criaPet(novoPet);
    return res.status(201).json(novoPet);
  }

  async listaPet(req: Request, res: Response) {
    const listaDePets = await this.repository.listaPet();
    return res.status(200).json(listaDePets);
  }

  async atualizaPet(req: Request, res: Response) {
    const { id, dataDeNascimento, especie, adotado, nome } = <PetEntity>(
      req.body
    );

    let pet = new PetEntity(nome, especie, dataDeNascimento, adotado);

    const result = await this.repository.atualizaPet(id, pet);

    res.status(200).json(result);
  }

  async deletaPet(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    const result = await this.repository.deletaPet(id);

    res.status(200).json(result);
  }

  async adotaPet(req: Request, res: Response) {
    const { pet_id, id_adotante } = req.params;
    const { success, message } = await this.repository.adotaPet(
      Number(pet_id),
      Number(id_adotante)
    );
    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }
}
