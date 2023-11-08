import { IsNotEmpty, IsNumber, IsNumberString, IsString , IsIn} from "class-validator";

export class StateDto {
    @IsString()
    @IsIn(['online', 'offline', 'ingame'])
    state: string;
}