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

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private usersService: UsersService) {}

    @WebSocketServer() server;

    private logger = new Logger('ChatGateway');

    @UseGuards(Jwt2faAuthGuard)
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
            //if the user is banned from the room dont let him join 
            //let the client join the room to recieve reel time updates
            this.logger.log(`${payload.user.socketId} is joining ${payload.roomId}`);
            this.server.in(payload.user.socketId).socketsJoin(payload.roomId);
        }
    }

    async handleConnection(socket: Socket): Promise<void> {
        // triger the user state change to active ( use event emeter) 
        this.logger.log(`Socket connected ${socket}`);
    }

    async handleDisconnect(socket: any) {
        // triger the user state change to non active
        this.logger.log(`Socket disconnected ${socket}`);
        
    }
}

