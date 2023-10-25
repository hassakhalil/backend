import { IsNumberString, IsString, Length } from "class-validator";

export class TfaCodeDto {
    @IsString()
    @Length(6, 6)
    @IsNumberString()
    code: string;
}