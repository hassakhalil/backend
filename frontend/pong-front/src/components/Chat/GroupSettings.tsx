import axios from "axios";
import { AddMember } from "./AddMember";
import { GroupRestriction } from "./GroupRestriction";
import rmv from "/src/assets/remove.svg"
import React, { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import { Add } from "../Home/NavBar/Notification/add";
import { UpdatePass } from "./UpdatePass";


interface Props {
	hide: () => void,
}

const initialUsers = {
	id: 0,
	username: '',
	avatar: '',
	role: '',
	is_banned: '',
	is_muted: '',
}

const allUsers = {
	id: 0,
	username: '',
	avatar: '',
}

export function GroupSettings( {hide}: Props ) {

	const [member, setMember] = useState<typeof initialUsers[]>([]);
	const { id } = useParams();
	const [updatePass, setUpdatepass] = useState(false);
	const [role, Setrole] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
		  try {
			let response = await axios.get(
			  `http://${import.meta.env.VITE_API_URL}/get-my-role/${id}`,
			  { withCredentials: true }
			)
			.then ((response) => {
				if (response.data === "owner")
					Setrole(true);
			})
		} catch (error) {
		}
	};
	
	fetchData();
	}, []);
	useEffect(() => {
		try {
			const response =  axios.get(`http://localhost:3000/get-room-members/${id}`,
			{ withCredentials: true }
			).then ((response) => {
				setMember(response.data);
			})
			
		} catch (error) {
		}
	}, []);

	const [users, setUsers] = useState<typeof allUsers[]>([]);
	useEffect(() => {
		try {
			const response =  axios.get(`http://localhost:3000/get-all-users/`,
			{ withCredentials: true }
			).then ((response) => {
				setUsers(response.data);
			})
			
		} catch (error) {
		}
	}, []);
	const [Isprivate, setIsPrivate] = useState(false);
	const [IsProtected, SetProtected] = useState(false);
	const [type, setType] = useState('');
	const [name, setname] = useState('')
	useEffect(() => {
		try {
			const response =  axios.get(`http://localhost:3000/get-room/${id}`,
			{ withCredentials: true }
			).then ((response) => {
				if (response.data.type === "private")
					setIsPrivate(true);
				if (response.data.type === "protected")
					SetProtected(true)
				setType(response.data.type);
				setname(response.data.name);
			})
			
		} catch (error) {
		}
	}, []);

	const removePass = async () => {
		const jsonData = {
            name: name,
            type: type,
        };
		(jsonData);
		try {
			const response = await axios.delete(`http://${import.meta.env.VITE_API_URL}/remove-room-password`, { 
				withCredentials: true,
				data: jsonData,
			})
			.then (function (response) {
				
			});
		}
		catch (error) {
			(error);
		}
	}
	const [remove, setRemove] = React.useState(false);
	return (
	  <>
		{remove ? null : (
			
			<div className="blur-background lg:centred-component">
			<div className="bg-white px-8 shadow-xl rounded-custom lg:w-[50%] w-full xl:w-[40%] lg:h-[75%] h-full pt-32  lg:pt-10 overflow-hidden centered-component">
					<div className="flex items-center justify-between">
						<div className="text-[#1B1D21] font-semibold text-xl">Room Setting</div>
						<button
						onClick={() => {setRemove(!remove); hide();}}
						className="flex items-center justify-center border bg-white rounded-full w-12 h-12 shadow-xl"
						>
						<img src={rmv} alt="Remove" />
						</button>
					</div>
					<div className="pt-3 h-[70vh]">

					<div className="h-full">
							<div className="w-full h-2/6 overflow-y-auto">
								{member.map((mem, index: number) => (
									<div key={index}>
										<GroupRestriction avatar={mem.avatar} is_banned={mem.is_banned} username={mem.username} RoomName={name} type={type}/>
									</div>
								))
								}
							</div>
							{
								role ?
								<>
								<div className="flex gap-1 items-center justify-center h-[25px]">
									<div className="bg-[#6C5DD3] flex items-center justify-center rounded-custom w-[150px] h-[25px]">

										{
											IsProtected ?
											<button className="text-xs font-semibold font-sans text-white" onClick={() => setUpdatepass(!updatePass)}>
												Update Password
											</button>
											: <button className="text-xs font-semibold font-sans text-white" onClick={() => setUpdatepass(!updatePass)}>
												Set Password
											</button>
										}
									</div>
									{
										IsProtected ? 
										<div className="bg-[#6C5DD3] flex items-center justify-center rounded-custom w-[150px] h-[25px]">

											{
												IsProtected ?
												<button className="text-xs font-semibold font-sans text-white" onClick={() => removePass()}>
													Remove Password
												</button>
												: null
											}
										</div> : null
									}
								</div>
								{
									Isprivate ?
									<div className="flex items-center justify-center text-2xl font-semibold font-sans text-[#11142D] pt-5">Add Players to Your room</div>
									: null
								}
								<div className="flex-col items-center justify-center">

								<div className="w-full pt-3 h-3/6 overflow-y-auto">
								{
									Isprivate ? (
										users.map((user, index: number) => (
											<div key={index}>
											<AddMember avatar={user.avatar} name={user.username} roomName={name}/>
										</div>
										))
										) : null
									}
								</div>
								</div>
								</> : null
							}

					</div>
					</div>
				</div>
		</div>

		)}
		{
			updatePass ? <UpdatePass roomName={name} RoomType={type} hide={() => setUpdatepass(false)}/> : null
		}
	  </>
	);
  }
