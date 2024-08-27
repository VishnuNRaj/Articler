
class HttpError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

class BadRequestError extends HttpError {
    constructor(message = 'Bad Request') {
        super(message, 400);
    }
}

class UnauthorizedError extends HttpError {
    constructor(message = 'Unauthorized') {
        super(message, 401);
    }
}

class PaymentRequiredError extends HttpError {
    constructor(message = 'Payment Required') {
        super(message, 402);
    }
}

class NotFoundError extends HttpError {
    constructor(message = 'Not Found') {
        super(message, 404);
    }
}

class InvalidCredentialsError extends HttpError {
    constructor(message = 'Invalid Credentials') {
        super(message, 401);
    }
}

export {
    HttpError,
    BadRequestError,
    UnauthorizedError,
    PaymentRequiredError,
    NotFoundError,
    InvalidCredentialsError,
};
