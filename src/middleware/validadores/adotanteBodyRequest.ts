import { NextFunction, Request, Response } from "express";
import { TipoRequestBodyAdotante } from "../../tipos/TiposAdotantes";
import * as yup from "yup";
import { pt } from "yup-locale-pt";

yup.setLocale(pt);

const adotanteBodyValidator: yup.ObjectSchema<
  Omit<TipoRequestBodyAdotante, "endereco" | "pets">
> = yup.object({
  nome: yup.string().defined().required(),
  celular: yup
    .string()
    .defined()
    .required()
    .matches(/^(\(?\d{2}\)?)? ?(\d{4,5})-?(\d{4})$/gm, "celular inválido"),
  senha: yup.string().defined().required().min(6).matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm, "senha inválida") ,
  foto: yup.string().optional(),
});
const middleware = async (req: Request, res: Response, next: NextFunction) => {
  let bodyValidated: TipoRequestBodyAdotante;
  try {
    bodyValidated = await adotanteBodyValidator.validate(req.body, {
      abortEarly: false,
    });
  } catch (error) {
    const yupErros = error as yup.ValidationError;

    const validationErros: Record<string, string> = {};

    yupErros.inner.forEach((error) => {
      if (!error.path) return;
      validationErros[error.path] = error.message;
    });

    return res.status(400).json({
      error: validationErros,
      sucesso: false,
      mensagem: "Erro na criação de Adotante ",
    });
  }

  return next();
};
const middlewareValidadorBodyRequestAdotante = middleware;
export default middlewareValidadorBodyRequestAdotante;
