import { GameGateway } from './game.gateway';
import { Module, Provider } from '@nestjs/common';
import { gameService } from './game.service';
@Module(
{
    providers: [GameGateway, gameService],
    
}
)
export class GameModule {

}