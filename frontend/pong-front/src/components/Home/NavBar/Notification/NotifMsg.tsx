import axios from "axios"
import React, { useContext, useState } from "react"
import { MyContext, UserContext } from "../../../../pages/Profile";

interface Props {
    profile: string,
    name: string,
    requestType: string,
}

export function NotifMsg ( {profile, name, requestType}: Props ) {

	const [hide, sethide] = useState(true);
	const data = useContext(MyContext);

	const handleAccept = async () => {
		console.log(name);
		try {
			const response = await axios.post(`http://${import.meta.env.VITE_API_URL}/accept-friend/${name}`, null, {withCredentials: true})
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

	const handleRefuse = async () => {
		console.log(name);
		try {
			const response = await axios.delete(`http://${import.meta.env.VITE_API_URL}/delete-request/${name}`, {withCredentials: true})
			sethide(false);
		}	
		catch (error) {
			console.log(error);
		}
	}

    return (
        <>
		{
			hide ?
			<div className="lg:flex lg:items-center lg:pr-2 lg:pl-10 lg:pb-4">
				<div className="flex pt-14 lg:pt-8">
						<div>
							<img src={profile} className="rounded-full w-[48px] h-[48px] lg:w-[50px] lg:h-[50px]"></img>
						</div>
						<div className="pl-6 flex flex-col gap-[6px]">
							<div className="flex">
								<div className="lg:text-md">{name}</div>
							</div>
							<div className="text-[#808191] lg:text-xs">{requestType}</div>
						</div>
				</div>
					<div className="flex gap-1 pt-4 pl-16">
						<button className="flex justify-center items-center border rounded-xl bg-[#E4E4E47F] border-[#E4E4E47F] h-[38px] w-[86px] lg:h-[35px] lg:w-[60px]" onClick={handleRefuse}>
							<div className="text-[#808191] font-semibold lg:text-sm">Refuse</div>
						</button>
						<button className="flex justify-center items-center border rounded-xl bg-[#6C5DD3] border-[#6C5DD3] h-[38px] w-[86px] lg:h-[35px] lg:w-[60px]" onClick={handleAccept}>
							<div className="text-white font-semibold lg:text-sm">Accept</div>
						</button>
					</div>
			</div>
			: null
		}
        </>
    )
}