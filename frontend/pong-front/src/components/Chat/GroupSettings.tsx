import axios from "axios";
import { AddMember } from "./AddMember";
import { GroupRestriction } from "./GroupRestriction";
import rmv from "/src/assets/remove.svg"
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
	useEffect(() => {
		try {
			const response =  axios.get(`http://localhost:3000/get-room-members/${id}`,
			{ withCredentials: true }
			).then ((response) => {
				setMember(response.data);
			})
			
		} catch (error) {
			console.error("Error fetching data:", error);
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
			console.error("Error fetching data:", error);
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
			console.error("Error fetching data:", error);
		}
	}, []);


	const [remove, setRemove] = React.useState(false);
	// console.log(name)
	return (
	  <>
		{remove ? null : (
			
			<div className="blur-background lg:centred-component">
			<div className="bg-white px-8 shadow-xl rounded-custom lg:w-[50%] w-full xl:w-[40%] lg:h-[75%] h-full pt-32  lg:pt-10 overflow-hidden centered-component">
					<div className="flex items-center justify-between">
						<div className="text-[#1B1D21] font-semibold text-xl">Room Setting</div>
						<button
						onClick={() => {setRemove(!remove), hide}}
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
								Isprivate ?
								<div className="flex items-center justify-center text-2xl font-semibold font-sans text-[#11142D] pt-5">Add Players to Your room</div>
								: null
							}
							<div className="flex-col items-center justify-center">

							<div className="w-full pt-3 h-3/6 overflow-y-auto pb-5">
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
							<div className="flex items-center justify-center">

								{
									IsProtected ?
									<button className="text-xs font-semibold font-sans text-gray-500" onClick={() => setUpdatepass(!updatePass)}>
										Update Password
									</button>
									: null
								}
								</div>
							</div>

					</div>
					</div>
				</div>
		</div>

		)}
		{
			updatePass ? <UpdatePass roomName={name} RoomType={type} hide={() => {}}/> : null
		}
	  </>
	);
  }


//   HassanCharef#?3