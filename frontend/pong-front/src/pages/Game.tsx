import { NavBar } from "../components/Home/NavBar/NavBar";
import { GameTitle } from "../components/Game/GameTitle";
import { Enemy } from "../components/Game/Enemy";
import { Me } from "../components/Game/Me";
import { SocketContext, SocketProvider } from "../game/contexts/SocketContext";
import GameApp from "../game/GameApp";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { useContext , createContext} from "react";
import { Scorecontext } from "../game/components/Sketch";
import React from "react";
import { ChatProfileContext } from "../components/Chat/contexts/chatProfileContext";
import { ChatSocketContext } from "../components/Chat/contexts/chatContext";



export function Game () {
	const socket = useContext(SocketContext);

	useEffect(() => {
		// if (socket) {
			// }
			return () => {
				// Component unmount cleanup logic here
				// if (socket) {
				//   if (chatContext) {
				// 	console.log('Sending online status to chat');
				// 	let state = 'online';
				// 	chatContext.emit('online', { state });
				//   }
				console.log('khdaaaam');
				if(socket)
				{
				  socket.disconnect();
				}
				// }
			  };
			}, []);

	return (
		<>
			<NavBar/>
			<div className="pl-8">
			<div className="flex flex-col items-center lg:pl-28 pr-10 pl-10">
			<div className="flex lg:flex-row flex-col justify-between w-full items-center pt-32">
				<Enemy profile="/src/assets/ahamdy.jpg" name="Adnan hamdy" friendNum="1337"/>
				<Me profile="/src/assets/hkhalil.jpg" name="hssan khalil" friendNum="0"/>
			</div>
				<GameApp />
			<div className="pt-32 lg:pl-28 pl-10 pb-10">
				{/* <GameTitle/> */}
			</div>
			</div>
			</div>
		</>
	)
}