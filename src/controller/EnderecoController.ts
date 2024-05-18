import { Request, Response } from "express";
import EnderecoEntity from "../entities/EnderecoEntity";
import EnderecoRepository from "../repositories/EnderecoRepository";

export default class EnderecoController {
  constructor(private repository: EnderecoRepository) {}

  criaEndereco(req: Request, res: Response) {
    const { cidade, estado } = <EnderecoEntity>req.body;

    const novoEndereco = new EnderecoEntity(cidade, estado);

    this.repository.criaEndereco(novoEndereco);
    return res.status(201).json(novoEndereco);
  }

  async listaEndereco(req: Request, res: Response) {
    const listaDeEnderecos = await this.repository.listaEndereco();
    return res.status(200).json(listaDeEnderecos);
  }

  async atualizaEndereco(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    const { cidade, estado } = <EnderecoEntity>req.body;

    let Endereco = new EnderecoEntity(cidade, estado);

    const result = await this.repository.atualizaEndereco(id, Endereco);

    res.status(200).json(result);
  }

  async deletaEndereco(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    const result = await this.repository.deletaEndereco(id);

    res.status(200).json(result);
  }
}
