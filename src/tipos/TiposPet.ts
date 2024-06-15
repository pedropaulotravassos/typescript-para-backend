import PetEntity from "../entities/PetEntity";
import EnumPorte from "../enum/EnumPorte";

type TipoRequestBodyPet = Omit<PetEntity, "id">;
type TipoRequestParamsPet = {
  id?: string;
  id_pet?: string;
  id_adotante?: string;
};
type TipoRequestQueryPet = {
  porte?: EnumPorte;
  campo?: keyof PetEntity;
  valor?: string;
};
type TipoResponseBodyPet = {
  data?:
    | Pick<PetEntity, "id" | "nome" | "especie" | "porte">
    | Pick<PetEntity, "id" | "nome" | "especie" | "porte">[];
  error?: unknown;
  sucesso: boolean;
  mensagem: string;
};

export {
  TipoRequestBodyPet,
  TipoRequestQueryPet,
  TipoRequestParamsPet,
  TipoResponseBodyPet,
};
