import { UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
    ConnectedSocket,
} from "@nestjs/websockets";
import { UsersService } from "src/users/users.service";
import { Server, Socket }  from 'socket.io';
import { JwtService } from "@nestjs/jwt";
import { WsException } from "@nestjs/websockets";
import { joinRoomDto } from "./dto/joinRoom.dto";
import { ChatDto } from "./dto/chat.dto";

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    @WebSocketServer() server: Server = new Server();
    private clients: Map<string, number> = new Map();


    @SubscribeMessage('chat')
    @UsePipes(new ValidationPipe())
    async handleChatEvent(@MessageBody() payload: ChatDto): Promise<any>{
        //debug
        console.log("payload in chat = ",payload);
        //end debug
        let hasAccess = false;
        if (this.clients.has(payload.socketId)){
            hasAccess = await this.usersService.hasAccessToRoom(this.clients.get(payload.socketId), +payload.roomId);
            if (hasAccess){
                //debug
                console.log("client has access to the room")
                //end debug
                //if the user is muted check if the mute is over ---- if the mute is over ----->update the mute state the user can send messages again 
                const isMuted = await this.usersService.isMuted(this.clients.get(payload.socketId), +payload.roomId);
                
                if (!isMuted){
                    console.log("client is not muted")
                    console.log("this.client[sokcetId] = ",this.clients.get(payload.socketId));
                    //save the message to the database
                    const isSaved = await this.usersService.saveMessage(this.clients.get(payload.socketId), +payload.roomId, payload.message);
                    console.log("isSaved = ",isSaved);
                    //send the message to the room
                    this.server.to(payload.roomId).emit('chat', payload); //broadcast messages
                }
            }

        }
        return payload;  
    }

    @SubscribeMessage('join-room')
    @UsePipes(new ValidationPipe())
    async handleJoinRoomEvent(@ConnectedSocket() client: Socket, @MessageBody() payload: joinRoomDto) {
        console.log("------------------------------------------------")
        // console.log("join room payload = ",payload);
        if (payload.socketId){
            // validation
            //check if the user has access to the room
            //if the user is banned from the room dont let him join  (or blocked in a direct message)
            let hasAccess = false;
            if (this.clients.has(payload.socketId)){
                hasAccess = await this.usersService.hasAccessToRoom(this.clients.get(payload.socketId), +payload.roomId);
            }
            if (hasAccess){
                //let the client join the room to recieve reel time updates
                console.log("joined room");
                // await this.server.in(payload.socketId).socketsJoin(payload.roomId);
                await client.join(payload.roomId);

            }
        }
    }

    async handleConnection(socket: Socket): Promise<void> {
        // triger the user state change to active ( use event emeter) 
        //debug
        console.log(socket.id);

        //end debug
        //add auth here
        let Payload = null;
        try {
            const Cookie = socket.handshake.headers.cookie.split("=")[1];
            // console.log("Cookie = ",Cookie);
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
        const user = await this.usersService.findOne(Payload.sub);

        this.clients.set(socket.id, user.id);
        console.log("clients after connect = ",this.clients);     
        // this.logger.log(`Socket connected ${socket}`);
    }

    async handleDisconnect(socket: any) {
        // triger the user state change to non active
        //remove the client form the map
        this.clients.delete(socket.id);
        // console.log("clients after disconnect = ",this.clients);
        // this.logger.log(`Socket disconnected ${socket}`);
        
    }
}

