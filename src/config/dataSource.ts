import { DataSource } from "typeorm";
import PetEntity from "../entities/PetEntity";
import AdotanteEntity from "../entities/AdotanteEntity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/config/database.sqlite",
  entities: [PetEntity, AdotanteEntity],
  synchronize: true,
});

