import GameCanvas from './components/Sketch';
import { useContext, useState } from 'react';
import { SocketContext } from './contexts/SocketContext';
// import {socket} from './contexts/SocketContext'
import "./gameApp.css"
import { useEffect } from 'react';
// interface Prop1 {
//   onpropChange1: (prop1: number) => void;
// }

// interface Prop2 {
//   onpropChange2: (prop2: number) => void;
// }

// interface Props {
//   parentCallback: (Score_holder: number[]) => void;
// }

function GameApp() {
  console.log("error-game");
  const socket = useContext(SocketContext);
  let custom_msg: string;
  const [RenderCanvas, setRenderCanvas] = useState(true);
  const [gameState, setGameState] = useState('pending')
  console.log("Gameapp");
  // const gameMode = 'simple';
  // socket.emit('game Mode', gameMode);
  console.log('GameApp loaded');
  useEffect(() => {
    socket.on('disconnectAll', () => {
      socket.disconnect();
    })
    socket.on('Game result', (result_msg) => {
      setGameState(result_msg + "Won");
      setRenderCanvas(false);
    });
    return () =>
    {
      socket.off('disconnectAll');
      socket.off('Game result');
    }
  }, [])
  custom_msg = gameState;

  return RenderCanvas ? (<GameCanvas/>) : (<h1> {custom_msg} </h1>);

}
export default GameApp;