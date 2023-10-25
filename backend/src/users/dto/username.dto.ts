import { IsString , Length } from "class-validator";

export class UsernameDto {
    @IsString()
    @Length(3, 20)
    username: string;
}