import { NextFunction, Request, Response } from "express";
import { ManipulaErros } from "../utils/ManipulaErros";
import { EnumHttpStatusCode } from "../enum/EnumHttpStatusCode";

export const erroMiddleware = (
  erro: ManipulaErros,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode =
    erro.statusCode ?? EnumHttpStatusCode.INTERNAL_SERVER_ERROR;
  const mensagem = erro.statusCode ? erro.message : "Erro interno no servidor";

  res.status(statusCode).json({ mensagem });
  return next();
};
