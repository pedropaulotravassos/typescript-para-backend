import express from "express";
import PetController from "../controller/PetController";

const router = express.Router();

const petController = new PetController();

router.post("/", petController.criaPet);
router.get("/", petController.listaPet);
router.put("/:id", petController.atualizaPet);
router.delete("/:id", petController.deletaPet);

export default router;
