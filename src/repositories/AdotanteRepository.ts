import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";

export default class AdotanteRepository {
  private repository: Repository<AdotanteEntity>;

  constructor(repository: Repository<AdotanteEntity>) {
    this.repository = repository;
  }

  criaAdotante(adotante: AdotanteEntity): void {
    this.repository.save(adotante);
  }

  async listaAdotante(): Promise<AdotanteEntity[]> {
    return await this.repository.find();
  }

  async atualizaAdotante(
    id: number,
    newAdotanteData: AdotanteEntity
  ): Promise<{ success: boolean; messagem?: string }> {
    const AdotanteToUpDate = await this.repository.findOne({ where: { id } });
    if (!AdotanteToUpDate) {
      return { success: false, messagem: "Adotante não encontrado" };
    }

    Object.assign(AdotanteToUpDate, newAdotanteData);
    this.repository.save(AdotanteToUpDate);
    return { success: true, messagem: "Adotante atualizado" };
  }
  
  async deletaAdotante(
    id: number
  ): Promise<{ success: boolean; messagem?: string }> {
    const AdotanteToUpDate = await this.repository.findOne({ where: { id } });
    if (!AdotanteToUpDate) {
      return { success: false, messagem: "Adotante não encontrado" };
    }
    this.repository.delete(id);
    return { success: true, messagem: "Adotante removido" };
  }
}
