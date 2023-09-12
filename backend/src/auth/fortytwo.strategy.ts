import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy , VerifyCallback} from "passport-42";

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
    constructor() {
        super({
            authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
            tokenURL: 'https://api.intra.42.fr/oauth/token',
            clientID: process.env.FORTYTWO_APP_ID,
            clientSecret: process.env.FORTYTWO_APP_SECRET,
            callbackURL: 'http://localhost:3000/auth/callback',
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
        try {
            // You can use this profile data to create or retrieve a user in your application
            const user = profile;
            return done(null, user);
          } catch (error) {
            return done(error, false);
          }
    }
}