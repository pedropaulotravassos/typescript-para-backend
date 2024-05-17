import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interfaces/InterfacePetRepository";

export default class PetRepository implements InterfacePetRepository {
  private repository: Repository<PetEntity>;

  constructor(repository: Repository<PetEntity>) {
    this.repository = repository;
  }

  criaPet(pet: PetEntity): void {
    this.repository.save(pet);
  }
  async listaPet(): Promise<PetEntity[]> {
    return await this.repository.find();
  }
  async atualizaPet(
    id: number,
    newPetData: PetEntity
  ): Promise<{ success: boolean; messagem?: string }> {
    const petToUpDate = await this.repository.findOne({ where: { id } });

    if (!petToUpDate) {
      return { success: false, messagem: "Pet não encontrado" };
    }

    Object.assign(petToUpDate, newPetData);
    this.repository.save(petToUpDate);
    return { success: true, messagem: "Pet atualizado" };
  }
  async deletaPet(
    id: number
  ): Promise<{ success: boolean; messagem?: string }> {
    const petToUpDate = await this.repository.findOne({ where: { id } });
    if (!petToUpDate) {
      return { success: false, messagem: "Pet não encontrado" };
    }
    this.repository.delete(id);
    return { success: true, messagem: "Pet removido" };
  }
}
