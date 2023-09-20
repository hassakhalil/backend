import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException} from "@nestjs/common";
import { jwtConstants } from "./constants";
import { AuthService } from "./auth.service";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => {
                    if (req.cookies){
                        return req.cookies.jwt;
                    }
                    return null;
                }]),// jwtFromRequest: 
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any){
        //check if the token is blacklisted
        // if (this.authService.isTokenBlacklisted(token)) {
        //     //debug
            
        //     console.log("from validate function/jwtstrategy [ found a blacklisted token and about throw an exception ]");
        //     //end debug
        //     throw new UnauthorizedException('token has been blacklisted');
        // }
        //your validation logic here, e.g.,getching user from database
        //return the user if the token is valid
        return { userId: payload.sub, username: payload.username};
    }
}