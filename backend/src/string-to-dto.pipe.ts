import { PipeTransform, Injectable, ArgumentMetadata , BadRequestException} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { UsernameDto } from './users/dto/username.dto';

export class ProfileStringToDtoPipe implements PipeTransform<string, Promise<string>> {
    async transform(value: string, metadata: ArgumentMetadata): Promise<string> {
        if (value ==='me')
            return value;
        const object = plainToClass(UsernameDto, { username: value });
        const error = await validate(object);

        if (error.length > 0) {
            throw new BadRequestException('Validation failed: invalid username');
        }
        return value;
    }

}