import { saveNamaOrangRepo } from "./repo";
import { Request, Response } from "express";
import { validation } from "../../utils/validate/classValidator";
import { tbOrangeRequest, typeTbOrang } from "./model";
import { APIResponse } from "../../utils/structure/response/response";
import { getListNamaOrangService, saveNewNamaOrangService } from "./service";

export const getNamaOrang = async (req: Request, res: Response) => {
  const response = new APIResponse(res);
  const request: tbOrangeRequest = req.body;
  const resultGetNamaOrang = await getListNamaOrangService(request);
  if (resultGetNamaOrang.isError)
    return response.databaseError(resultGetNamaOrang.data);

  return response.successGetData(resultGetNamaOrang.data);
};

export const saveNamaOrang = async (req: Request, res: Response) => {
  const response = new APIResponse(res);
  const request = Object.assign(new typeTbOrang(), req.body);
  const { data, isError } = await validation(request);
  console.log(data);

  if (isError) return response.successSaveRequest(data);

  const resultSave = await saveNewNamaOrangService(request);
  if (resultSave.isError) return response.databaseError(resultSave);

  return response.successSaveRequest(resultSave);
};
