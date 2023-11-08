import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseWsExceptionFilter, WsException } from "@nestjs/websockets";



@Catch()
export class CustomWsExceptionsFilter extends BaseWsExceptionFilter{
    catch(exception: unknown, host: ArgumentsHost) {
        // console.log("-------------inside CustomWsExceptionsFilter--------------------");
        const client = host.switchToWs().getClient();
        // console.log("client = ",client);
        // console.log("exception = ",exception.toString());
        client.emit('error', exception.toString());
    }
}