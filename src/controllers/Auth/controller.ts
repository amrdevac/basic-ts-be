import { Request, Response } from "express";
import { AuthRequest } from "./entity";
import { APIResponse } from "../../utils/structure/response/response";
import {
  requestBinding,
  requestValidation,
} from "../../utils/validate/classValidator";

export const authentication = async (req: Request, res: Response) => {
  const response = new APIResponse(res);
  const request = await requestBinding(req.body, AuthRequest);
  const ressVal = await requestValidation(request);
  if (ressVal.isError) return response.badRequestValidation(ressVal.data);

  return response.successGetData(request);
};


