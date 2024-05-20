import fs from "fs";
import { NextFunction, Request, Response } from "express";
import path from "path";
import {
  MySQLErrorCodes,
  MySQLErrorMessages,
} from "../utils/structure/database/errorMessageEnum";

export const logsToFileMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const oldJson = res.json;
  res.json = (body) => {
    res.locals.body = body;
    return oldJson.call(res, body);
  };

  const originalSend = res.send;

  res.send = function (data) {
    let modifiedData;
    try {
      const parsedData = JSON.parse(data);
      let devOnly;

      if (parsedData.type == "databaseError") {
        devOnly = {
          errno: parsedData.error_data.errno,
          sqlState: parsedData.error_data.sqlState,
          sqlMessage: parsedData.error_data.sqlMessage,
          sql: parsedData.error_data.sql,
        };
        delete parsedData.error_data.errno;
        delete parsedData.error_data.sqlState;
        delete parsedData.error_data.sqlMessage;
        delete parsedData.error_data.sql;
        const errorCode = parsedData.error_data.code as MySQLErrorCodes;
        const errorMessage =
          MySQLErrorMessages[errorCode] || "Unknown error occurred";
        parsedData.error_data.message = errorMessage;
      }

      if (process.env.PRODUCTION == "false") {
        parsedData.error_data = { ...parsedData.error_data, devOnly };
      }

      modifiedData = parsedData;
    } catch (err) {
      modifiedData = data;
    }

    return originalSend.call(this, JSON.stringify(modifiedData));
  };

  res.on("finish", () => {
    const logData = {
      timestamp: new Date(),
      method: req.method,
      url: req.originalUrl,
      responseStatus: res.statusCode,
      responseData: res.locals.body, 
    };

    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const mothWithZero = month.toString().padStart(2, "0");
    const day = currentDate.getDate();
    const formattedDate = `${currentDate.getFullYear()}-${mothWithZero}-${day
      .toString()
      .padStart(2, "0")}`;

    let logPathSeparator = "logs/success";
    if (res.statusCode >= 400) {
      logPathSeparator = "logs/errors";
    }

    const logFolderPath = path.join(
      logPathSeparator,
      `${currentDate.getFullYear()}-${mothWithZero}`
    );
    const logFilePath = path.join(logFolderPath, `${formattedDate}.log`);
    fs.mkdirSync(logFolderPath, { recursive: true });
    fs.readFile(logFilePath, "utf8", (err, data) => {
      let logs = [];
      if (!err && data) {
        try {
          logs = JSON.parse(data);
        } catch (parseErr) {
          console.error("Error parsing existing log file:", parseErr);
        }
      }

      logs.push(logData);

      fs.writeFile(logFilePath, JSON.stringify(logs), (writeErr) => {
        if (writeErr) {
          console.error("Error writing to log file:", writeErr);
        }
      });
    });
    // fs.appendFile(logFilePath, JSON.stringify(logData) + ",\n", (err) => {
    //   if (err) {
    //     console.error("Error writing to log file:", err);
    //   }
    // });
  });

  next();
};
