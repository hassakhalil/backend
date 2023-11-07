import { PipeTransform, Injectable, ArgumentMetadata , BadRequestException} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { RoomIdDto } from './users/dto/roomId.dto';

export class RoomIdStringToDtoPipe implements PipeTransform<string, Promise<string>> {
    async transform(value: string, metadata: ArgumentMetadata): Promise<string> {
        const object = plainToClass(RoomIdDto, { roomId: value });
        const error = await validate(object);
        //debug
        // console.log("roomIdStringToDtoPipe: value = ", value);
        //end debug
        if (error.length > 0) {
            throw new BadRequestException('Validation failed: invalid room id');
        }
        return value;
    }

}