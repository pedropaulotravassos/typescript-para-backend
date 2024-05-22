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
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const AdotanteToUpDate = await this.repository.findOne({ where: { id } });
      if (!AdotanteToUpDate) {
        return { success: false, message: "Adotante não encontrado" };
      }

      Object.assign(AdotanteToUpDate, newAdotanteData);
      this.repository.save(AdotanteToUpDate);
      return { success: true, message: "Adotante atualizado" };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Ocorreu um erro ao tentar atualizar o adotante.",
      };
    }
  }

  async deletaAdotante(
    id: number
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const AdotanteToUpDate = await this.repository.findOne({ where: { id } });
      if (!AdotanteToUpDate) {
        return { success: false, message: "Adotante não encontrado" };
      }
      this.repository.delete(id);
      return { success: true, message: "Adotante removido" };
    } catch (error) {
      return {
        success: false,
        message: "Ocorreu um erro ao tentar excluir o adotante.",
      };
    }
  }
}
