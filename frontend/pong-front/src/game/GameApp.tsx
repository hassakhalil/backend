import GameCanvas from './components/Sketch';
import { useContext, useState } from 'react';
import { SocketContext } from './contexts/SocketContext';
// import {socket} from './contexts/SocketContext'
import "./gameApp.css"
import { useEffect } from 'react';

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
  

function GameApp() {

  const socket = useContext(SocketContext);
  let custom_msg: string;
  const [RenderCanvas, setRenderCanvas] = useState(true);
  const [gameState, setGameState] = useState('pending')

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