import { createContext, ReactNode } from "react";
import { io, Socket } from "socket.io-client";
// import React from "react";

// interface SocketProviderProps {
//   children: ReactNode;
// }

// export const ChatSocketContext = createContext<Socket>({} as Socket);

// export const SocketProvider = ({ children }: SocketProviderProps) => {
//   const socket = io("http://localhost:3000", {path: "/chat"});

//   return (
//     <ChatSocketContext.Provider value={socket}>
//       {children}
//     </ChatSocketContext.Provider>
//   );
// };

// import socketio from "socket.io-client";
// import { SOCKET_URL } from "config";


  const socket = io(`http://${import.meta.env.VITE_API_URL}`, 
  {
    withCredentials: true,
    transports: ['websocket'],
    path: '/chat'
  });
  export const ChatSocketContext = createContext<Socket>(socket);
  export const ChatsocketProvider = ChatSocketContext.Provider;
// export const socket = socketio.connect();
// export const SocketContext = React.createContext();
