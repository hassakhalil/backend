import { Game } from "../../pages/Game";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SocketContext, SocketProvider } from "../../game/contexts/SocketContext";
import axios from "axios";
import GameCanvas from './components/Sketch';
import { useContext } from 'react';
// import { SocketContext } from './contexts/SocketContext';
// import { useDataContext } from '../components/Profile/States/stateContext';
// import { ChatSocketContext } from '../components/Chat/contexts/chatContext';

import { useDataContext } from "../Profile/States/stateContext";
import { ChatSocketContext } from "../Chat/contexts/chatContext";
import { GameSetup } from "./GameSetup";
import GameApp from "../../game/GameApp";

// import { SocketContext } from "../../game/contexts/SocketContext";

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
  
   export  const  GameRoute = ()=>
    {
        // const chatSocket = useContext(ChatSocketContext);
        const Socket = useContext(SocketContext);
        // const Socket = useContext();

        useEffect(()=>
        {
    }, [])        
        return (
            <>
              <GameApp />
            </>
        )
    }