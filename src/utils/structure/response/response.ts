// utils/structure/response.ts
import { Response } from "express";
import BasicMessage from "./responseMessageEnum";

interface APIResponseType {
  status: boolean;
  message: string;
  restype: string;
  data?: object;
  data_error?: any;
}

export class APIResponse {
  private res: Response;

  constructor(res: Response) {
    this.res = res;
  }

  json = async (responseData: APIResponseType, httpStatus: number = 200) => {
    return this.res.status(httpStatus).json(responseData);
  };

  badRequestValidation = (
    dataError: any,
    message: string = BasicMessage.ERR_VALIDATION
  ) => {
    this.json(
      {
        status: false,
        restype: "badRequestValidation",
        message: message,
        data: [],
        data_error: dataError,
      },
      400
    );
  };

  successSaveRequest = (
    dataSuccess: any,
    message: string = BasicMessage.SUCCESS_SAVE
  ) => {
    this.json({
      status: true,
      restype: "successSaveRequest",
      message: message,
      data: dataSuccess,
      data_error: [],
    });
  };

  successGetData = (
    dataSuccess: any,
    message: string = BasicMessage.SUCCESS_GET
  ) => {
    this.json({
      status: true,
      restype: "successGetData",
      message: message,
      data: dataSuccess,
      data_error: [],
    });
  };

  successDeleteData = (
    data: any,
    message: string = BasicMessage.SUCCESS_GET
  ) => {
    this.json({
      status: true,
      restype: "successGetData",
      message: message,
      data: data,
      data_error: [],
    });
  };

  notFound = (message: string = BasicMessage.ERR_NOT_FOUND) => {
    this.json(
      {
        status: false,
        restype: "notFound",
        message: message,
        data: {},
      },
      400
    );
  };

  internalServerError = (
    message: string = BasicMessage.ERR_INTERNAL_SERVER
  ) => {
    this.json(
      {
        status: false,
        restype: "internalServerError",
        message: message,
        data: {},
      },
      500
    );
  };

  authenticationError = (message: string = BasicMessage.ERR_AUTHENTICATION) => {
    this.json(
      {
        status: false,
        restype: "authenticationError",
        message: message,
        data: {},
      },
      401
    );
  };

  authorizationError = (message: string = BasicMessage.ERR_AUTHORIZATION) => {
    this.json(
      {
        status: false,
        restype: "authorizationError",
        message: message,
        data: {},
      },
      401
    );
  };

  conflictError = (message: string = BasicMessage.ERR_CONFLICT) => {
    this.json(
      {
        status: false,
        restype: "conflictError",
        message: message,
        data: {},
      },
      400
    );
  };

  badRequest = (message: string = BasicMessage.ERR_BAD_REQUEST) => {
    this.json(
      {
        status: false,
        restype: "badRequest",
        message: message,
        data: {},
      },
      400
    );
  };

  serviceUnavailable = (
    message: string = BasicMessage.ERR_SERVICE_THIRD_PARTY
  ) => {
    this.json(
      {
        status: false,
        restype: "serviceUnavailable",
        message: message,
        data: {},
      },
      400
    );
  };

  databaseError = (
    dataError: any,
    message: string = BasicMessage.ERR_DATABASE
  ) => {
    this.json(
      {
        status: false,
        restype: "databaseError",
        message: message,
        data: {},
        data_error: dataError,
      },
      400
    );
  };

  unsupportedMediaType = (
    message: string = BasicMessage.ERR_UNSUPPORTED_MEDIA_TYPE
  ) => {
    this.json({
      status: false,
      restype: "unsupportedMediaType",
      message: message,
      data: {},
    });
  };

  tooManyRequests = (message: string = BasicMessage.ERR_TOO_MANY_REQUESTS) => {
    this.json(
      {
        status: false,
        restype: "tooManyRequests",
        message: message,
        data: {},
      },
      400
    );
  };
}
