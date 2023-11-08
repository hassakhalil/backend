import { IsNumberString, IsString } from "class-validator";


export class joinRoomDto {
    @IsString()
    @IsNumberString()
    roomId: string;
}