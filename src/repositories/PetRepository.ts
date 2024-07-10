import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interfaces/InterfacePetRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnumPorte from "../enum/EnumPorte";
import { NaoEncontrado } from "../utils/ManipulaErros";

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
  ): Promise<{ success: boolean; message: string }> {
    const petToUpDate = await this.petRepository.findOne({ where: { id } });

    if (!petToUpDate) {
      throw new NaoEncontrado("Pet Não encontrado");
    }

    Object.assign(petToUpDate, newPetData);
    this.petRepository.save(petToUpDate);
    return { success: true, message: "Pet atualizado" };
  }
  async deletaPet(id: number): Promise<{ success: boolean; message: string }> {
    const petToUpDate = await this.petRepository.findOne({ where: { id } });
    if (!petToUpDate) {
      throw new NaoEncontrado("Pet Não encontrado");
    }
    this.petRepository.delete(id);
    return { success: true, message: "Pet removido" };
  }

  async adotaPet(
    id_pet: number,
    id_adotante: number
  ): Promise<{ success: boolean; message: string }> {
    console.log({ id_pet, id_adotante });
    const idPet = Number(id_pet);
    const idAdotante = Number(id_adotante);
    console.log({ idPet, id_adotante });
    const pet = await this.petRepository.findOne({ where: { id: idPet } });
    if (!pet) throw new NaoEncontrado("Pet Não encontrado");
    const adotante = await this.adotanteRepository.findOne({
      where: { id: idAdotante },
    });
    if (!adotante) throw new NaoEncontrado("Pet Não encontrado");
    pet.adotante = adotante;
    pet.adotado = true;

    await this.petRepository.save(pet);
    return { success: true, message: "Pet adotado com sucesso" };
  }

  async buscaPetPeloPorte(porte: EnumPorte): Promise<PetEntity[]> {
    console.log(porte);
    return await this.petRepository.find({ where: { porte } });
  }

  async buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(
    campo: Tipo,
    valor: PetEntity[Tipo]
  ): Promise<PetEntity[]> {
    return this.petRepository.find({ where: { [campo]: valor } });
  }
}
