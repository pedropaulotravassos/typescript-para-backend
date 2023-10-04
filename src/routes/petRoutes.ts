import express from "express";
import PetController from "../controller/PetController";

const router = express.Router();
const petController = new PetController();
router.post("/", (req, res) => {
  petController.criaPet(req, res);
});
router.get("/", (req, res) => {
  petController.listaPets(req, res);
});
router.put("/:id", (req, res) => {
  petController.atualizaPet(req, res);
});
router.delete("/:id", (req, res) => {
  petController.deletaPet(req, res);
});

export default router;
