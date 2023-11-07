import React from "react"
import hhamdy from "/src/assets/hhamdy.jpg"
import axios from "axios";
import { json } from "react-router-dom";

interface Props {
	roomName: string,
	name: string,
	avatar: string,
}

const Addmember = async ( name: string, roomName: string ) => {
	const jsonData = {
		name: roomName,
		type: 'private',
	};
	(jsonData.name + " " + jsonData.type);
	try {
		const response = await axios.post(`http://localhost:3000/add-member/${name}`, jsonData,
		{ withCredentials: true }
		).then (() => {
		})
		
	} catch (error) {
	}
}

export function AddMember ( {name, avatar, roomName}: Props ) {
	return (
		<>
		<div className="py-1">
			<div className="w-full h-[60px] shadow-md  bg-white rounded-custom flex flex-row items-center justify-around">
				<div className="flex gap-[8px] items-center">
					<img src={avatar} className="w-[30px] h-[30px] rounded-full"></img>
					<div className="text-sm text-[#353E6C]">{name}</div>
				</div>
				<button className="flex items-center justify-center bg-[#6C5DD3] h-[30px] shadow-lg rounded-custom w-[100px]" onClick={() => Addmember(name, roomName)}>
					<div className="text-white text-xs font-semibold pt-[2px]">Add member</div>
				</button>
			</div>
		</div>
		</>
	)
}