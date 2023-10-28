import hhamdy from "/src/assets/hhamdy.jpg"
import ban from "/src/assets/ban.svg"
import mute from "/src/assets/mute.svg"
import kick from "/src/assets/kickOut.svg"
import React, { useEffect, useState } from "react"
import { json, useParams } from "react-router-dom"
import axios from "axios"

interface Props {
	avatar: string,
	username: string,
	RoomName: string,
	type: string,
}

const handleban = async (name: string, RoomName: string, type: string) => {
	const jsonData = {
		name: RoomName,
		type: type,
	};
	try {
		const response = await axios.post(`http://localhost:3000/ban-member/${name}`, jsonData,
		{ withCredentials: true }
		).then (() => {
			// console.log("Bann me");
		})
		
	} catch (error) {
		console.error("Error fetching data:", error);
	}
}

const handlemute = async (name: string, RoomName: string, type: string, time: number) => {
	const jsonData = {
		name: RoomName,
		type: type,
		duration: time
	};

	console.log(jsonData.name + " " + " " + jsonData.type + " " + jsonData.duration + " " + name) ;
	try {
		const response = await axios.post(`http://localhost:3000/mute-member/${name}`, jsonData,
		{ withCredentials: true }
		).then (() => {
			console.log("Mute me");
		})
		
	} catch (error) {
		console.error("Error fetching data:", error);
	}
}

const handlekick = async (name: string, RoomName: string, type: string) => {
	const jsonData = {
		name: RoomName,
		type: type,
	};

	try {
		const response = await axios.delete(`http://localhost:3000/kick-member/${name}`, {
		  data: jsonData,
		  withCredentials: true
		});
	  
		console.log("Mute me");
	  } catch (error) {
		console.error("Error fetching data:", error);
	  }
}

const handleadmin =  async (name: string, RoomName: string, type: string) => {
	const jsonData = {
		name: RoomName,
		type: type,
	};

	try {
		const response = await axios.post(`http://localhost:3000/set-admin/${name}`, jsonData , { withCredentials: true })
		.then (() => {
			console.log("make me admin");
		})
	  } catch (error) {
		console.error("Error fetching data:", error);
	  }
}

export function GroupRestriction ({avatar, username, RoomName, type}: Props) {

	const Id = useParams();
	const conf = {
		avatar: avatar,
		username: username,
		id: Id,
	}

	const jsonData = {
		name: RoomName,
		type: type,
	};
	const [acctype, setaccType] = useState('');

	useEffect(() => {
		try {
			const response =  axios.post(`http://localhost:3000/get-member-role/${username}`, jsonData, { withCredentials: true })
			.then ((response) => {
				setaccType(response.data);
			})
		} catch (error) {
			console.log(error);
		}
		
	}, []);
	
	const [banuser, setbanuser] = useState(false);
	const [muteuser, setmuteuser] = useState(false);
	const [access, setaccess] = useState(false);
	return (
		<>
		<div className="pb-5">
			<div className="w-full h-[75px] shadow-lg border-[#6C5DD3] border-gray-200 rounded-custom flex flex-row items-center justify-around">
				<button className="flex items-center gap-[5px]">
					<img src={conf.avatar} className="w-[30px] h-[30px] rounded-full"></img>
					<div className="text-sm text-[#353E6C]">{conf.username}</div>
				</button>
				{
					banuser ?
					<button className="flex items-center" onClick={() => {handleban(conf.username, RoomName, type), setbanuser(!banuser)}}>
					<img src={ban} className="pt-2"></img>
					<div className="text-xs text-[#353E6C]">Ban</div>
					</button>
					:
					<button className="flex items-center" onClick={() => {handleban(conf.username, RoomName, type), setbanuser(!banuser)}}>
					<img src={ban} className="pt-2"></img>
						<div className="text-xs text-[#353E6C]">Unban</div>
					</button>
				}
				<button className="flex flex-col items-center gap-[4px]" onClick={() => setmuteuser(!muteuser)}>
					<div className="flex gap-[6px]">
					<img src={mute}></img>
					<div className="text-xs text-[#353E6C]">Mute</div>
					</div>
					<div className="absolute pt-5 w-[100px]">
					{
						muteuser ? 
						<div className="bg-gray-100 rounded-lg">
								<button onClick={() => handlemute(username, RoomName, type, 1)} className="hover:bg-[#6C5DD3] w-full rounded-sm hover:text-white">1 Hour</button>
								<div className="border"></div>
								<button onClick={() => handlemute(username, RoomName, type, 5)} className="hover:bg-[#6C5DD3] w-full rounded-sm hover:text-white">5 Hours</button>
								<div className="border"></div>
								<button onClick={() => handlemute(username, RoomName, type, 25)} className="hover:bg-[#6C5DD3] w-full rounded-sm hover:text-white">25 Hours</button>
						</div> : null
					}
					</div>
				</button>
				<button className="flex items-center">
					<img src={kick} onClick={() => handlekick(username, RoomName, type)}></img>
					<div className="text-xs text-[#353E6C]">Kick out</div>
				</button>
				<button className="flex flex-col items-center" onClick={() => {setaccess(!access)}}>
				<div className="flex gap-[6px]">
					<img src={kick} className=""></img>
					<div className="text-xs text-[#353E6C]">Change access</div>
				</div>
				<div className="absolute w-[100px]">
				{
					access && acctype === "member" ? (
						<div className="bg-gray-100 rounded-lg">
						<button className="hover:bg-[#6C5DD3] text-sm w-full rounded-sm hover:text-white" onClick={() => handleadmin(username, RoomName, type)}>
							Make admin
						</button>
						</div>
					) : null
				}
					</div>
				</button>
			</div>
		</div>
		</>
	)
}