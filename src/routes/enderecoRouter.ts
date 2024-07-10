import express from "express";
import AdotanteController from "../controller/AdotanteController";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { AppDataSource } from "../config/dataSource";
import { verificaIdMiddleware } from "../middleware/verificaId";

const router = express.Router();
const adotanteRepository = new AdotanteRepository(
  AppDataSource.getRepository("AdotanteEntity")
);

const adotanteController = new AdotanteController(adotanteRepository);

router.post("/", (req, res) => adotanteController.criaAdotante(req, res));
router.get("/", (req, res) => adotanteController.listaAdotante(req, res));
router.put("/:id",verificaIdMiddleware, (req, res) => adotanteController.atualizaAdotante(req, res));
router.delete("/:id",verificaIdMiddleware, (req, res) =>
  adotanteController.deletaAdotante(req, res)
);

export default router;
