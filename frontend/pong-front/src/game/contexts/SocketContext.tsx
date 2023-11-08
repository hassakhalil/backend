import { createContext, ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import React from "react";
interface customParam
{
  user_id : number;
  OpponentId: number,
  gameDuration: string;
}

interface SocketProviderProps {
  children: ReactNode
  customParam : customParam;
}

export const SocketContext = createContext<Socket>({} as Socket);

// ()
export const SocketProvider = ({ children, customParam }: SocketProviderProps) => {

    const socket = io(`http://${import.meta.env.VITE_API_URL}`, 
    {
      withCredentials: true,
      transports: ['websocket'],
      query: {
        // gameMode: customParam.gameMode,
        gameDuration : customParam.gameDuration,
        user_id : customParam.user_id,
        OpponentId : customParam.OpponentId
      },
      path: '/game'
    });

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
  };