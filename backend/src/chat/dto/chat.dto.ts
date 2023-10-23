import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";


export class ChatDto {
    @IsNumber()
    userId: number;

    @IsString()
    @IsNumberString()
    roomId: string;
    
    @IsString()
    @IsNotEmpty()
    message: string;

}