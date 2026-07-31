class CustomError extends Error {
  public statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

class ServerError extends CustomError {}

class ClientError extends CustomError {}

export class DBError extends ServerError {}

export class isValidIdError extends ClientError {}

export class isValidTaskFields extends ClientError {}

export class TaskNotFoundError extends ClientError {}

export class AccessDeniedError extends ClientError {}
