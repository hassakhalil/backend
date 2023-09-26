import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async generateJwt(user: any) {
        const payload = { username: user.displayName, sub: user.id };
        return this.jwtService.sign(payload);
    }

    extractId(user: any) {
        return user.id;
    }
    extractIdFromPayload(user: any) {
        return user.userId;
    }

    //for handling log out
    private readonly blacklist = new Set<string>(); 
    //Add a token to blacklist
    addToBlacklist(token: string) {
        this.blacklist.add(token);
    }
    //check if a token is blacklisted
    isTokenBlacklisted(token: string): boolean{
        return this.blacklist.has(token);
    }
}
