import { UseGuards } from "@nestjs/common";
import { WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
} from "@nestjs/websockets";
import { Jwt2faAuthGuard } from "src/auth/jwt-2fa-auth.guard";
import { Logger } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { Server, Socket }  from 'socket.io';
import { JwtService } from "@nestjs/jwt";
import { WsException } from "@nestjs/websockets";

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    @WebSocketServer() server;
    private clients: Map<number, Socket> = new Map();

    private logger = new Logger('ChatGateway');

    @SubscribeMessage('chat')
    async handleChatEvent(@MessageBody() payload: any): Promise<any>{
        this.logger.log(payload);
        // validation check 
        //save the message to the database
        this.server.to(payload.roomId).emit('chat', payload); //broadcast messages 
        return payload;  
    }

    @SubscribeMessage('join-room')
    async handleJoinRoomEvent(@MessageBody() payload: { roomId : string, user: any}) {
        if (payload.user.socketId){
            // validation
            //check if the user has access to the room
            //if the user is banned from the room dont let him join  (or blocked in a direct message)
            //let the client join the room to recieve reel time updates
            this.logger.log(`${payload.user.socketId} is joining ${payload.roomId}`);
            this.server.in(payload.user.socketId).socketsJoin(payload.roomId);
        }
    }

    async handleConnection(socket: Socket): Promise<void> {
        // triger the user state change to active ( use event emeter) 
        //debug
        console.log(socket.handshake.headers.cookie);

        //end debug
        //add auth here
        let Payload = null;
        try {
            const Cookie = socket.handshake.headers.cookie.split("=")[1];
            console.log("Cookie = ",Cookie);
            const payload = await this.jwtService.verifyAsync(Cookie, { secret: process.env.JWT_CONST });
            Payload = payload;
            // console.log("Payload = ",Payload);
        }catch(error){
            console.log(error);
            // throw new WsException('unauthorized');
            socket.disconnect();
            //throw error
        }
        //add the client to the map
        
        // this.logger.log(`Socket connected ${socket}`);
    }

    async handleDisconnect(socket: any) {
        // triger the user state change to non active
        //remove the client form the map
        // this.logger.log(`Socket disconnected ${socket}`);
        
    }
}

