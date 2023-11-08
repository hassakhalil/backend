import axios from "axios"
import { useContext, useState } from "react"
import React from "react"
import { MyContext, UserContext } from "../../pages/Profile";
import { useProfilecontext } from "../../ProfileContext";


interface Props {
	name: string,
}

export function Deblock ( { name }: Props ) {

	// const data = useContext(MyContext);
	const [hide, sethide] = useState(true);
	const data = useProfilecontext()


	const UnblockFriend = async () => {
		let deblockedFriend : any
		try {
			const response = await axios.post(`http://${import.meta.env.VITE_API_URL}/unblock-friend/${name}`, null, {withCredentials: true})
			.then((response) => {
		data?.setData((prevUserData) => {
					deblockedFriend = prevUserData.blocks.filter(
						(request) => request.username === name
					  );
					
					const filteredRequests = prevUserData.blocks.filter(
					  (request) => request.username !== name
					);
				  
					return {
					  ...prevUserData,
					  blocks: [...filteredRequests],
					};

				});
				data?.setData((prevUserData) => ({
					...prevUserData,
					// user_data: {
						...prevUserData,
						friends: [...prevUserData.friends, deblockedFriend[0]],
						// },
					}));
				  sethide(false);
			  })
		}
		catch (error) {
			(error);
		}
	}
	return (
		<>
			{
			hide ? 
			<div className="flex items-center justify-around w-[120px] h-[40px] bg-gray-100 rounded-md">
				<div className="text-sm text-[#5961F9]">{name}</div>
					<button onClick={UnblockFriend}>
						<div className="text-lg font-semibold text-[#ff0000]">X</div>
					</button>
			</div> : null
			}
		</>
	)
}