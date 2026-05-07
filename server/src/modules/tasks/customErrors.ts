class ServerError extends Error { }

class ClientError extends Error { }

export class DBError extends ServerError {

    public statusCode: number;
    constructor(message: string, statusCode = 500) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.name = this.constructor.name;
    }
}


export class isValidIdError extends ClientError {
    public statusCode: number;

    constructor(message: string, statusCode = 400) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.name = this.constructor.name;
    }
}

export class isValidTaskFields extends ClientError {
    public statusCode: number;

    constructor(message: string, statusCode = 400) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.name = this.constructor.name;
    }
}


export class isExistTaskError extends ClientError {
    public statusCode: number;

    constructor(message: string, statusCode = 404) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.name = this.constructor.name;
    }
}

