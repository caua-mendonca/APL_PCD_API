import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp: string;
}

export class ResponseHandler {
  static success<T>(res: Response, message: string, data?: T, statusCode: number = 200): Response {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    };
    return res.status(statusCode).json(response);
  }

  static error(res: Response, message: string, error?: string, statusCode: number = 400): Response {
    const response: ApiResponse = {
      success: false,
      message,
      error,
      timestamp: new Date().toISOString()
    };
    return res.status(statusCode).json(response);
  }

  static notFound(res: Response, resource: string): Response {
    return this.error(res, `${resource} não encontrado`, undefined, 404);
  }

  static serverError(res: Response, error?: string): Response {
    return this.error(res, 'Erro interno do servidor', error, 500);
  }

  static created<T>(res: Response, message: string, data?: T): Response {
    return this.success(res, message, data, 201);
  }
}