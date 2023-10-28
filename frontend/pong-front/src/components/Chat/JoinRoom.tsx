import React, { useState } from "react";
import { Add } from "../Home/NavBar/Notification/add";
import axios from "axios";
import { json } from "react-router-dom";
import { CreateRoom } from "./CreateRoom";
import { EnterPass } from "./EnterPass";

interface Props {
	roomName: string,
	RoomType: string,
	avatar: string,
}

const publicRooms = async ( {roomName, RoomType, avatar}: Props )  => {
	const jsonData = {
		avatar: avatar,
		name: roomName,
		type: RoomType,
	  };

	try {
		const response = await axios.post("http://localhost:3000/join-room", jsonData, {withCredentials: true})
		.then((response) => {
			console.log(response.data);
		})
	}
	catch (error) {
		console.log(error);
	}
}

export function JoinRoom ( {avatar, roomName, RoomType}: Props ) {
	const [pass, setpass] = useState(false);

	return (
		<>
			<div className="flex justify-between items-center p-4  rounded-custom">
				<div className="flex items-center">
				<div className="relative flex items-center justify-center border border-[2px] border-[#0049C6] rounded-full w-[48px] h-[48px]">
				<img src={avatar} className="bbc rounded-full w-[40px] h-[40px]" alt="Avatar" />
				</div>
				<div>
				<div className={`pl-3 lg:text-lg ${false ? 'text-white' : 'text-[#11142D]'}`}>
					{roomName}</div>
					<div className="pl-3 text-gray-400 text-xs">{RoomType}</div>
				</div>
				</div>
				{
					RoomType === "public" &&
					<button className="border border-[#6C5DD3] shadow-md bg-[#6C5DD3] w-[120px] h-[40px] rounded-2xl" onClick={() => publicRooms({roomName, RoomType, avatar})}>
						<div className="text-white font-semibold lg:text-sm text-xs">Join This Room</div>
					</button>
					
				}
				{
					RoomType === "protected" && (
					<button className="border border-[#6C5DD3] shadow-md bg-[#6C5DD3] w-[120px] h-[40px] rounded-2xl" onClick={() => setpass(!pass)}>
						<div className="text-white font-semibold lg:text-sm text-xs">Join This Room</div>
					</button>
					)
				}
				{
					pass && <EnterPass hide={() => setpass(!pass)} roomName={roomName} RoomType={RoomType}/>
				}
				</div>
			<div className="border"></div>
		</>
	)
}