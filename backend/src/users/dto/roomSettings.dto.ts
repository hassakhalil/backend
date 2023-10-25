import { IsStrongPassword, IsString, IsIn, IsOptional, IsDecimal, IsNumber } from "class-validator";


export class RoomSettingsDto {
    @IsString()
    name: string;

    @IsString()
    @IsIn(['private', 'protected', 'public'])
    type: string;

    @IsString()
    @IsOptional()
    @IsStrongPassword()
    password:   string;

    @IsNumber()
    @IsOptional()
    @IsIn([1, 5, 24])
    duration: number;

}