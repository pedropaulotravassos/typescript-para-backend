import { Repository } from "typeorm";
import EnderecoEntity from "../entities/EnderecoEntity";

export default class EnderecoRepository {
  private repository: Repository<EnderecoEntity>;

  constructor(repository: Repository<EnderecoEntity>) {
    this.repository = repository;
  }

  criaEndereco(endereco: EnderecoEntity): void {
    this.repository.save(endereco);
  }

  async listaEndereco(): Promise<EnderecoEntity[]> {
    return await this.repository.find();
  }

  async atualizaEndereco(
    id: number,
    newEnderecoData: EnderecoEntity
  ): Promise<{ success: boolean; messagem?: string }> {
    const EnderecoToUpDate = await this.repository.findOne({ where: { id } });
    if (!EnderecoToUpDate) {
      return { success: false, messagem: "Endereco não encontrado" };
    }

    Object.assign(EnderecoToUpDate, newEnderecoData);
    this.repository.save(EnderecoToUpDate);
    return { success: true, messagem: "Endereco atualizado" };
  }

  async deletaEndereco(
    id: number
  ): Promise<{ success: boolean; messagem?: string }> {
    const enderecoToUpDate = await this.repository.findOne({ where: { id } });
    if (!enderecoToUpDate) {
      return { success: false, messagem: "Endereco não encontrado" };
    }
    this.repository.delete(id);
    return { success: true, messagem: "Endereco removido" };
  }
}
