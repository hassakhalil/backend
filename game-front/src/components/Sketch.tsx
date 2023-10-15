import { useContext } from "react";
import Paddles from "./SketchClasses/Paddle"
import { SocketContext } from "../contexts/SocketContext";
import { coordonation } from "./SketchInterfaces/coordonation";
import { P5CanvasInstance, ReactP5Wrapper} from "react-p5-wrapper";
import { Image } from "p5";

const GameCanvas = () => {
  const socket = useContext(SocketContext);
  let canvasTime : string[] = [];
  canvasTime[0] = 'false';
  canvasTime[1] = 'waiting'
  let backgroundImage : Image;
  console.log("GameCanvas");
  const sketch = (p5 : P5CanvasInstance) => {
    let ball_coordonation: number[] = [];
    let paddles: Paddles;
    let Score : number[] = [];
    let time : number[] = [];

    p5.setup = () => { 
      // let canvasDiv = p5.createDiv('');
      // canvasDiv.addClass('canvas-pong')  
  //     // canvasDiv.size(p5.width, p5.height);
  //     let containerDiv = p5.createDiv('');
  // // Add a CSS class to the container div
  p5.createCanvas(p5.windowWidth / 2, p5.windowHeight / 2);
  // containerDiv.addClass('canvas-container');

  // // Create a div element inside the container and set its content
  // let canvasDiv = p5.createDiv('');
  // canvasDiv.position(p5.windowWidth / 4, p5.windowHeight / 4);
  // containerDiv.child(canvasDiv);

  // // Add a CSS class to the div
  // canvasDiv.addClass('canvas-pong');
  // canvasDiv.size(p5.windowWidth / 2, p5.windowHeight / 2)

  // // Set the border radius to make it round
  // canvasDiv.style('border', '2px solid black');
  // canvasDiv.style('border-radius', '10px');
      paddles = new Paddles(p5);
      backgroundImage = p5.loadImage('/src/assets/backgroundImage.jpg');
    };
    
    socket.on('delay',(state : string[])=>
    {
      canvasTime[0] = state[0];
      canvasTime[1] = state[1];
      console.log(canvasTime);
    })
    p5.draw = () => {
      p5.resizeCanvas(p5.windowWidth / 2, p5.windowHeight / 2);
      // backgroundImage.resize(p5.windowWidth / 2, p5.windowHeight / 2);
      p5.background('#E4E4E480');
      // backgroundImage.style
      if  (canvasTime[0] === 'true')
      {
        socket.emit('getballposition', (coordonation: number[])=>
        {
          ball_coordonation[0] = p5.map(coordonation[0], 0, 683, 0, p5.windowWidth / 2);
          ball_coordonation[1] = p5.map(coordonation[1], 0, 331, 0, p5.windowHeight / 2);
          ball_coordonation[2] = p5.map(24, 0, 683, 0, p5.windowWidth /2);
        });
        socket.on('gameTimer', (currentTime : number[])=>
        {
          time[0] = currentTime[0];
          time[1] = currentTime[1];
        })
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
        })
        paddles.show(paddles.x, paddles.y, paddles.w, paddles.h);
        paddles.show(paddles.x_1, paddles.y_1, paddles.w_1, paddles.h_1);
        p5.text(time[0] + ":" + time[1], p5.height / 2 ,p5.width / 2);
        p5.text(Score[0], 32, 40, 40);
        p5.text(Score[1], p5.windowWidth / 2 - 32, 40, 40);
      }
      else
      {
        console.log("text");
        p5.fill(255);
        p5.textSize(32);
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.text(canvasTime[1], p5.map(683 / 2, 0, 683, 0, (p5.windowWidth / 2)) ,
         p5.map(331 / 2, 0, 331, 0, (p5.windowHeight / 2)));
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
  <div className="GameCanvas">
    <ReactP5Wrapper sketch={sketch}/>
    </div>
  );
  }

export default GameCanvas;
