import { Request, Response } from "express";

let listaDePets = [];

export default class PetController {
  criaPet(req: Request, res: Response) {
    const novoPet = req.body;
    listaDePets.push(novoPet);
    return res.status(201).json(novoPet);
  }
}
