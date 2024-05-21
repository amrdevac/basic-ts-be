# What in it ?

## API Response Utility

#### Overview

This utility module provides a standardized way to send API responses in an Express.js application. By using the `APIResponse` class, developers can ensure consistent response structures across various endpoints, improving code readability and maintainability.

#### Features

- **Standardized Responses**: Ensures consistent response format for various scenarios like success, validation errors, authentication errors, etc.
- **Customizable Messages**: Allows setting custom messages for each response type.
- **HTTP Status Codes**: Automatically sets appropriate HTTP status codes for different types of responses.
- **Error Handling**: Provides built-in methods for handling common errors such as validation errors, internal server errors, authentication errors, etc.

#### Getting Started

Include the `APIResponse` class and `BasicMessage` enum in your project.

##### Usage

###### Importing the Module

```typescript
import { Response } from "express";
import { APIResponse } from "./utils/structure/response";
import BasicMessage from "./utils/structure/responseMessageEnum";
```

###### Creating an Instance

Create an instance of `APIResponse` within your Express route handlers:

```typescript
app.get("/example", (req, res) => {
  const apiResponse = new APIResponse(res);
  apiResponse.successGetData({ key: "value" }, "Data retrieved successfully");
});
```

###### Methods

###### `json(responseData: APIResponseType, httpStatus: number = 200)`

Send a custom JSON response with a specified HTTP status code.

###### `badRequestValidation(dataError: any, message: string = BasicMessage.ERR_VALIDATION)`

Send a 400 Bad Request response with validation error details.

###### `successSaveRequest(dataSuccess: any, message: string = BasicMessage.SUCCESS_SAVE)`

Send a response indicating a successful save operation.

###### `successGetData(dataSuccess: any, message: string = BasicMessage.SUCCESS_GET)`

Send a response indicating successful data retrieval.

###### `successDeleteData(data: any, message: string = BasicMessage.SUCCESS_GET)`

Send a response indicating successful data deletion.

###### `notFound(message: string = BasicMessage.ERR_NOT_FOUND)`

Send a 404 Not Found response.

###### `internalServerError(message: string = BasicMessage.ERR_INTERNAL_SERVER)`

Send a 500 Internal Server Error response.

###### `authenticationError(message: string = BasicMessage.ERR_AUTHENTICATION)`

Send a 401 Unauthorized response due to authentication failure.

###### `authorizationError(message: string = BasicMessage.ERR_AUTHORIZATION)`

Send a 403 Forbidden response due to authorization failure.

###### `conflictError(message: string = BasicMessage.ERR_CONFLICT)`

Send a 409 Conflict response.

###### `badRequest(message: string = BasicMessage.ERR_BAD_REQUEST)`

Send a 400 Bad Request response.

###### `serviceUnavailable(message: string = BasicMessage.ERR_SERVICE_THIRD_PARTY)`

Send a 503 Service Unavailable response.

###### `databaseError(dataError: any, message: string = BasicMessage.ERR_DATABASE)`

Send a 500 Internal Server Error response due to a database error.

###### `unsupportedMediaType(message: string = BasicMessage.ERR_UNSUPPORTED_MEDIA_TYPE)`

Send a 415 Unsupported Media Type response.

###### `tooManyRequests(message: string = BasicMessage.ERR_TOO_MANY_REQUESTS)`

Send a 429 Too Many Requests response.

#### Example

Here's an example of how you might use the `APIResponse` class in an Express route:

```typescript
import express from "express";
import { APIResponse } from "./utils/structure/response";
import BasicMessage from "./utils/structure/responseMessageEnum";

const app = express();
const port = 3000;

app.get("/example", (req, res) => {
  const apiResponse = new APIResponse(res);
  apiResponse.successGetData({ key: "value" }, "Data retrieved successfully");
});

app.use((err, req, res, next) => {
  const apiResponse = new APIResponse(res);
  apiResponse.internalServerError("An unexpected error occurred");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

#### Conclusion

The `APIResponse` class simplifies the process of sending structured and consistent responses in an Express.js application. By encapsulating common response patterns, it helps maintain a clean and maintainable codebase.