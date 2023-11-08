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

interface Props
{
	user_id : number,
}
export function Game ({user_id } : Props) {
	const socket = useContext(SocketContext);

	const [Mydata, setMydata] = useState({username : 'Bot', avatar : bot, rating: '900'})
	const [Oponnent, setOponnent] = useState({username : 'Bot', avatar : bot, rating: '900'})
	let [usersIds, setUsersIds] = useState([-1, -1])

	useEffect(() => {
		socket.on('GameInfo', (users_ids : number[]) =>
		{
			setUsersIds(users_ids);
			fetchData(users_ids);
		})
			const fetchData = async (user_id : number[]) => {
				try {
					const response = await axios.get(`http://${import.meta.env.VITE_API_URL}/get-user/${user_id[0]}`, { withCredentials: true });
				setMydata({username : response.data.username, avatar : response.data.avatar, rating: response.data.rating})
			} catch (error) {
			}
			try {
					const response = await axios.get(`http://${import.meta.env.VITE_API_URL}/get-user/${user_id[1]}`, { withCredentials: true });
				  setOponnent({username : response.data.username, avatar : response.data.avatar, rating: response.data.rating})
				} catch (error) {
				}
				
			  };
			return () => {
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
			{usersIds !== undefined &&
				<>
				<Me profile={Mydata.avatar} name={Mydata.username} friendNum={Mydata.rating}/>
				<Enemy profile={Oponnent.avatar} name={Oponnent.username} friendNum={Oponnent.rating}/>
				</>
			}
			{/* {usersIds !== undefined && user_id ===  usersIds[1] && 
				<>
				<Enemy profile={Oponnent.avatar} name={Oponnent.username} friendNum={Oponnent.rating}/>
				<Me profile={Mydata.avatar} name={Mydata.username} friendNum={Mydata.rating}/>
				</>
			} */}
			</div>
			</div>
			</div>
		</>
	)
}