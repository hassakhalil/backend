import { Catch, ArgumentsHost,  HttpStatus, HttpException} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import {Request, Response} from 'express';

@Catch()
export class CustomExceptionsFilter extends BaseExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        // console.log("CustomExceptionsFilter status == ", exception.getStatus());
        // const status = exception.getStatus();
        // console.log("---------------------------------------",exception);

        // throw new HttpException('42 token invalid', HttpStatus.BAD_REQUEST);
        response.status(HttpStatus.BAD_REQUEST).json({ 
            statusCode: HttpStatus.BAD_REQUEST
        });
    }
}
