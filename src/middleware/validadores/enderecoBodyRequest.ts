import { NextFunction, Request, Response } from "express";
import EnderecoEntity from "../../entities/EnderecoEntity";
import * as yup from "yup";
import { pt } from "yup-locale-pt";

yup.setLocale(pt);

const esquemaBodyAdotante: yup.ObjectSchema<Omit<EnderecoEntity, "id">> =
  yup.object({
    cidade: yup.string().defined().required(),
    estado: yup.string().defined().required(),
  });

const middleware = async (req: Request, res: Response, next: NextFunction) => {
  let bodyValidated: Omit<EnderecoEntity, "id">;
  try {
    bodyValidated = await esquemaBodyAdotante.validate(req.body, {
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
const middlewareValidadorBodyRequestEndereco = middleware;
export default middlewareValidadorBodyRequestEndereco;
