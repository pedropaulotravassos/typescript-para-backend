import AdotanteEntity from "../../entities/AdotanteEntity";

export default interface InterfacePetRepository {
  criaAdotante(adotante: AdotanteEntity): void;
  listaAdotante(): Array<AdotanteEntity> | Promise<AdotanteEntity[]>;
  atualizaAdotante(id: number, adotante: AdotanteEntity): void;
  deletaAdotante(id: number, adotante: AdotanteEntity): void;
}
