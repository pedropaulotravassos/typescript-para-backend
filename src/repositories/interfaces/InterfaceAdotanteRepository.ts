import AdotanteEntity from "../../entities/AdotanteEntity";
import EnderecoEntity from "../../entities/EnderecoEntity";

export default interface InterfacePetRepository {
  criaAdotante(adotante: AdotanteEntity): void;
  listaAdotante(): Array<AdotanteEntity> | Promise<AdotanteEntity[]>;
  atualizaAdotante(id: number, adotante: AdotanteEntity): Promise<{ success: boolean; message?: string }> | void;
  deletaAdotante(id: number, adotante: AdotanteEntity): Promise<{ success: boolean; message?: string }> | void;
}