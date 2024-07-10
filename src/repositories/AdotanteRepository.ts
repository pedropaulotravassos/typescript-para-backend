import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import { NaoEncontrado } from "../utils/ManipulaErros";

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
  ): Promise<{ success: boolean; message: string }> {
    const AdotanteToUpDate = await this.repository.findOne({ where: { id } });
    if (!AdotanteToUpDate) {
      throw new NaoEncontrado("Adotante Não encontrado");
    }

    Object.assign(AdotanteToUpDate, newAdotanteData);
    this.repository.save(AdotanteToUpDate);
    return { success: true, message: "Adotante atualizado" };
  }

  async deletaAdotante(
    id: number
  ): Promise<{ success: boolean; message: string }> {
    const AdotanteToUpDate = await this.repository.findOne({ where: { id } });
    if (!AdotanteToUpDate) {
      throw new NaoEncontrado("Adotante Não encontrado");
    }
    this.repository.delete(id);
    return { success: true, message: "Adotante removido" };
  }

  async atualizaEnderecoAdotante(
    id_adotante: number,
    endereco: EnderecoEntity
  ): Promise<{ success: boolean; message: string }> {
    const adotante = await this.repository.findOne({
      where: { id: id_adotante },
    });
    if (!adotante) throw new NaoEncontrado("Adotante Não encontrado");

    const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
    adotante.endereco = novoEndereco;

    await this.repository.save(adotante);
    return { success: true, message: "Atualizado o endereco" };
  }
}
