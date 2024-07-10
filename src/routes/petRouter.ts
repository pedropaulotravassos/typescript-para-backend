import express, { RequestHandler } from "express";
import PetController from "../controller/PetController";
import PetRepository from "../repositories/PetRepository";
import { AppDataSource } from "../config/dataSource";
import middlewareValidadorBodyRequestPet from "../middleware/validadores/petBodyRequest";
import { verificaIdMiddleware } from "../middleware/verificaId";

const router = express.Router();
const petRepository = new PetRepository(
  AppDataSource.getRepository("PetEntity"),
  AppDataSource.getRepository("AdotanteEntity")
);

const petController = new PetController(petRepository);

const validateRequestBody: RequestHandler = (req, res, next) =>
  middlewareValidadorBodyRequestPet(req, res, next);

router.post("/", validateRequestBody, (req, res) =>
  petController.criaPet(req, res)
);
router.get("/", (req, res) => petController.listaPet(req, res));
router.put("/", (req, res) => petController.atualizaPet(req, res));
router.delete("/:id", verificaIdMiddleware, (req, res) =>
  petController.deletaPet(req, res)
);
router.put("/:id_pet/:id_adotante", verificaIdMiddleware, (req, res) =>
  petController.adotaPet(req, res)
);
router.get("/filtroPorte", (req, res) =>
  petController.buscaPetPeloPorte(req, res)
);
router.get("/filtro", (req, res) =>
  petController.buscaPetPorCampoGenerico(req, res)
);

export default router;
