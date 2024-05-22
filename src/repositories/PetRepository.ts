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
  ): Promise<{ success: boolean; message?: string }> {
    const petToUpDate = await this.repository.findOne({ where: { id } });

    if (!petToUpDate) {
      return { success: false, message: "Pet não encontrado" };
    }

    Object.assign(petToUpDate, newPetData);
    this.repository.save(petToUpDate);
    return { success: true, message: "Pet atualizado" };
  }
  async deletaPet(
    id: number
  ): Promise<{ success: boolean; message?: string }> {
    const petToUpDate = await this.repository.findOne({ where: { id } });
    if (!petToUpDate) {
      return { success: false, message: "Pet não encontrado" };
    }
    this.repository.delete(id);
    return { success: true, message: "Pet removido" };
  }

  async adotaPet(id_pet: number, id_adotante: number): Promise<{ success: boolean; message?: string }> {
        try {
          
          return { success: true, message: "Pet adotado com sucesso" }
        } catch (error) {
          return {success: false, message: "Erro ao adotar pet"}
          
        }
  }
}
