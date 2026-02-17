import { NextFunction, Request, Response } from "express";
import status from "http-status";


export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === 'foodhub') {
        console.log("Error from Global Error Handler", err)
    }

    let statusCode: number = status.INTERNAL_SERVER_ERROR;
    let message: string = 'Internal Server Error'


    res.status(statusCode).json({
        success: false,
        message: message,
        error: err.message
    })

}