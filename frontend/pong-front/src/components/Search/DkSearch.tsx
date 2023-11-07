import rmv from "/src/assets/remove.svg"
import rec from "/src/assets/rectangle.svg"
import React, { useState } from "react"
import axios from "axios";
import { useEffect } from "react";

interface Props {
	hide: () => void,
}

export function DkSearch ( {hide}: Props ) {
	
    const [remove, SetRemove] = React.useState(false);
	const [userData, setUserData] = useState<any[]>([]);
	const [friendName, SetfriendName] = React.useState<string>('');
	const [error, SetError] = React.useState(false);
	const [sent, Setsent] = React.useState(false);

	interface MyUserData {
		user_data: {
			id: 0,
			username: '',
			avatar: ''
			me: false,
			is_two_factor_auth_enabled: false,
			state: '',
			rating: '',
		  },
		  friends: [],
		  blocks: [],
		  match_history: [],
		  pending_requests: [],
		  achievements: [],
		  wins: 0,
		  loses: 0,
		  draws: 0,
		}
		
	const [MyProfile, setMyProfile] = useState<MyUserData>();
	useEffect(() => {
		try {
		const response =  axios.get(`http://localhost:3000/get-all-users`, { withCredentials: true })
		.then ((response) => {
			setUserData(response.data);
			
		})
		} catch (error) {
		}
	}, []);


	useEffect(() => {
		try {
			const response1 = axios.get(`http://localhost:3000/profile/me`, {withCredentials: true})
			.then ((response1) => {
				setMyProfile(response1.data)
		})
		} catch (error) {
		}
	}, []);

	const handleFormSubmit = async ( ) => {
		try {
			const response = await axios.post(`http://${import.meta.env.VITE_API_URL}/add-friend/${friendName}`, null, { withCredentials: true })
			.then (function (response) {
				SetError(false);
				SetRemove(!remove);
				Setsent(true);
			});
        } catch (error) {
		  SetError(true);
		  Setsent(false);
        }
      };

	const handleInvite = async ( friendName: string ) => {
		try {
			const response = await axios.post(`http://${import.meta.env.VITE_API_URL}/add-friend/${friendName}`, null, { withCredentials: true })
			.then (function (response) {
				SetError(false);
				SetRemove(!remove);
				Setsent(true);
			});
        } catch (error) {
		  SetError(true);
		  Setsent(false);
        }
      };	

	return (
		<>
		{
			remove ? null : (
				(
					<div className="blur-background z">
					<div className="centered-component pt-28">
					<div className="flex sm:w-[480px] w-screen sm:h-[600px] pt-16 sm:pt-0 h-screen bg-white shadow-2xl rounded-custom">
						<div className="flex flex-col">
						<div className="flex sm:w-[480px] w-screen justify-between">
							<div className="text-[#11142D] font-semibold text-lg p-10">Invite Friends</div>
							<div className="pt-8 pr-5">
								<button onClick={() => {SetRemove(!remove); hide();}} className="flex items-center justify-center border border-white rounded-full w-[48px] h-[48px] lg:w-[50px] h-[50px] shadow-xl">
									<img src={rmv}></img>
								</button>
							</div>
						</div>
						<div>
						<div className="pr-8 pl-8 pb-10 px-10">
							<div className="flex gap-[20px]">

                            <form className="flex items-center border border-4 border-[#6C5DD3] rounded-xl w-full h-[56px] lg:w-full lg:h-[45px]"
							onSubmit={(e) => {
								e.preventDefault();
								handleFormSubmit();
							}}
							>
                                <input  className="rounded-xl w-full h-full pr-3 pl-3 lg:text-md lg:pl-5 focus:outline-none text-[#888EFF]" placeholder="Username"
								value={friendName}
								onChange={(e) => {
									e.preventDefault();
									SetfriendName(e.target.value );
								}}>
								  </input>
                            </form>

							{/* <form
					className="flex justify-center items-center rounded-xl h-[70px] w-[300px]"
					onSubmit={(e) => {
						e.preventDefault();
						handleFormSubmit();
					}}
					>
					<input
						className="rounded-xl w-full h-full border bg-gray-100 border-[3px] pr-3 pl-3 focus:border-[#6C5DD3] focus:outline-none text-[#888EFF] text-center"
						maxLength={8}
						value={formData.username}
						onChange={(e) => {
						e.preventDefault();
						setFormData({ ...formData, username: e.target.value });
						}}
					/>
					</form> */}

							<button className="flex justify-center items-center border rounded-xl bg-[#6C5DD3] border-[#6C5DD3] h-[45px] w-[100px]" onClick={handleFormSubmit}>
                                <div className="text-white font-semibold ">Invite</div>
                            </button>
							</div>
							{
								error ? 
								<div className="absolute pt-[10px] lg:pt-[20px]">
									<div className="border bg-[#E9DCE5] rounded-lg w-[170px] h-[25px]  flex gap-1 items-center justify-center">
										<div className="text-xs font-semibold text-[#6C5DD3]">Invitation Not Valid</div>
										<div>
											<div  style={{ backgroundImage: `url(${rec})`}} className="w-[14px] h-[14px] bg-center bg-no-repeat bg-cover">
												<div className="text-white flex items-center justify-center text-xs font-semibold">
													!
												</div>
											</div>
										</div>
									</div>
								</div> : null

							}
							{
								sent ? 
								<div className="absolute pt-[10px] lg:pt-[20px]">
									<div className="border bg-[#E9DCE5] rounded-lg w-[170px] h-[25px]  flex gap-1 items-center justify-center">
										<div className="text-xs font-semibold text-[#6C5DD3]">Invitation Send</div>
										<div>
											<div  style={{ backgroundImage: `url(${rec})`}} className="w-[14px] h-[14px] bg-center bg-no-repeat bg-cover">
												<div className="text-white flex items-center justify-center text-xs font-semibold">
													!
												</div>
											</div>
										</div>
									</div>
								</div>
								: null
							}
                        </div>
						</div>
						<div className="overflow-y-auto px-10 h-[78%] w-full">
							{userData.map((friend, index: number) => (
								<div key={index}>
									{
										(MyProfile?.friends.some((obj : any) => obj.username === friend.username) || (MyProfile?.pending_requests.some((obj : any) => obj.username === friend.username) || (MyProfile?.blocks.some((obj : any) => obj.username === friend.username) || MyProfile?.user_data?.username === friend.username )) === true ? null :

										<div>
											<div className="flex items-center justify-between gap-3 p-5">
											<div className="flex items-center gap-[15px] justify-center">
												<img className="w-[50px] h-[50px] rounded-full " src={friend.avatar}></img>
												<div  className="w-[50px] h-[50px] flex items-center pb-1 justify-center rounded-full">{friend.username}</div>
											</div>
											<button className="flex items-center justify-center" onClick={() => handleInvite(friend.username)}>
												<div className="flex items-center justify-center h-[30px] w-[80px] bg-[#6C5DD3] rounded-xl text-white font-bold tracking-wider shadow-md">Invite</div>
											</button>
										</div>
										<div className="border px-10"></div>
										</div>
										)
									}
								</div>
								))
								}
						</div>
						</div>
					</div>
				</div>
			</div>
				)
			)
		}
		</>
	)
}