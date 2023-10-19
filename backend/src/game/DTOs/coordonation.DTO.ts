import { IsNumber } from 'class-validator';

export class coordonationDTO
{
    @IsNumber()
    x: number;
    @IsNumber()
    y: number;
    @IsNumber()
    w: number;
    @IsNumber()
    h: number;
    @IsNumber()
    x_1: number;
    @IsNumber()
    y_1: number;
    @IsNumber()
    w_1: number;
    @IsNumber()
    h_1: number;
}