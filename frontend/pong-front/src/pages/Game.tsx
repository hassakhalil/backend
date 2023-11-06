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
import { UserContext } from "./Profile";
import { useDataContext } from "../components/Profile/States/stateContext";
import axios from 'axios'
import bot from "/src/assets/Bot_Img.png"

interface player {
	username: string,
	avatar : string,
	rating: string,
}

export function Game () {
	const socket = useContext(SocketContext);
	// const profile = useDataContext();
	// let Mydata : player;
	const [Mydata, setMydata] = useState({username : 'BotOne', avatar : bot, rating: '900'})
	const [Oponnent, setOponnent] = useState({username : 'BotTwo', avatar : bot, rating: '900'})
	// setMydata();
	// let opponentData : player;

	useEffect(() => {
		socket.on('GameInfo', (users_ids : number[]) =>
		{
			fetchData();
		})
			const fetchData = async () => {
				try {
				  // Replace the URL with your API endpoint
				  const response = await axios.get(`http://${import.meta.env.VITE_API_URL}/profile/me`, { withCredentials: true });
				//   Myata : ;
				setMydata({username : response.data.user_data.username, avatar : response.data.user_data.avatar, rating: response.data.user_data.rating})
				console.log('data li getit', Mydata)
				// console.log('data', Mydata)
				//   setData+(Mydata);
				} catch (error) {
				  console.error('Error fetching data:', error);
				}
				// try {
				// 	const response = await axios.get(`http://${import.meta.env.VITE_API_URL}/profile/me`, { withCredentials: true });
				// 	// Myata : ;
				// 	opponentData = response.data;
				//   //   setData+(Mydata);
				//   } catch (error) {
				// 	console.error('Error fetching data:', error);
				//   }
		  // 
			  };
			// }, []);
		
			return () => {
				console.log('khdaaaam');
				if(socket)
				{
				  socket.disconnect();
				}
			  };
			}, []);

	return (
		<>
			{/* <NavBar/> */}
			<div className="pl-8">
			<div className="flex flex-col items-center lg:pl-28 pr-10 pl-10">
			<div className="flex lg:flex-row flex-col justify-between w-full items-center pt-32">
				<Enemy profile={Oponnent.avatar} name={Oponnent.username} friendNum={Oponnent.rating}/>
				<Me profile={Mydata.avatar} name={Mydata.username} friendNum={Mydata.rating}/>
			</div>
				{/* <GameApp /> */}
			</div>
			</div>
		</>
	)
}