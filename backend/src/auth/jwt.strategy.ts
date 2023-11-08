import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException} from "@nestjs/common";
import { jwtConstants } from "./constants";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
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
        return payload;
    }
}