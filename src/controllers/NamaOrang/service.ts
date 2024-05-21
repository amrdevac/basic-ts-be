import { knexMysqlErrorType } from "../../config/databaseErrorHandler";
import { typeBasicFuncReturn } from "../../utils/structure/general_type";
import { tbOrangeRequest, typeTbOrang } from "./entity";
import {
  getNamaOrangRepo,
  saveNamaOrangRepo,
  totalNamaOrangRepo,
} from "./repo";

type PromBasicReturn = Promise<typeBasicFuncReturn<knexMysqlErrorType, any>>;

export const getListNamaOrangService = async (
  request: tbOrangeRequest
): PromBasicReturn => {
  const resultGetNamaOrang = await getNamaOrangRepo(request);
  if (resultGetNamaOrang.isError) return resultGetNamaOrang;

  const resultGetTotalOrang = await totalNamaOrangRepo(request);
  if (resultGetTotalOrang.isError) return resultGetTotalOrang;

  return {
    data: {
      records: resultGetNamaOrang.data,
      total: resultGetTotalOrang.data.total,
    },
    isError: false,
  };
};

export const saveNewNamaOrangService = async (
  request: typeTbOrang
): PromBasicReturn => {
  const resultSave = await saveNamaOrangRepo(request);
  if (resultSave.isError) return resultSave;

  return resultSave;
};
