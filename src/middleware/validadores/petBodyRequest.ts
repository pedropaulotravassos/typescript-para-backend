import { NextFunction, Request, Response } from "express";
import { TipoRequestBodyPet } from "../../tipos/TiposPet";
import * as yup from "yup";
import { pt } from "yup-locale-pt";
import EnumEspecie from "../../enum/EnumEspecie";
import EnumPorte from "../../enum/EnumPorte";

yup.setLocale(pt);

const petBodyValidator: yup.ObjectSchema<Omit<TipoRequestBodyPet, "adotante">> =
  yup.object({
    nome: yup.string().defined().required(),
    especie: yup
      .string()
      .oneOf(Object.values(EnumEspecie))
      .defined()
      .required(),
    porte: yup.string().oneOf(Object.values(EnumPorte)).defined(),
    dataDeNascimento: yup.date().defined().required(),
    adotado: yup.boolean().defined().required(),
  });
const middleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await petBodyValidator.validate(req.body, {
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
      mensagem: "Erro na criação de Pet ",
    });
  }

  return next();
};
const middlewareValidadorBodyRequestPet = middleware;
export default middlewareValidadorBodyRequestPet;
