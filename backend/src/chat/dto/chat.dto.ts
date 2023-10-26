import { IsNotEmpty, IsNumber, IsNumberString, IsString , Length} from "class-validator";


export class ChatDto {
    @IsNumber()
    userId: number;

    @IsString()
    @IsNumberString()
    roomId: string;
    
    @IsString()
    @IsNotEmpty()
    @Length(1,2000)
    message: string;

}