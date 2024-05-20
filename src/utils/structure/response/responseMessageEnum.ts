enum basicMessage {
  ERR_VALIDATION = "Error valdiation",
  ERR_SERVICE_THIRD_PARTY = "Error third party service down",
  ERR_AUTHENTICATION = "Error authentication failed",
  ERR_AUTHORIZATION = "Error authorization failed",
  ERR_NOT_FOUND = "Error resource not found",
  ERR_CONFLICT = "Error resource conflict",
  ERR_BAD_REQUEST = "Error bad request",
  ERR_INTERNAL_SERVER = "Error internal server",
  ERR_TIMEOUT = "Error request timeout",
  ERR_DATABASE = "Error database operation failed",
  ERR_UNSUPPORTED_MEDIA_TYPE = "Error unsupported media type",
  ERR_TOO_MANY_REQUESTS = "Error too many requests",
  
  SUCCESS_SAVE = "Success save the request",
  SUCCESS_GET = "Success get data",
  SUCCESS_DELETE = "Success delete data",
  SUCCESS_UPDATE = "Success update data",
}

export default basicMessage;
