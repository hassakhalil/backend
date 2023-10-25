import axios from "axios"
import { useContext, useState } from "react"
import React from "react"
import { MyContext, UserContext } from "../../pages/Profile";


interface Props {
	name: string,
}

export function Deblock ( { name }: Props ) {

	const data = useContext(MyContext);
	const [hide, sethide] = useState(true);


	const UnblockFriend = async () => {
		try {
			const response = await axios.post(`http://${import.meta.env.VITE_API_URL}/unblock-friend/${name}`, null, {withCredentials: true})
			.then((response) => {
				data?.setMyUserData((prevUserData) => ({
					...prevUserData,
					user_data: {
					  ...prevUserData.user_data,
					  blocks: response.data,
					},
				  }));
				  sethide(false);
			  })
		}
		catch (error) {
			console.log(error);
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