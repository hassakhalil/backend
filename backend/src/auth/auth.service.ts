import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}
    
    async login(user: any, isTwoFactorAuthEbnabled:boolean) {
        const payload = {
            username: user.intraDisplayName,
            sub: user.intraId,
            photo: user.intraPhoto,
            isTwoFactorAuthenticationEbnabled: isTwoFactorAuthEbnabled,
            isTwoFactorAuthentcated: false,
        };
        return this.jwtService.sign(payload);
    }

    async loginWith2fa(user: any, isTwoFactorAuthEbnabled: boolean) {
        const payload = {
            username: user.username,
            sub: user.sub,
            photo: user.intraPhoto,
            isTwoFactorAuthenticationEbnabled: isTwoFactorAuthEbnabled,
            isTwoFactorAuthentcated: true,
        };
        return this.jwtService.sign(payload);
    }
    
    extractId(user: any) {
        return user.intraId;
    }
    extractIdFromPayload(user: any) {
        return user.sub;
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

    //2fa
    async generateTwoFactorAuthSecret(user: any){
        const secret = authenticator.generateSecret();

        const otpauthUrl = authenticator.keyuri(user.username, 'Ft_transcendence', secret);

        return {
            secret,
            otpauthUrl,
        }
    }

    async generateQrCodedataURL(otpAuthUrl: string) {
        return toDataURL(otpAuthUrl);
    }

    isTwoFactorAuthCodeValid(twoFactorAuthCode: string, user:any){
        //
        return authenticator.verify({
            token: twoFactorAuthCode,
            secret: user.two_factor_auth_secret,
        });
    }


}
