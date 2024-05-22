import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interfaces/InterfacePetRepository";
import AdotanteEntity from "../entities/AdotanteEntity";

export default class PetRepository implements InterfacePetRepository {
  private petRepository: Repository<PetEntity>;
  private adotanteRepository: Repository<AdotanteEntity>;

  constructor(
    petRepository: Repository<PetEntity>,
    adotanteRepository: Repository<AdotanteEntity>
  ) {
    this.petRepository = petRepository;
    this.adotanteRepository = adotanteRepository;
  }

  criaPet(pet: PetEntity): void {
    this.petRepository.save(pet);
  }
  async listaPet(): Promise<PetEntity[]> {
    return await this.petRepository.find();
  }
  async atualizaPet(
    id: number,
    newPetData: PetEntity
  ): Promise<{ success: boolean; message?: string }> {
    const petToUpDate = await this.petRepository.findOne({ where: { id } });

    if (!petToUpDate) {
      return { success: false, message: "Pet não encontrado" };
    }

    Object.assign(petToUpDate, newPetData);
    this.petRepository.save(petToUpDate);
    return { success: true, message: "Pet atualizado" };
  }
  async deletaPet(id: number): Promise<{ success: boolean; message?: string }> {
    const petToUpDate = await this.petRepository.findOne({ where: { id } });
    if (!petToUpDate) {
      return { success: false, message: "Pet não encontrado" };
    }
    this.petRepository.delete(id);
    return { success: true, message: "Pet removido" };
  }

  async adotaPet(
    id_pet: number,
    id_adotante: number
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const idPet = Number(id_pet);
      const idAdotante = Number(id_adotante);
      const pet = await this.petRepository.findOne({ where: { id: idPet } });
      if (!pet) return { success: false, message: "Pet Não localizado" };
      const adotante = await this.adotanteRepository.findOne({
        where: { id: idAdotante },
      });
      if (!adotante) return { success: false, message: "Adotante Não localizado" };

      const {} = await this.petRepository


      return { success: true, message: "Pet adotado com sucesso" };
    } catch (error) {
      return { success: false, message: "Erro ao adotar pet" };
    }
  }
}
