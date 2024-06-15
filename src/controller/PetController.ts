import { Request, Response } from "express";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import EnumPorte from "../enum/EnumPorte";
import {
  TipoRequestBodyPet,
  TipoRequestParamsPet,
  TipoRequestQueryPet,
  TipoResponseBodyPet,
} from "../tipos/TiposPet";

let listaDePets: PetEntity[] = [];

export default class PetController {
  constructor(private repository: PetRepository) {}

  criaPet(
    req: Request<
      TipoRequestParamsPet,
      {},
      TipoRequestBodyPet,
      TipoRequestQueryPet
    >,
    res: Response<TipoResponseBodyPet>
  ) {
    const { dataDeNascimento, especie, adotado, nome, porte } = <PetEntity>(
      req.body
    );
    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(404).json({
        sucesso: false,
        mensagem: "especie errada",
        error: "especie errada",
      });
    }

    if (porte && !(porte in EnumPorte))
      return res.status(404).json({
        sucesso: false,
        mensagem: "porte errado",
        error: "porte errado",
      });
    const novoPet = new PetEntity(
      nome,
      especie,
      dataDeNascimento,
      adotado,
      porte
    );
    novoPet.dataDeNascimento = dataDeNascimento;
    novoPet.especie = especie;
    novoPet.adotado = adotado;
    novoPet.nome = nome;

    this.repository.criaPet(novoPet);
    return res.status(201).json({
      data: novoPet,
      sucesso: true,
      mensagem: "Pet criado com sucesso",
    });
  }

  async listaPet(
    req: Request<
      TipoRequestParamsPet,
      {},
      TipoRequestBodyPet,
      TipoRequestQueryPet
    >,
    res: Response<TipoResponseBodyPet>
  ) {
    const listaDePets = await this.repository.listaPet();
    return res.status(200).json({
      data: listaDePets.map((pet) => {
        const { id, nome, especie, porte } = pet;
        return { id, nome, especie, porte };
      }),
      sucesso: true,
      mensagem: "Pets cadastrados",
    });
  }

  async atualizaPet(
    req: Request<TipoRequestParamsPet, any, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>
  ) {
    const { id, dataDeNascimento, especie, adotado, nome, porte } = <PetEntity>(
      req.body
    );

    let pet = new PetEntity(nome, especie, dataDeNascimento, adotado, porte);

    const { message, success } = await this.repository.atualizaPet(id, pet);

    res.status(200).json({ mensagem: message, sucesso: success });
  }

  async deletaPet(
    req: Request<
      TipoRequestParamsPet,
      {},
      TipoRequestBodyPet,
      TipoRequestQueryPet
    >,
    res: Response<TipoResponseBodyPet>
  ) {
    const { id } = req.params;

    const { message, success } = await this.repository.deletaPet(Number(id));

    res.status(200).json({ mensagem: message, sucesso: success });
  }

  async adotaPet(
    req: Request<
      TipoRequestParamsPet,
      {},
      TipoRequestBodyPet,
      TipoRequestQueryPet
    >,
    res: Response<TipoResponseBodyPet>
  ) {
    const { id_pet, id_adotante } = req.params;
    const { success, message } = await this.repository.adotaPet(
      Number(id_pet),
      Number(id_adotante)
    );
    if (!success) {
      return res.status(404).json({ mensagem: message, sucesso: success });
    }
    return res.sendStatus(204).json({ mensagem: message, sucesso: success });
  }

  async buscaPetPeloPorte(
    req: Request<
      TipoRequestParamsPet,
      {},
      TipoRequestBodyPet,
      TipoRequestQueryPet
    >,
    res: Response<TipoResponseBodyPet>
  ) {
    console.log(req.query);
    const { porte } = req.query;
    const listaDePets = await this.repository.buscaPetPeloPorte(
      porte as EnumPorte
    );
    return res.status(200).json({
      data: listaDePets.map((pet) => {
        const { id, nome, especie, porte } = pet;
        return { id, nome, especie, porte };
      }),
      sucesso: true,
      mensagem: "lista de pets",
    });
  }

  async buscaPetPorCampoGenerico(
    req: Request<
      TipoRequestParamsPet,
      {},
      TipoRequestBodyPet,
      TipoRequestQueryPet
    >,
    res: Response<TipoResponseBodyPet>
  ) {
    console.log(req.query);
    const { campo, valor } = req.query;
    const listaDePets = await this.repository.buscaPetPorCampoGenerico(
      campo as keyof PetEntity,
      valor as string
    );
    return res.status(200).json({
      data: listaDePets.map((pet) => {
        const { id, nome, especie, porte } = pet;
        return { id, nome, especie, porte };
      }),
      sucesso: true,
      mensagem: "listaDePets",
    });
  }
}
