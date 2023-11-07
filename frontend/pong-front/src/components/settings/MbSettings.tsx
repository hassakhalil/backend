import rmv from "/src/assets/remove.svg"
import avatar from "/src/assets/ahamdy.jpg"
import React, { useContext, useEffect, useState } from "react";
import { MbTwoFA } from "./MbTwoFA";
import { GameSetting } from "./GameSettings";
import { MbGameSettings } from "./MbGameSetting";
import { TwoFa } from "./TwoFA";
import axios from "axios";	
import { useNavigate } from "react-router-dom";
import { MyContext, UserContext } from "../../pages/Profile";
import { useProfilecontext } from "../../ProfileContext";
import { useDataContext } from "../Profile/States/stateContext";

interface Props {
	hide: () => void;
}

export function MbSettings ( {hide}: Props ) {

	const profile = useProfilecontext()
	
  
  const [remove, SetRemove] = React.useState(false);
  const [twoFA, setTwoFa] = useState(false);
  const [gameSetting, setgameSetting] = React.useState(false);
  const [formData, setFormData] = useState<{username: string}>({
	  username: '',
  });
  let defualt : string | undefined = profile?.data?.user_data?.avatar;
	const [BASE_URL, setBase] = useState(defualt);

//   const profile = useProfilecontext()
	
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
			profile?.setData((prevUserData) => ({
				...prevUserData,
				user_data: {
					...prevUserData.user_data,
					avatar: response.data,
				},
			}));
			setBase(`${response.data}`);

		  })
		  }
		  catch(error) {
		  }
	  }


  const handleName = async () => {
	  try {
		  const response = await axios.post(`http://${import.meta.env.VITE_API_URL}/set-username`, formData, {withCredentials: true}).then (function (response) {
			  profile?.setData((prevUserData) => ({
				  ...prevUserData,
				  user_data: {
					...prevUserData.user_data,
					username: response.data,
				  },
				}));
		  });
	  }
	  catch(error) {
	  }
  }
	

	return (
		<>
		{
			remove ? null : (
				<div className="blur-background z bg-white sm:hidden">
				<div className="centered-component pt-32">
				<div className="flex items-center justify-between pr-10">
				<div className="text-[#11142D] font-semibold text-lg p-10">Account Settings</div>
					<button onClick={() => {SetRemove(!remove); hide();}} className="flex items-center justify-center border border-white rounded-full w-[48px] h-[48px] lg:w-[50px] h-[50px] shadow-xl">
						<img src={rmv}></img>
					</button>
				</div>
				<div className="flex items-center justify-around gap-[10px] pt-5 p-10 pt-0">
				<button  className={`flex items-center justify-center border  border-[2px] w-[120px] h-[35px] rounded-xl bg-[#6C5DD3] border-[#6C5DD3]`} >
					<div className={`text-white font-semibold`}>Your Profile</div>
				</button> 
				<button className={`flex items-center justify-center border border-[2px] bg-white border-[#FF754C] w-[100px] h-[35px] rounded-xl`} onClick={() => {setTwoFa(!twoFA); SetRemove(!remove)}}>
					<div className={`font-semibold text-balck`}>2FA</div>
				</button>
				<button className={`flex items-center justify-center border  border-[2px] w-[120px] h-[35px] rounded-xl bg-white border-[#FF754C]`} onClick={() => {setgameSetting(!gameSetting), SetRemove(!remove)}}>
					<div className={`text-black font-semibold`}>Game Setting</div>
				</button>
				</div>
				<div className="px-10">
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
						<div className="flex flex-col justify-center pt-5 pl-5">
						<div className="text-[#808191]">Update Your Name</div>
						<div className="flex flex-col gap-3">
						<form className="flex  justify-center items-center rounded-xl h-[70px] w-[200px]"
						onSubmit={(e) => {
							e.preventDefault();
							handleName();
						}}
						>
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