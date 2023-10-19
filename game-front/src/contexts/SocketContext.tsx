import { createContext, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

interface customParam
{
  gameMode : string;
  gameDuration: string;
}

interface SocketProviderProps {
  children: ReactNode;
  customParam: customParam;
}

export const SocketContext = createContext<Socket>({} as Socket);

export const SocketProvider = ({ children, customParam }: SocketProviderProps) => {
    const socket = io("http://localhost:3000", {
      query: {
        gameMode: customParam.gameMode,
        gameDuration : customParam.gameDuration,
      }
    });

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
  };