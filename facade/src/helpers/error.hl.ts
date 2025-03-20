import jwt from 'jsonwebtoken';
import { Response } from 'express';
import axios from 'axios';
import { HTTP_ERRORS } from '../consts/status.const';

class CustomError extends Error {
    status: number;

    constructor({ message, status }: { message: string, status: number }) {
        super(message);
        this.message = message;
        this.status = status;
    }
}

const errorHandler = (e: any, statusCode?: number) => {
    const errorMessage = e?.response?.data?.message || e?.message || e;;
    const errorStatus = e?.response?.status;
    if(e instanceof jwt.JsonWebTokenError) {
        throw new Error(JSON.stringify({ message: 'Access deny! Reason code 1000 - Token Error', status: HTTP_ERRORS.UNAUTHORIZED.status }));
    } else if (axios.isAxiosError(e)) {
        throw new Error(JSON.stringify({ message: errorMessage, status: errorStatus || e?.status || HTTP_ERRORS.FORBIDDEN.status }));
    } else if(e instanceof Error && statusCode === HTTP_ERRORS.UNAUTHORIZED.status) {
        throw new Error(JSON.stringify({ message: 'Access deny! Reason code 1001 - Unexpected Server Error', status: HTTP_ERRORS.UNAUTHORIZED.status }));
    } else if(e instanceof Error) {
        throw new Error(JSON.stringify({ message: e?.message || e, status: statusCode || HTTP_ERRORS.BAD_REQUEST.status }));
    } else {
        throw new Error(JSON.stringify({ message: e?.message || e, status: statusCode || HTTP_ERRORS.BAD_REQUEST.status}));
    }
}

const serverErrorHandler = (res: Response | any, e: any) => {
    if(e instanceof Object && e?.status === HTTP_ERRORS.UNAUTHORIZED.status) {
        res.clearCookie('application_token', { path: '/', httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production' });
    }
}

const errorParser = (description: string, errors: any) => {
    let str = "";
    if(errors && Object.keys(errors).length) {
        for (const key in errors) {
            if(Array.isArray(errors[key]) && errors[key].length) {
                str += errors[key].length > 0 ? errors[key].join(';') : `${errors[key]}.`;
            } else if(errors[key] instanceof Object && Object.keys(errors[key]).length) {
                const { length, required, type } = errors[key];
                str += (required || length || type) + ";";
            } else if(typeof errors[key] === 'string') {
                str += (`${key} - ${errors[key]}`) + ";";
            }
        }
        return `${description}. ${str}.`;
    } else {
        return description;
    }
}


export {
    errorHandler,
    errorParser,
    serverErrorHandler,
    CustomError
}
