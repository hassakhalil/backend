import { Injectable , HttpException, HttpStatus} from "@nestjs/common";
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
            callbackURL: `http://${process.env.NEST_APP_HOST}/auth/callback`,
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
            const user = {
                intraId: profile.id,
                intraDisplayName: profile.displayName,
                intraPhoto: profile._json.image.link,
            };
            return done(null, user);
          } catch (error) {
            console.log("Error in 42 strategy == ");
            // return done(error, false);
            throw new HttpException('Error in 42 strategy', HttpStatus.BAD_REQUEST);
          }
    }
}