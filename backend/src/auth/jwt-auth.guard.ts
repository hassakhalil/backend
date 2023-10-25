import { ExecutionContext, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
   // You can add custom logic here
   constructor(@Inject(AuthService) private readonly authService : AuthService){
        super();
   }
   canActivate(context: ExecutionContext) {
    // Add your custom logic or override the canActivate method
    // to extend the behavior of JwtAuthGuard
    const request  = context.switchToHttp().getRequest();
    //extracting the jwt token from the cookie assuming the cookie named 'jwt'
    const token = request.cookies['jwt'];

    if (!token){
        //cookie not found .deny access
        throw new HttpException('Jwt token not found', HttpStatus.UNAUTHORIZED);
    }
    //check if the token is blacklisted
    if (this.authService.isTokenBlacklisted(token))
    {
        throw new HttpException('Jwt token is  blacklisted', HttpStatus.UNAUTHORIZED);
    }
    return super.canActivate(context); // Call the parent canActivate method
  }
}