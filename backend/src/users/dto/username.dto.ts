import { IsString , Length } from "class-validator";

export class UsernameDto {
    @IsString()
    @Length(3, 8)
    username: string;
}