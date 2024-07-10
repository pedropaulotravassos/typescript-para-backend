import AdotanteEntity from "../entities/AdotanteEntity";

type TipoRequestBodyAdotante = Omit<AdotanteEntity, "id" | "pets">;
type TipoRequestParamsAdotante = { id?: string };
type TipoResponseBodyAdotante = {
  data?:
    | Pick<AdotanteEntity, "id" | "nome" | "celular" | "endereco">
    | Pick<AdotanteEntity, "id" | "nome" | "celular" | "endereco">[];
  error?: unknown;
  sucesso: boolean;
  mensagem: string;
};

export {
  TipoRequestBodyAdotante,
  TipoRequestParamsAdotante,
  TipoResponseBodyAdotante,
};
