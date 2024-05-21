import { validate } from "class-validator";

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

export const validation = async (post: any): Promise<typeObjBool> => {
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
