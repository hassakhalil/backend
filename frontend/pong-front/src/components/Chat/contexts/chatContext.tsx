// import { createContext, ReactNode } from "react";
// import { io, Socket } from "socket.io-client";


//   const socket = io(`http://${import.meta.env.VITE_API_URL}`, 
//   {
//     withCredentials: true,
//     transports: ['websocket'],
//     path: '/chat'
//   });
//   export const ChatSocketContext = createContext<Socket>(socket);
//   export const ChatsocketProvider = ChatSocketContext.Provider;


import React, { createContext, ReactNode, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface ChatSocketProviderProps {
  children: ReactNode;
}

export const ChatSocketContext = createContext<Socket | null>(null);

export const ChatSocketProvider: React.FC<ChatSocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(`http://${import.meta.env.VITE_API_URL}`, {
      withCredentials: true,
      transports: ['websocket'],
      path: '/chat'
    });
    
    ('newSocket');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []); // The empty dependency array ensures that the effect runs only once when the component mounts

  return (
    <ChatSocketContext.Provider value={socket}>
      {children}
    </ChatSocketContext.Provider>
  );
};