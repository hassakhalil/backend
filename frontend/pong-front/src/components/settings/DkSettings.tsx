import rmv from "/src/assets/remove.svg"
import React, { useState } from "react";
import { TwoFa } from "./TwoFA";
import { useEffect } from "react";
import axios from "axios";
import { GameSetting } from "./GameSettings";
import { MbTwoFA } from "./MbTwoFA";
import { MbGameSettings } from "./MbGameSetting";
import { json, unstable_Blocker, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { MyContext } from "../../pages/Profile";


interface Props {
	hide: () => void,
}

export function DkSettings ( {hide}: Props ) {

	const data = useContext(MyContext);
	
	  useEffect(() => {
		
		  try {
			const response =  axios.get(`http://${import.meta.env.VITE_API_URL}/profile/me`, { withCredentials: true }).then ( function(response) {
				console.log(response.data);
			} )
		  } catch (error) {
			console.error("Error fetching user data:");
		  }


	}, []);
	
    const [remove, SetRemove] = React.useState(false);
	const [twoFA, setTwoFa] = useState(false);
    const [gameSetting, setgameSetting] = React.useState(false);
	const [formData, setFormData] = useState<{username: string}>({
		username: '',
	});
	let defualt : string | undefined = data?.MyuserData?.user_data?.avatar;
	const [BASE_URL, setBase] = useState(defualt);


	  
	const handleFileUpload = async (event: any) => {
		try {

			const file = event.target.files[0];
			const formData = new FormData();
			formData.append("avatar", file);

			axios.post(`http://${import.meta.env.VITE_API_URL}/upload-avatar`, formData,  {
				withCredentials: true,
				headers: {
					"Content-Type": "multipart/form-data",
				} 
			}
			)
			.then((response) => {
				data?.setMyUserData((prevUserData) => ({
					...prevUserData,
					user_data: {
					  ...prevUserData.user_data,
					  avatar: response.data,
					},
				  }));



				setBase(`http://${import.meta.env.VITE_API_URL}/avatars/${response.data}`);

			  })
			}
			catch(error) {
				console.log("Post profile faild", error);
			}
		}


	const handleName = async () => {
		try {
			console.log(formData.username);
			const response = await axios.post(`http://${import.meta.env.VITE_API_URL}/set-username`, formData, {withCredentials: true}).then (function (response) {
				console.log(response.data);
				data?.setMyUserData((prevUserData) => ({
					...prevUserData,
					user_data: {
					  ...prevUserData.user_data,
					  username: response.data,
					},
				  }));
			});
		}
		catch(error) {
			console.log("Post profile faild", error);
		}
	}


	return (
		<>
		{
			remove ? null : (
				(
					<div className="blur-background z mobile-nav-bar sm:block">
					<div className="centered-component pt-28">
					<div className="flex w-[480px] h-[600px] bg-white shadow-2xl rounded-custom">
						<div className="flex flex-col">
						<div className="flex justify-between">
							<div className="text-[#11142D] font-semibold text-lg p-10">Account Settings</div>
							<div className="pt-8 pr-5">
								<button onClick={() => {SetRemove(!remove); hide();}} className="flex items-center justify-center border border-white rounded-full w-[48px] h-[48px] lg:w-[50px] h-[50px] shadow-xl">
									<img src={rmv}></img>
								</button>
							</div>
						</div>
						<div className="flex flex-col">

						<div className="flex items-center justify-around gap-10 pt-5 p-10 pl-5">
							<button  className={`flex items-center justify-center border  border-[2px] w-[120px] h-[35px] rounded-xl bg-[#6C5DD3] border-[#6C5DD3]`} >
								<div className={`text-white font-semibold`}>Your Profile</div>
							</button> 
							<button className={`flex bg-[#6C5DD3] border-[#6C5DD3] items-center justify-center border border-[2px] bg-white border-[#FF754C] w-[100px] h-[35px] rounded-xl`} onClick={() => {setTwoFa(!twoFA); SetRemove(!remove)}}>
								<div className={`font-semibold text-balck`}>2FA</div>
							</button>
							<button className={`flex items-center justify-center border  border-[2px] w-[120px] h-[35px] rounded-xl bg-white border-[#FF754C]`} onClick={() => {setgameSetting(!gameSetting), SetRemove(!remove)}}>
								<div className={`text-black font-semibold`}>Game Setting</div>
							</button> 
						</div>
						<div className="pt- pl-5 pr-5">
						<div className="flex flex-col gap-1">
							<div className="font-light text-sm text-[#808191]">Your Avatar</div>
							<div className="flex gap-2 items-center">
								<div className="w-[65px] h-[65px]">
									<img src={BASE_URL} width="65px" height="65px"  className="rounded-full object-cover bg-cover"></img>	
								</div>
								<div className="flex flex-col gap-1">
								<div className="flex gap-9">
								<div className="file-input-wrapper">
									<button className="flex justify-center items-center border rounded-xl bg-[#6C5DD3] border-[#6C5DD3] h-[45px] w-[100px] pr-">
										<div className="text-white font-semibold text-sm">Upload New</div>
										<input type="file" className="file-input" onChange={handleFileUpload}/>
									</button>
									</div>
								</div>
								<div className="text-sm font-extralight text-[#808191]">Avatar help your friends recognize you in CyberPong.</div>
								</div>
							</div>
							<div className="border-t-2 border-gray-300"></div>
						</div>
						<div className="flex flex-col gap-[8px] justify-center pt-10 pl-5">
						<div className="text-[#808191]">Update Your Name</div>
						<div className="flex flex-col gap-9">
						<form className="flex  justify-center items-center rounded-xl h-[70px] w-[200px]">
							<input className="rounded-xl w-full h-full border bg-gray-100 border-[3px]  pr-3 pl-3 focus:border-[#6C5DD3] focus:outline-none  text-[#888EFF] text-center" value={formData.username} maxLength={8}
								onChange={(e) => {
									setFormData({ ...formData, username: e.target.value });
								}}>
	
								</input>
						</form>
						<button className="flex justify-center items-center border rounded-xl bg-[#6C5DD3] border-[#6C5DD3] h-[50px] w-[120px]" onClick={handleName}>
							<div className="text-white font-semibold text-sm">Update Profile</div>
						</button>
						</div>
					</div>
					</div>
						</div>
						</div>
					</div>
				</div>
			</div>

				)

			)
		}
		{ twoFA &&
			<div>
				<TwoFa  hide={hide}/>
				<MbTwoFA hide={hide}/>
			</div>
		}
		{ gameSetting &&
			<div>
				<GameSetting  hide={hide}/>
				<MbGameSettings hide={hide}/>
			</div>
		}
		</>
	)
}