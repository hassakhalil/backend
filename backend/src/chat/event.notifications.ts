import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class NotificationsService {
    constructor(private eventEmitter: EventEmitter2) {}

    
    sendFriendRequestNotification(userId: number, friendId: number) {
        //debug
        console.log("sendFriendRequestNotification triggered");
        //end debug
        this.eventEmitter.emit('friendRequest', userId, friendId);
    }

    sendGameRequestNotification(userId: number, friendId: number) {
        this.eventEmitter.emit('gameRequest', userId, friendId);
    }

}

