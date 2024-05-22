import { Request, Response } from "express";
import AdotanteRepository from "../repositories/AdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";

export default class AdotanteController {
  constructor(private repository: AdotanteRepository) {}

  criaAdotante(req: Request, res: Response) {
    const { nome, senha, celular, foto, endereco } = <AdotanteEntity>req.body;

    const novoAdotante = new AdotanteEntity(
      nome,
      senha,
      celular,
      foto,
      endereco
    );

    this.repository.criaAdotante(novoAdotante);
    return res.status(201).json(novoAdotante);
  }

  async listaAdotante(req: Request, res: Response) {
    const listaDeAdotantes = await this.repository.listaAdotante();
    return res.status(200).json(listaDeAdotantes);
  }

  async atualizaAdotante(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    const { nome, senha, celular, foto, endereco } = <AdotanteEntity>req.body;

    let Adotante = new AdotanteEntity(nome, senha, celular, foto, endereco);

    const result = await this.repository.atualizaAdotante(id, Adotante);

    res.status(200).json(result);
  }

  async deletaAdotante(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    const result = await this.repository.deletaAdotante(id);

    res.status(200).json(result);
  }

  async atualizaEnderecoAdotante(req: Request, res: Response) {
    const id = Number(req.params.id);

    const { success, message } = await this.repository.atualizaEnderecoAdotante(
      id,
      req.body as EnderecoEntity
    );

    if (!success) {
      res.status(404).json({ message });
    }
    res.status(200).json({ message });
  }
}
