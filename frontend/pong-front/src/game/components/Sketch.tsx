import { useContext, useEffect } from "react";
import Paddles from "./SketchClasses/Paddle"
import { SocketContext, SocketProvider } from "../contexts/SocketContext";
import { coordonation } from "./SketchInterfaces/coordonation";
import { P5CanvasInstance, ReactP5Wrapper} from "react-p5-wrapper";
import { createContext } from "react";
import { ChatSocketContext, ChatsocketProvider } from "../../components/Chat/contexts/chatContext";
import { useDataContext } from "../../components/Profile/States/stateContext";

// import { Result } from "postcss";


// interface Props {
//   parentCallback: (Score_holder: number[]) => void;
// } 
interface friendsList{
	id:  '',
	username: '',
	avatar:    '',
	state:    '',
  }
  interface DataContextProps {
	  data: friendsList[];
	  setData: React.Dispatch<React.SetStateAction<any>>;
	}

const GameCanvas = ( ) => {
  const socket = useContext(SocketContext);
  
  const Score : number[] = [];
  let div : any;
  let canvasTime : string[] = [];
  canvasTime[0] = 'false';
  canvasTime[1] = 'waiting'
  let time : number[] = [];
  let leaveGame = 'online';
  // let backgroundImage : Image;
  // let gamestate;
  console.log("GameCanvas");
  useEffect(() =>
  {
    socket.on('delay',(state : string[])=>
    {
      canvasTime[0] = state[0];
      canvasTime[1] = state[1];
        // chatSocket?.emit('join-room'{roomId});
      console.log(canvasTime);
    })

    socket.on('gameTimer', (currentTime : number[])=>
    {
      time[0] = currentTime[0];
      time[1] = currentTime[1];
    })
    
    return() =>
    {
      socket.off('delay');
      socket.off('gameTimer');
    }

  })
  const sketch = (p5 : P5CanvasInstance) => {
    let ball_coordonation: number[] = [];
    let paddles: Paddles;
    // let Score : number[] = [];
    
    let  client_id = socket.id;
    p5.setup = () => { 
      const canvas = p5.createCanvas(p5.windowWidth / 2, p5.windowHeight / 2);
      paddles = new Paddles(p5);
      // chatSocket.emit('State', 'inGame');
      // console.log('in game data li jat', state?.data);
      // chatSocket.emit('state');
    };
    
    p5.draw = () => {
      // chatSocket.emit()
      p5.resizeCanvas(p5.windowWidth / 2, p5.windowHeight / 2);
      if  (canvasTime[0] === 'true')
      {
        socket.emit('getballposition', (coordonation: number[])=>
        {
          ball_coordonation[0] = p5.map(coordonation[0], 0, 683, 0, p5.windowWidth / 2);
          ball_coordonation[1] = p5.map(coordonation[1], 0, 331, 0, p5.windowHeight / 2);
          ball_coordonation[2] = p5.map(24, 0, 683, 0, p5.windowWidth /2);
        });
        p5.stroke("#6C5DD3");
        p5.fill("#6C5DD3");
        p5.ellipse(ball_coordonation[0], ball_coordonation[1], ball_coordonation[2], ball_coordonation[2]);
        socket.emit("updatePaddlePosition");
        socket.emit("getScore", (score : number[])=>
        {
          Score[0] = score[0];
          Score[1] = score[1];
        })
        socket.emit("drawPaddles", (coordonation: coordonation)=>
        {
          paddles.x = p5.map(coordonation.x, 0, 683, 0, (p5.windowWidth / 2))
          paddles.y = p5.map(coordonation.y, 0, 331, 0, p5.windowHeight / 2);
          paddles.w = p5.map(coordonation.w, 0, 683, 0, p5.windowWidth / 2);
          paddles.h = p5.map(coordonation.h, 0, 331, 0, p5.windowHeight / 2);
          paddles.x_1 = p5.map(coordonation.x_1, 0, 683, 0, p5.windowWidth / 2);
          paddles.y_1 = p5.map(coordonation.y_1, 0, 331, 0, p5.windowHeight / 2);
          paddles.w_1 = p5.map(coordonation.w_1, 0, 683, 0, p5.windowWidth / 2);
          paddles.h_1 = p5.map(coordonation.h_1, 0, 331, 0, p5.windowHeight / 2);
          // console.log(paddles.x);
        })
        paddles.show(paddles.x, paddles.y, paddles.w, paddles.h);
        paddles.show(paddles.x_1, paddles.y_1, paddles.w_1, paddles.h_1);
        
        p5.textSize(70); // Set text size
        p5.text(Score[0] + " : " + Score[1], p5.windowWidth / 4 , (p5.windowHeight / 4) * 0.2);
        p5.fill(255);
        p5.textSize(70);
        p5.textAlign(p5.CENTER, p5.CENTER);
        if (time[1] !== undefined)
        p5.text(time[0] + "  :  " + time[1], p5.map(683 / 2, 0, 683, 0, (p5.windowWidth / 2)) ,
        p5.map(331 / 2, 0, 331, 0, (p5.windowHeight / 2)));
        // console.log("working");
      }
      else
      {
        // if (leaveGame === 'ingame')
        //   {
        //     let state = 'online';
        //     if (chatSocket?.connected)
        //       chatSocket?.emit('State', {state});
        //     leaveGame = 'online';
        //   }
        // console.log("text");
        p5.fill('#6C5DD3');
        p5.textSize(32);
        p5.textAlign(p5.CENTER, p5.CENTER);
        // console.log(canvasTime[1] + " && " + client_id);
        if (canvasTime[1] === client_id || canvasTime[1] === 'You Won')
        {
          p5.text('You won', p5.map(683 / 2, 0, 683, 0, (p5.windowWidth / 2)) ,
          p5.map(331 / 2, 0, 331, 0, (p5.windowHeight / 2)));
        }
        else if (canvasTime[1] === 'waiting' || canvasTime[1] === 'Your Already In Game' || canvasTime[1] === 'Draw')
        {
          p5.text(canvasTime[1], p5.map(683 / 2, 0, 683, 0, (p5.windowWidth / 2)) ,
          p5.map(331 / 2, 0, 331, 0, (p5.windowHeight / 2)));
        }
        else
        {
          console.log(canvasTime[1]);
          // console.log(canvasTime[1] + " && " + client_id);
          p5.text('Game Over', p5.map(683 / 2, 0, 683, 0, (p5.windowWidth / 2)) ,
          p5.map(331 / 2, 0, 331, 0, (p5.windowHeight / 2)));

        }
      }
    p5.fill(255);
    p5.textSize(32);
    };


    p5.keyReleased = () => {
      socket.emit('stopPaddleMove')
    }

    p5.keyPressed = () => {
      console.log('key_pressed');
      if (p5.keyCode == p5.UP_ARROW)
        socket.emit('playerMovePaddle', -15);
      else if (p5.keyCode == p5.DOWN_ARROW)
        socket.emit('playerMovePaddle', 15);
    }
  }
  return (
        // <Scorecontext.Provider value={Score}>
  <div className="GameCanvas">
    <ReactP5Wrapper sketch={sketch}/>
    </div>
        // </Scorecontext.Provider>
  );
  }

export default GameCanvas;
