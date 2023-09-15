import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Token } from './token.decorator';
@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async generateJwt(user: any) {
        const payload = { username: user.displayName, sub: user.id };
        return this.jwtService.sign(payload);
    }

    //for handling log out
    private readonly blacklist = new Set<string>(); 
    //Add a token to blacklist
    addToBlacklist(@Token() token: string) {
        this.blacklist.add(token);
        console.log(this.blacklist);
    }
    //check if a token is blacklisted
    isTokenBlacklisted(@Token() token: string): boolean{
        //debug
        console.log("--------------isTokenBlacklisted----------");
        console.log("arg == ", token);
        console.log("is token exist on the blacklist == ", this.blacklist.has(token));
        //end debug
        console.log(this.blacklist);
        console.log("--------------------------------------------");

        return this.blacklist.has(token);
    }
}
