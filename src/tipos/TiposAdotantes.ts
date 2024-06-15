import AdotanteEntity from "../entities/AdotanteEntity";

type TipoRequestBodyAdotante = Omit<AdotanteEntity, "id">;
type TipoRequestParamsAdotante = { id?: string };
type TipoResponseBodyAdotante = {
  data?:
    | Pick<AdotanteEntity, "id" | "nome" | "celular">
    | Pick<AdotanteEntity, "id" | "nome" | "celular">[];
  error?: unknown;
  sucesso: boolean;
  mensagem: string;
};

export {
  TipoRequestBodyAdotante,
  TipoRequestParamsAdotante,
  TipoResponseBodyAdotante,
};
