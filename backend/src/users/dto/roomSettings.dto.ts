import { IsStrongPassword, IsString, IsIn, IsOptional } from "class-validator";


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
}