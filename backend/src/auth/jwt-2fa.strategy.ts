import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable} from "@nestjs/common";
import { jwtConstants } from "./constants";
import { Request } from "express";
import { UsersService } from "src/users/users.service";

@Injectable()
export class Jwt2faStrategy extends PassportStrategy(Strategy, 'jwt-2fa') {
    constructor(private readonly usersService: UsersService) {
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
        //your validation logic here, e.g.,getching user from database
        // const user = await this.usersService.findOne(payload.sub);
        // console.log('user from jwt2fastrategy == ', user);
        // if (user && !user.is_two_factor_auth_enabled) {
        //     return user;
        // }
        // if (payload.isTwoFactorAuthentcated) {
        //     return user;
        // }
        return payload;
        //return the user if the token is valid
    }
}