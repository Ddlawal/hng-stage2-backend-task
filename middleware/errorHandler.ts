import { NextFunction, Request, Response } from 'express'

export class ErrorHandler extends Error {
    public message: string
    public status: number
    public constructor(message: string, status?: number) {
        super(message)
        this.message = message
        this.status = status ? status : 404
    }
}

export function errorMiddleware(
    error: ErrorHandler,
    req: Request,
    res: Response,
    next: NextFunction,
) {
    if (typeof error.message !== 'string' && process.env.NODE_ENV === 'production') {
        error.message = 'Unable to complete request. Please try again'
    }

    res.send({ error: { message: error.message, status: error.status } })
    next()
}
