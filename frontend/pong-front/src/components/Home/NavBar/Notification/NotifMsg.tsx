import axios from "axios"
import React, { useContext, useState } from "react"
import { MyContext, UserContext } from "../../../../pages/Profile";
import { useProfilecontext } from "../../../../ProfileContext";
import {useNavigate  } from "react-router-dom";
interface Props {
    profile: string,
    name: string,
    requestType: string,
	id : number,
	show: () => void;
}

export function NotifMsg ( {profile, name, requestType , id, show}: Props ) {

	const [hide, sethide] = useState(true);
	const navigate = useNavigate();
	// const data = useContext(MyContext);
	const Profile = useProfilecontext();
	const handleAccept = async () => {
		if (requestType !== 'game')
		{
			try {
			const response = await axios.post(`http://${import.meta.env.VITE_API_URL}/accept-friend/${name}`, null, {withCredentials: true})
			.then((response) => {
				Profile?.setData((prevUserData) => {
					const filteredRequests = prevUserData.pending_requests.filter(
					  (request) => request.username !== name
					);
				  
					return {
					  ...prevUserData,
					  pending_requests: [...filteredRequests],
					};

				});
				Profile?.setData((prevUserData) => {
					const filteredRequests = prevUserData.friends.filter(
					  (request) => request.username !== name
					);
				  
					return {
					  ...prevUserData,
					  friends: [...filteredRequests],
					};

				});

				Profile?.setData((prevUserData) => ({
					...prevUserData,
					// user_data: {
						...prevUserData,
						friends: [...prevUserData.friends, response.data],
						// },
					}));
					// console.log('data lli wslat', response.data);
					sethide(false);
					show();
			  })
			}	
			catch (error) {
			}
		}
		else
		{

			sethide(false)
			Profile?.setData((prevUserData) => {
				const filteredRequests = prevUserData.pending_requests.filter(
				  (request) => request.id !== id || request.type !== requestType
				);
			  
				return {
				  ...prevUserData,
				  pending_requests: [...filteredRequests],
				};
			  });
			navigate('/game', { state: { gameDuration: 6, user_id: Profile?.data?.user_data?.id, OpponentId : id} });
		}
	}

	const handleRefuse = async () => {
		try {
			const response = await axios.delete(`http://${import.meta.env.VITE_API_URL}/delete-request/${name}`, {withCredentials: true})
			Profile?.setData((prevUserData) => {
				const filteredRequests = prevUserData.pending_requests.filter(
				  (request) => request.username !== name 
				);
			  
				return {
				  ...prevUserData,
				  pending_requests: [...filteredRequests],
				};
			  });
			sethide(false);
			show();
		}	
		catch (error) {

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
							<div className="text-[#808191] lg:text-xs">{requestType + ' Request'}</div>
						</div>
				</div>
					<div className="flex gap-1 pt-4 pl-16">
						{ requestType !== 'game' && 
						<button className="flex justify-center items-center border rounded-xl bg-[#E4E4E47F] border-[#E4E4E47F] h-[38px] w-[86px] lg:h-[35px] lg:w-[60px]" onClick={handleRefuse}>
							<div className="text-[#808191] font-semibold lg:text-sm">Refuse</div>
						</button>}
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