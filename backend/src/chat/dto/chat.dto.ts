import { IsNotEmpty, IsNumberString, IsString } from "class-validator";


export class ChatDto {
    @IsString()
    @IsNumberString()
    roomId: string;

    @IsString()
    socketId: string;
    
    @IsString()
    @IsNotEmpty()
    message: string;
}