import GameCanvas from './components/Sketch';
import { useContext, useState } from 'react';
import { SocketContext } from './contexts/SocketContext';
// import {socket} from './contexts/SocketContext'
import "./App.css"
function GameApp() {
  const socket = useContext(SocketContext)
  let custom_msg: string;
  const [RenderCanvas, setRenderCanvas] = useState(true);
  const [gameState, setGameState] = useState('pending');
  // const gameMode = 'simple';
  // socket.emit('game Mode', gameMode);

  socket.on('disconnectAll', () => {
    socket.disconnect();
  })
  socket.on('Game result', (result_msg) => {
    setGameState(result_msg + "Won");
    setRenderCanvas(false);
  });
  custom_msg = gameState;
  return RenderCanvas ? (<GameCanvas />) : (<h1> {custom_msg} </h1>);

}
export default GameApp;