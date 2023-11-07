import { IsStrongPassword, IsString, IsIn, IsOptional, IsNumber , Length} from "class-validator";


export class RoomSettingsDto {
    @IsString()
    @Length(3, 8)
    name: string;

    @IsString()
    @IsIn(['private', 'protected', 'public'])
    type: string;

    @IsString()
    @IsOptional()
    @IsStrongPassword()
    @Length(8, 100)
    password:   string;

    @IsNumber()
    @IsOptional()
    @IsIn([1, 5, 24])
    duration: number;

}