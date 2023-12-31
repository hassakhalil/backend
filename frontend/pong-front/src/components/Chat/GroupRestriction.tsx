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
	is_banned: string,
}

const handleban = async (name: string, RoomName: string, type: string) => {
	const jsonData = {
		name: RoomName,
		type: type,
	};

	
	try {
		const response = await axios.post(`http://${import.meta.env.VITE_API_URL}/ban-member/${name}`, jsonData,
		{ withCredentials: true }
		).then (() => {
		})
		
	} catch (error) {
	}
}

const handleallow = async (name: string, RoomName: string, type: string) => {
	const jsonData = {
		name: RoomName,
		type: type,
	};
	
	try {
		const response = await axios.post(`http://${import.meta.env.VITE_API_URL}/allow-member/${name}`, jsonData,
		{ withCredentials: true }
		).then (() => {
		})
		
	} catch (error) {
	}
}

const handlemute = async (name: string, RoomName: string, type: string, time: number) => {
	const jsonData = {
		name: RoomName,
		type: type,
		duration: time
	};

	try {
		const response = await axios.post(`http://${import.meta.env.VITE_API_URL}/mute-member/${name}`, jsonData,
		{ withCredentials: true }
		).then (() => {
		})
		
	} catch (error) {
	}
}

const handlekick = async (name: string, RoomName: string, type: string) => {
	const jsonData = {
		name: RoomName,
		type: type,
	};

	try {
		const response = await axios.delete(`http://${import.meta.env.VITE_API_URL}/kick-member/${name}`, {
		  data: jsonData,
		  withCredentials: true
		})
		.then ((response) => {
		})
	  } catch (error) {
	  }
}

const handleadmin =  async (name: string, RoomName: string, type: string) => {
	const jsonData = {
		name: RoomName,
		type: type,
	};

	try {
		const response = await axios.post(`http://${import.meta.env.VITE_API_URL}/set-admin/${name}`, jsonData , { withCredentials: true })
		.then (() => {
		})
	  } catch (error) {
	  }
}

export function GroupRestriction ({avatar, is_banned, username, RoomName, type}: Props) {

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
			const response =  axios.post(`http://${import.meta.env.VITE_API_URL}/get-member-role/${username}`, jsonData, { withCredentials: true })
			.then ((response) => {
				setaccType(response.data);
			})
		} catch (error) {
			(error);
		}
		
	}, []);

	
	const [banuser, setbanuser] = useState(is_banned);
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
					(banuser.toString() === "false") ?
					<button className="flex items-center" onClick={() => {handleban(conf.username, RoomName, type), setbanuser("true")}}>
					<img src={ban} className="pt-2"></img>
					<div className="text-xs text-[#353E6C]">Ban</div>
					</button>
					: 
					<button className="flex items-center" onClick={() => {handleallow(conf.username, RoomName, type), setbanuser("false")}}>
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
				<button className="flex items-center" onClick={() => handlekick(username, RoomName, type)}>
					<img src={kick}></img>
					<div className="text-xs text-[#353E6C]">Kick out</div>
				</button>
				<button className="flex flex-col items-center" onClick={() => {setaccess(!access)}}>
				<div className="flex">
					<div className="text-xs text-[#353E6C]">Change access</div>
				</div>
				<div className="absolute w-[100px] pt-5">
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