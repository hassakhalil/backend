import { UseFilters, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
    ConnectedSocket,
    BaseWsExceptionFilter,
    WsResponse,
} from "@nestjs/websockets";
import { UsersService } from "src/users/users.service";
import { Server, Socket }  from 'socket.io';
import { JwtService } from "@nestjs/jwt";
import { WsException } from "@nestjs/websockets";
import { joinRoomDto } from "./dto/joinRoom.dto";
import { ChatDto } from "./dto/chat.dto";
import { StateDto } from "./dto/state.dto";

import { OnEvent } from "@nestjs/event-emitter";
import { NotificationsService } from "./event.notifications";
import { CustomWsExceptionsFilter } from "./custom-ws-exception.filter";

@WebSocketGateway(
    {
        path: '/chat',
        cors: {
            origin: [`http://${process.env.REACT_APP_HOST}`],
        },
    }
    )
@UsePipes(ValidationPipe)
@UseFilters(CustomWsExceptionsFilter)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private usersService: UsersService, private jwtService: JwtService, private notifications: NotificationsService) {}

    @WebSocketServer() server: Server = new Server();
    private clients: Map<string, number> = new Map();

    @SubscribeMessage('chat')
    async handleChatEvent(@MessageBody() payload: ChatDto, @ConnectedSocket() client: Socket){
        //debug
        // console.log("payload in chat = ",payload);
        //end debug
        let hasAccess = false;
        if (this.clients.has(client.id)){
            hasAccess = await this.usersService.hasAccessToRoom(this.clients.get(client.id), +payload.roomId);
            if (hasAccess){
                //debug
                // console.log("client has access to the room")
                //end debug
                //if the user is muted check if the mute is over ---- if the mute is over ----->update the mute state the user can send messages again 
                const isMuted = await this.usersService.isMuted(this.clients.get(client.id), +payload.roomId);
                
                if (!isMuted){
                    // console.log("client is not muted")
                    // console.log("this.client[sokcetId] = ",this.clients.get(client.id));
                    //save the message to the database
                    const isSaved = await this.usersService.saveMessage(this.clients.get(client.id), +payload.roomId, payload.message);
                    // console.log("isSaved = ",isSaved);
                    //send the message to the room
                    if (isSaved){
                        this.server.to(payload.roomId).emit('chat', payload); //broadcast messages
                    }
                }
                // else{
                //     console.log("client is muted");
                // }
            }
        }
        // return  payload;  
    }

    @SubscribeMessage('join-room')
    // @UsePipes(CustomValidationPipe)
    async handleJoinRoomEvent(@MessageBody() payload: joinRoomDto, @ConnectedSocket() client: Socket) {
        // console.log("payload in join room = ",payload);
        let hasAccess = false;
        if (this.clients.has(client.id)){
            hasAccess = await this.usersService.hasAccessToRoom(this.clients.get(client.id), +payload.roomId);
        }
        if (hasAccess){
            //let the client join the room to recieve reel time updates
            console.log("joined room");
            // await this.server.in(payload.socketId).socketsJoin(payload.roomId);
            await client.join(payload.roomId);
        }
        else{
            console.log("not joined room client does not have access to the room");
        }
    }

    @SubscribeMessage('leave-room')
    async handleLeaveRoomEvent(@MessageBody() payload: joinRoomDto, @ConnectedSocket() client: Socket) {
        try{
            await client.leave(payload.roomId);
        }
        catch(error){
            console.log(error);
            throw new WsException('Error occured while leaving the room');
        }
    }

    @SubscribeMessage('State')
    async handleStateEvent(@MessageBody() payload: StateDto, @ConnectedSocket() client: Socket) {
            //save the state to the database
            try{
                const userId = this.clients.get(client.id);
                const user = await this.usersService.findById(userId);
                const isSaved = await this.notifications.saveUserState(userId, payload.state);
                if (isSaved)
                    this.server.emit('State', {id: userId, username: user.username, avatar: user.avatar, state: payload.state});
        }
        catch(error){
            // console.log(error);
            throw new WsException('Error occured while saving the state');
        }
    }

    async handleConnection(@ConnectedSocket() client: Socket): Promise<void> {
        try {
            const Cookie = client.handshake.headers.cookie.split("=")[1];
            // console.log("Cookie = ",Cookie);
            const payload = await this.jwtService.verifyAsync(Cookie, { secret: process.env.JWT_CONST });
            // console.log("Payload = ",Payload);
            //add the client to the map
            // console.log('payload = ',payload)
            const user = await this.usersService.findOne(payload.sub);
            if (user){
                // console.log("user = ",user);
                this.clients.set(client.id, user.id);
                // console.log("clients after connect = ",this.clients);  
                //save the user state in the database
                const isSaved = await this.notifications.saveUserState(user.id, "online");
                //broadcast the user state change to all connected the users
                this.server.emit('State', {id: user.id, username: user.username, avatar: user.avatar, state: "online"});
            }
        }catch(error){
            // console.log(error);
            // throw new WsException('unauthorized');
            client.disconnect();
            // throw new Error('unauthorized');
            //throw error
        }
           
    }

    async handleDisconnect(@ConnectedSocket() client: Socket) {
        // triger the user state change to non active
        //remove the client form the map
        // console.log("clients after disconnect = ",this.clients);
        // this.logger.log(`Socket disconnected ${socket}`);
        try{
            const userId = this.clients.get(client.id);
            const user = await this.usersService.findById(userId);
            //save the user state in the database
            if (user){
                const isSaved = await this.notifications.saveUserState(userId, "offline");
                //broadcast the user state change to all connected the users
                this.server.emit('State', {id: userId, username: user.username, avatar: user.avatar, state: "offline"});
                //remove client from map
                this.clients.delete(client.id);
            }
        }
        catch(error){
            // console.log(error);
            return ;
        }
    }

    @OnEvent('friendRequest')
    async handleFriendRequestEvent(userId: number, friendId: number) {
        //get friend socket 
        let friendSocketId = null;
        for (let [key, value] of this.clients.entries()) {
            if (value === friendId)
              friendSocketId =  key;
        }
        const senderObject = await this.usersService.findById(userId);
        console.log("senderObject = ",senderObject);
        const sender = {id: userId, username: senderObject.username, avatar: senderObject.avatar};
        if (friendSocketId){
            this.server.to(friendSocketId).emit('friendRequest', sender); //broadcast messages
        }
    }

    @OnEvent('gameRequest')
    async handleGameRequestEvent(userId: number, friendId: number) {
        //get friend socket
        let friendSocketId = null;
        for (let [key, value] of this.clients.entries()) {
            if (value === friendId)
              friendSocketId =  key;
        }
        const senderObject = await this.usersService.findById(userId);
        console.log("senderObject = ",senderObject);
        const sender = {id: userId, username: senderObject.username, avatar: senderObject.avatar};
        if (friendSocketId){
            this.server.to(friendSocketId).emit('gameRequest', sender); //broadcast messages
        }

    }

}

