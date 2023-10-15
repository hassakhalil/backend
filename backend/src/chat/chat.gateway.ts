import { UseGuards } from "@nestjs/common";
import { WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect
} from "@nestjs/websockets";
import { Jwt2faAuthGuard } from "src/auth/jwt-2fa-auth.guard";


@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server;
    users: number  = 0;

    async handleConnection() {
        // A client has connected
        this.users++;

        //Notify connected clients of current users
        this.server.emit('users', this.users);
    }

    async handleDisconnect() {
        // A client has disconnected
        this.users--;

        //Notify connected clients of current users
        this.server.emit('users', this.users);
    }

    @UseGuards(Jwt2faAuthGuard)
    @SubscribeMessage('chat')
    async onChat(client, message) {
        client.broadcast.emit('chat', message)
    }
}

