import {
  databaseErrorHandler,
  knexMysqlErrorType,
} from "./../../config/databaseErrorHandler";
import { adapKnex } from "../../config/database";
import { typeBasicFuncReturn } from "../../utils/structure/general_type";
import { ConfigFilterTbOrang, tbOrangeRequest, typeTbOrang } from "./entity";
import { v4 } from "uuid";
import repository from "../../utils/basicRepository/defaultRepo";
import { Knex } from "knex";

type PromBasicReturn = Promise<typeBasicFuncReturn<knexMysqlErrorType, any>>;
const filterconfig: ConfigFilterTbOrang = {
  nama: "LIKE",
  id: "=",
  alamat: "LIKE",
  umur: ">",
  pria: "=",
};

export const getNamaOrangRepo = async (
  request: tbOrangeRequest
): PromBasicReturn => {
  try {
    let query: Knex.QueryBuilder = adapKnex("orang").select("*");
    query = query.offset(request.offset ?? 0);
    query = query.limit(request.limit ?? 1);

    query = new repository().filter({
      query: query,
      filter: filterconfig,
      request: request,
    });

    let data = await query;
    return { data: data, isError: false };
  } catch (error) {
    console.log(error);

    return databaseErrorHandler(error as knexMysqlErrorType);
  }
};

export const totalNamaOrangRepo = async (
  request: tbOrangeRequest
): PromBasicReturn => {
  try {
    let query = adapKnex("orang");
    query = new repository().filter({
      query: query,
      filter: filterconfig,
      request: request,
    });

    let data = await query.count({ total: "*" }).first();
    return { isError: false, data: data };
  } catch (error) {
    return databaseErrorHandler(error as knexMysqlErrorType);
  }
};

export const saveNamaOrangRepo = async (
  request: typeTbOrang
): PromBasicReturn => {
  try {
    const insertedData = {
      id: v4(),
      nama: request.nama,
      umur: request.umur,
      pria: request.pria,
      alamat: request.alamat,
    };

    await adapKnex("orang123").insert(insertedData);
    return { data: insertedData, isError: false };
  } catch (error) {
    return databaseErrorHandler(error as knexMysqlErrorType);
  }
};
