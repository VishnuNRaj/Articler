import {
    HttpError,
    BadRequestError,
    UnauthorizedError,
    PaymentRequiredError,
    NotFoundError,
    InvalidCredentialsError,
} from '@/interfaces/Error'; 

class ErrorManager {
    static handleError(error: Error) {
        console.error('An error occurred:', error.message);

        if (error instanceof HttpError) {
            return { status: error.statusCode, message: error.message };
        }
        return { status: 500, message: 'Internal Server Error' };
    }
}

export { ErrorManager };
