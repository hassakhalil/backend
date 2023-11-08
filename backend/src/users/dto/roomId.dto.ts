import {IsNumberString} from "class-validator";


export class RoomIdDto {
    @IsNumberString()
    roomId: string;
}