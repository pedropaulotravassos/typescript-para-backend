import express from "express";
import PetController from "../controller/PetController";

const router = express.Router();
const petController = new PetController();
router.post("/", (req, res) => {
  petController.criaPet(req, res);
});

export default router;
