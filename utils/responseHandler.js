export class ResponseHandler {
    static success(res, message, data, statusCode = 200) {
        const response = {
            success: true,
            message,
            data,
            timestamp: new Date().toISOString()
        };
        return res.status(statusCode).json(response);
    }
    static error(res, message, error, statusCode = 400) {
        const response = {
            success: false,
            message,
            error,
            timestamp: new Date().toISOString()
        };
        return res.status(statusCode).json(response);
    }
    static notFound(res, resource) {
        return this.error(res, `${resource} não encontrado`, undefined, 404);
    }
    static serverError(res, error) {
        return this.error(res, 'Erro interno do servidor', error, 500);
    }
    static created(res, message, data) {
        return this.success(res, message, data, 201);
    }
}
