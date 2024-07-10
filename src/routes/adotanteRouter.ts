import express, { RequestHandler } from "express";
import AdotanteController from "../controller/AdotanteController";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { AppDataSource } from "../config/dataSource";
import middlewareValidadorBodyRequestAdotante from "../middleware/validadores/adotanteBodyRequest";
import middlewareValidadorBodyRequestEndereco from "../middleware/validadores/enderecoBodyRequest";
import { verificaIdMiddleware } from "../middleware/verificaId";

const router = express.Router();
const adotanteRepository = new AdotanteRepository(
  AppDataSource.getRepository("AdotanteEntity")
);

const adotanteController = new AdotanteController(adotanteRepository);

// middlewares
const validateRequestBodyAdotante: RequestHandler = (req, res, next) =>
  middlewareValidadorBodyRequestAdotante(req, res, next);

const validateRequestBodyEndereco: RequestHandler = (req, res, next) =>
  middlewareValidadorBodyRequestEndereco(req, res, next);

router.post("/", validateRequestBodyAdotante, (req, res) =>
  adotanteController.criaAdotante(req, res)
);
router.get("/", (req, res) => adotanteController.listaAdotante(req, res));
router.put("/:id", verificaIdMiddleware, (req, res) =>
  adotanteController.atualizaAdotante(req, res)
);
router.delete("/:id", verificaIdMiddleware, (req, res) =>
  adotanteController.deletaAdotante(req, res)
);
router.patch(
  "/:id",
  verificaIdMiddleware,
  validateRequestBodyEndereco,
  (req, res) => adotanteController.atualizaEnderecoAdotante(req, res)
);

export default router;
