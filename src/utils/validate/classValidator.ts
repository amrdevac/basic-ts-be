import { validate } from "class-validator";
import { Request } from "express";

interface typeObjBool {
  isError: boolean;
  data: any;
}

class ObjBool implements typeObjBool {
  isError: boolean;
  data: any;

  constructor() {
    this.isError = false;
    this.data = null;
  }
}

export const requestValidation = async (post: any) => {
  let returning = new ObjBool();
  return await validate(post).then((errors) => {
    if (errors.length > 0) {
      let arrayError: any = [];

      errors.map((error) => {
        let dataError = {
          property: error.property,
          message: Object.values(error.constraints ?? ""),
        };
        arrayError.push(dataError);
      });

      returning.isError = true;
      returning.data = arrayError;
      return returning;
    } else {
      returning.isError = false;
      returning.data = []; // Changed from {} to []
      return returning;
    }
  });
};
export const requestBinding = async (
  expressBody: Request,
  classInstance: any
) => {
  return await Object.assign(new classInstance(), expressBody);
};
