import { useContext, useEffect } from "react";
import Paddles from "./SketchClasses/Paddle"
import { SocketContext, SocketProvider } from "../contexts/SocketContext";
import { coordonation } from "./SketchInterfaces/coordonation";
import { P5CanvasInstance, ReactP5Wrapper} from  "@p5-wrapper/react";
import { createContext } from "react";
import { ChatSocketContext, ChatsocketProvider } from "../../components/Chat/contexts/chatContext";
import { useDataContext } from "../../components/Profile/States/stateContext";
import throttle from 'lodash/throttle';
import _ from 'lodash';
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

  interface coordonationDTO
{
    x: number;
    y: number;
    w: number;
    h: number;
    x_1: number;
    y_1: number;
    w_1: number;
    h_1: number;
}
interface SketchData {
    ball : number[]
    Score : number[]
    paddles : coordonationDTO
}
export function customThrottle(callback, delay) {
  let lastCall = 0;

  return function (...args) {
      const now = Date.now();

      if (now - lastCall >= delay) {
          lastCall = now;
          callback(...args);
      }
  };
}
const GameCanvas = ( ) => {
  let client_id : string;
  let color =  sessionStorage.getItem('Color')
  if (color === null)
    color = "#6C5DD3";
  const socket = useContext(SocketContext);
  
  const Score : number[] = [];
  // let div : any;
  let canvasTime : string[] = [];
  canvasTime[0] = 'false';
  canvasTime[1] = 'waiting'
  let time : number[] = [];
  // let leaveGame = 'online';

  useEffect(() =>
  {
    socket.on('connect', ()=>
    {
      client_id = socket.id;
    })
    socket.on('delay',(state : string[])=>
    {
      canvasTime[0] = state[0];
      canvasTime[1] = state[1];
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
    let buffer : any;
    // let sketchData;
    let Score : number[] = []
    p5.setup = () => { 
      // ('socket idd ', socket.id)
      const canvas = p5.createCanvas(p5.windowWidth / 2, p5.windowHeight / 2);
      canvas.id('myCanvas');
      p5.select('#myCanvas').style('border-color', color);
      buffer = p5.createGraphics(p5.width, p5.height);
      p5.frameRate(120); 
      paddles = new Paddles(p5, buffer);
    //   socket.on('SketchData', (sketchData : SketchData) =>
    //   {
    //       ball_coordonation[0] = p5.map(sketchData.ball[0], 0, 683, 0, buffer.windowWidth / 2);
    //       ball_coordonation[1] = p5.map(sketchData.ball[1], 0, 331, 0, buffer.windowHeight / 2);
    //     ball_coordonation[2] = p5.map(24, 0, 683, 0, p5.windowWidth /2);
      
    //     Score[0] =sketchData.Score[0];
    //     Score[1] = sketchData.Score[1];

    //       paddles.x = p5.map(sketchData.paddles.x, 0, 683, 0, (buffer.windowWidth / 2))
    //       paddles.y = p5.map(sketchData.paddles.y, 0, 331, 0, buffer.windowHeight / 2);
    //       // paddles.w = p5.map(sketchData.paddles.w, 0, 683, 0, buffer.windowWidth / 2);
    //       // paddles.h = p5.map(sketchData.paddles.h, 0, 331, 0, buffer.windowHeight / 2);
    //       paddles.x_1 = p5.map(sketchData.paddles.x_1, 0, 683, 0, buffer.windowWidth / 2);
    //       paddles.y_1 = p5.map(sketchData.paddles.y_1, 0, 331, 0, buffer.windowHeight / 2);
    //       // paddles.w_1 = p5.map(sketchData.paddles.w_1, 0, 683, 0, buffer.windowWidth / 2);
    //       // paddles.h_1 = p5.map(sketchData.paddles.h_1, 0, 331, 0, buffer.windowHeight / 2);
    // })
    };
    
    
    // const throttledEmit = customThrottle(() => {
    //   socket.emit('SketchData', (sketchData : SketchData) =>
    //   {
    //       ball_coordonation[0] = p5.map(sketchData.ball[0], 0, 683, 0, buffer.windowWidth / 2);
    //       ball_coordonation[1] = p5.map(sketchData.ball[1], 0, 331, 0, buffer.windowHeight / 2);
    //       ball_coordonation[2] = p5.map(24, 0, 683, 0, p5.windowWidth /2);
      
    //     Score[0] =sketchData.Score[0];
    //     Score[1] = sketchData.Score[1];
    //     paddles.x = p5.map(sketchData.paddles.x, 0, 683, 0, (buffer.windowWidth / 2))
    //       paddles.y = p5.map(sketchData.paddles.y, 0, 331, 0, buffer.windowHeight / 2);
    //       paddles.x_1 = p5.map(sketchData.paddles.x_1, 0, 683, 0, buffer.windowWidth / 2);
    //       paddles.y_1 = p5.map(sketchData.paddles.y_1, 0, 331, 0, buffer.windowHeight / 2);
    // })
    // })

    
    p5.draw = () => {
      p5.clear();
      p5.background(255)
      buffer.resizeCanvas(p5.windowWidth / 2, p5.windowHeight / 2);
      if  (canvasTime[0] === 'true')
      {
        // throttledEmit();
        // console.log(new Date())
        // if (p5.frameCount % 2 === 0)
        // {
          
          socket.emit('SketchData', (sketchData : SketchData) =>
          {
              ball_coordonation[0] = p5.map(sketchData.ball[0], 0, 683, 0, buffer.windowWidth / 2);
              ball_coordonation[1] = p5.map(sketchData.ball[1], 0, 331, 0, buffer.windowHeight / 2);
              ball_coordonation[2] = p5.map(24, 0, 683, 0, p5.windowWidth /2);
          
            Score[0] =sketchData.Score[0];
            Score[1] = sketchData.Score[1];
            paddles.x = p5.map(sketchData.paddles.x, 0, 683, 0, (buffer.windowWidth / 2))
              paddles.y = p5.map(sketchData.paddles.y, 0, 331, 0, buffer.windowHeight / 2);
              paddles.x_1 = p5.map(sketchData.paddles.x_1, 0, 683, 0, buffer.windowWidth / 2);
              paddles.y_1 = p5.map(sketchData.paddles.y_1, 0, 331, 0, buffer.windowHeight / 2);
        })
      // }
            buffer.stroke(color);
            buffer.fill(color);
            socket.emit("updatePaddlePosition");
    
            paddles.show(paddles.x, paddles.y, paddles.w, paddles.h);
            paddles.show(paddles.x_1, paddles.y_1, paddles.w_1, paddles.h_1);
            
          //   socket.emit('SketchData', (sketchData : SketchData) =>
          //   {
          //       ball_coordonation[0] = p5.map(sketchData.ball[0], 0, 683, 0, buffer.windowWidth / 2);
          //       ball_coordonation[1] = p5.map(sketchData.ball[1], 0, 331, 0, buffer.windowHeight / 2);
          //       ball_coordonation[2] = p5.map(24, 0, 683, 0, p5.windowWidth /2);
            
          //     Score[0] =sketchData.Score[0];
          //     Score[1] = sketchData.Score[1];
          //     paddles.x = p5.map(sketchData.paddles.x, 0, 683, 0, (buffer.windowWidth / 2))
          //       paddles.y = p5.map(sketchData.paddles.y, 0, 331, 0, buffer.windowHeight / 2);
          //       paddles.x_1 = p5.map(sketchData.paddles.x_1, 0, 683, 0, buffer.windowWidth / 2);
          //       paddles.y_1 = p5.map(sketchData.paddles.y_1, 0, 331, 0, buffer.windowHeight / 2);
          // })
        buffer.ellipse(ball_coordonation[0], ball_coordonation[1], ball_coordonation[2], ball_coordonation[2]);
        buffer.textSize(70); // Set text size
        buffer.text(Score[0] + " : " + Score[1], p5.windowWidth / 4 , (p5.windowHeight / 4) * 0.2);
        // p5.fill(255);
      
        buffer.textSize(70);
        buffer.textAlign(p5.CENTER, p5.CENTER);
        if (time[1] !== undefined)
        buffer.text(time[0] + "  :  " + time[1], p5.map(683 / 2, 0, 683, 0, (p5.windowWidth / 2)) ,
        p5.map(331 / 2, 0, 331, 0, (p5.windowHeight / 2)));
        // // // ("working");
      }
      else
      {
        buffer.fill(color);
        buffer.textSize(32);
        buffer.textAlign(p5.CENTER, p5.CENTER);
        // // // (canvasTime[1] + " && " + client_id);
        if (canvasTime[1] === client_id || canvasTime[1] === 'You Won')
        {
          buffer.text('You won', p5.map(683 / 2, 0, 683, 0, (buffer.windowWidth / 2)) ,
          buffer.map(331 / 2, 0, 331, 0, (p5.windowHeight / 2)));
        }
        else if (canvasTime[1] === 'waiting' || canvasTime[1] === 'Your Already In Game' || canvasTime[1] === 'Draw')
        {
          buffer.text(canvasTime[1], p5.map(683 / 2, 0, 683, 0, (buffer.windowWidth / 2)) ,
          p5.map(331 / 2, 0, 331, 0, (p5.windowHeight / 2)));
        }
        else
        {
          buffer.text('Game Over', p5.map(683 / 2, 0, 683, 0, (buffer.windowWidth / 2)) ,
          p5.map(331 / 2, 0, 331, 0, (buffer.windowHeight / 2)));
        }
      }
    buffer.fill(255);
    buffer.textSize(32);
    p5.image(buffer, 0, 0);
    // requestAnimationFrame(p5.draw);
    };


    p5.keyReleased = () => {
      socket.emit('stopPaddleMove')
    }

    p5.keyPressed = () => {
      // // ('key_pressed');
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
