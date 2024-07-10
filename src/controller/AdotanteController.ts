import { Request, Response } from "express";
import AdotanteRepository from "../repositories/AdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import {
  TipoRequestBodyAdotante,
  TipoRequestParamsAdotante,
  TipoResponseBodyAdotante,
} from "../tipos/TiposAdotantes";

export default class AdotanteController {
  constructor(private repository: AdotanteRepository) {}

  async criaAdotante(
    req: Request<TipoRequestParamsAdotante, any, TipoRequestBodyAdotante>,
    res: Response<TipoResponseBodyAdotante>
  ) {
    const { nome, senha, celular, foto, endereco } = <AdotanteEntity>req.body;

    const novoAdotante = new AdotanteEntity(
      nome,
      senha,
      celular,
      foto,
      endereco
    );

    this.repository.criaAdotante(novoAdotante);
    return res.status(201).json({
      data: { id: novoAdotante.id, nome, celular, endereco },
      mensagem: "Adotante criado com sucesso",
      sucesso: true,
    });
  }

  async listaAdotante(
    req: Request<TipoRequestParamsAdotante, any, TipoRequestBodyAdotante>,
    res: Response<TipoResponseBodyAdotante>
  ) {
    const listaDeAdotantes = await this.repository.listaAdotante();
    const data = listaDeAdotantes.map((adotante) => {
      return {
        id: adotante.id,
        nome: adotante.nome,
        celular: adotante.celular,
        endereco: adotante.endereco || undefined,
      };
    });
    return res.status(200).json({
      data,
      mensagem: "Lista de adotantes",
      sucesso: true,
    });
  }

  async atualizaAdotante(
    req: Request<TipoRequestParamsAdotante, any, TipoRequestBodyAdotante>,
    res: Response<TipoResponseBodyAdotante>
  ) {
    const { id } = req.params;
    const { nome, senha, celular, foto, endereco } = <AdotanteEntity>req.body;

    let Adotante = new AdotanteEntity(nome, senha, celular, foto, endereco);

    const { success, message } = await this.repository.atualizaAdotante(
      Number(id),
      Adotante
    );

    res.status(200).json({ sucesso: success, mensagem: message });
  }

  async deletaAdotante(
    req: Request<TipoRequestParamsAdotante, any, TipoRequestBodyAdotante>,
    res: Response<TipoResponseBodyAdotante>
  ) {
    const { id } = req.params;

    const { success, message } = await this.repository.deletaAdotante(
      Number(id)
    );

    res.status(200).json({ sucesso: success, mensagem: message });
  }

  async atualizaEnderecoAdotante(
    req: Request<TipoRequestParamsAdotante, any, EnderecoEntity>,
    res: Response<TipoResponseBodyAdotante>
  ) {
    const id = Number(req.params.id);

    const { success, message } = await this.repository.atualizaEnderecoAdotante(
      id,
      req.body
    );

    if (!success) {
      res
        .status(404)
        .json({ mensagem: message, error: message, sucesso: false });
    }
    res.status(200).json({ mensagem: message, error: message, sucesso: true });
  }
}
