import React, { useContext } from "react";
import rmv from "/src/assets/remove.svg"
import { useState } from "react";
import group from "/src/assets/Group.svg"
import mobile from "/src/assets/mobiledow.svg"
import rec from "/src/assets/rectangle.svg"
import { GameSetting } from "./GameSettings";
import { MbSettings } from "./MbSettings";
import { DkSettings } from "./DkSettings";
import { MbGameSettings } from "./MbGameSetting";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { UserContext } from "../../pages/Profile";
import { useProfilecontext } from "../../ProfileContext";


interface Props {
	hide: () => void;
}

export function MbTwoFA ( {hide}: Props) {
    const [remove, SetRemove] = React.useState(false);
	const [profile, setProfile] = useState(false);
	const [gameSetting, setgameSetting] = React.useState(false);
	const [generate, setGenerate] = React.useState(false);
	const [data, setData] = useState('');
	const [code, setCode] = useState({
		code: ''
	});
	const [error, Seterror] = useState(false);
	const [sent, Setsent] = useState(false);
	const Mydata = useProfilecontext();

	const handle2faOn = async () => {
		try {
			const response = await axios.post(`http://${import.meta.env.VITE_API_URL}/2fa/turn-on`, code, { withCredentials: true })
			.then (function (response) {
				Setsent(true);
				Mydata?.setData((prevUserData) => ({
					...prevUserData,
					user_data: {
					  ...prevUserData.user_data,
					  is_two_factor_auth_enabled: true as any,
					},
				  }));
			});
		} catch (error) {
			Seterror(true);
			Setsent(false);
			}
		};

		const handle2faOff = async () => {
			try {
				const response = await axios.post(`http://${import.meta.env.VITE_API_URL}/2fa/turn-off`, code, { withCredentials: true })
				.then (function (response) {
					Setsent(true);
					Mydata?.setData((prevUserData) => ({
						...prevUserData,
						user_data: {
						  ...prevUserData.user_data,
						  is_two_factor_auth_enabled: false as any,
						},
					  }));
				});
			} catch (error) {
				Seterror(true);
				Setsent(false);
				}
			};

		

		const fetchData = async () => {
		try {
			const response = await axios.get(`http://${import.meta.env.VITE_API_URL}/2fa/generate-qrcode`, {
				withCredentials: true,
				responseType: 'arraybuffer',
			});

			const base64 = btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
			setData(`data:image/png;base64,${base64}`);
		} catch (error) {
		}
		};

	
	const handleqr = () => {
		setGenerate(!generate);
		fetchData();
	}
	
	const handleOn = () => {
		handle2faOn();
	}

	const handleOff = () => {
		handle2faOff();
	}


	
	  useEffect(() => {
		  try {
			const response =  axios.get(`http://${import.meta.env.VITE_API_URL}/profile/me`, { withCredentials: true })
			.then((respnse) => {
			})
		  } catch (error) {
		  }
	  }, []);


	return (
		<>
			{
				remove ? null : (
						<div className="blur-background z bg-white sm:hidden">
					<div className="centered-component pt-28">
							<div className="flex-col">
								<div className="flex justify-between">
								<div className="text-[#11142D] font-semibold text-lg p-10">Account Settings</div>
									<div className="pt-8 pr-[37px]">
										<button onClick={() => {SetRemove(!remove); hide()}} className="flex items-center justify-center border border-white rounded-full w-[48px] h-[48px] lg:w-[50px] h-[50px] shadow-xl">
											<img src={rmv}></img>
										</button>
									</div>
								</div>
								<div className="flex items-center justify-around gap-[10px] pt-5 p-10 pt-0">
								<button  className={`flex items-center justify-center border  border-[2px] w-[120px] h-[35px] rounded-xl bg-white border-[#FF754C]`} onClick={() => {setProfile(!profile), SetRemove(!remove)}}>
										<div className={`"text-black font-semibold`}>Your Profile</div>
									</button> 
									<button className={`flex bg-[#6C5DD3] border-[#6C5DD3] items-center justify-center border border-[2px] w-[100px] h-[35px] rounded-xl`}>
										<div className={`font-semibold text-white`}>2FA</div>
									</button>
									<button  className={`flex items-center justify-center border  border-[2px] w-[120px] h-[35px] rounded-xl bg-white border-[#FF754C]`} onClick={() => {setgameSetting(!gameSetting) , SetRemove(!remove)}}>
										<div className={`text-black font-semibold`}>Game setting</div>
									</button>
								</div>
								<div className="scrollable-div-ver7">
								<div className="flex items-center justify-around">
									<div className="flex-col items-center">
										<div className="flex flex-col items-center pt-5 border border-[3px] border-[#BACCFD] rounded-custom w-[240px] h-[257px]">
											<div className="text-[#BACCFD]">Install Google Auth</div>
											<div className="pt-5">
												<img src={group}></img>
											</div>
											<div className="pt-5">
												<img src={mobile}></img>
											</div>
										</div>
									</div>
								</div>
								<div className="relative flex flex-col items-center justify-center pt-5">
								<button className="flex items-center justify-center border rounded-xl bg-[#BACCFD] w-[220px] h-[220px]" onClick={handleqr}>
									{
										generate ?
										<>
										<div>
											<img src={data} alt="QR Code" width="100%" height="100%">
											</img>
										</div>
										</>
										 :
										<>
										<div className="flex flex-col items-center justify-center w-[150px] h-[150px]">
											<div className="text-[#888EFF] font-extrabold text-lg z">Click to generate your 2FA QR code</div>
											<div className="font-extrabold text-8xl text-[#888EFF] z">?</div>
										</div>
										<div className="absolute inset-0 flex items-center justify-center">
											<div className="path3 blur-sm w-[150px] h-[150px]"></div>
										</div>
										</>
									}
								</button>
								</div>
								<div className="flex flex-col justify-center items-center pt-5 pb-10">
										<div id="last" className="flex flex-col items-center border border-[3px] border-[#BACCFD] rounded-custom w-[240px] h-[257px] pt-5">
											<div className="text-[#888EFF] font-bold pb-10">Verify your device</div>
											<div className="text-[#888EFF] font-light pb-1">Enter your code</div>
											<form className="flex  justify-center items-center rounded-xl h-[30px] w-[160px]"
											onSubmit={(e) => {
												e.preventDefault();
											}}

											>
												<input className="flex rounded-xl text-[#888EFF] w-full h-full border bg-gray-100 border-[3px]  pr-3 pl-3 focus:border-[#6C5DD3] focus:outline-none text-center"
												value={code.code}
												onChange={(e) => {
													setCode({ ...code, code: e.target.value });
												}}
												></input>
											</form>
											{
												error ? 
												<div className="pt-1">
													<div className="border bg-[#E9DCE5] rounded-lg w-[170px] h-[25px]  flex gap-1 items-center justify-center">
														<div className="text-xs font-semibold text-[#6C5DD3]">Invalid code</div>
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
												<div className="pt-1">
													<div className="border bg-[#E9DCE5] rounded-lg w-[170px] h-[25px]  flex gap-1 items-center justify-center">
														<div className="text-xs font-semibold text-[#6C5DD3]">Code Sent</div>
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
											<div className="pt-5">
											
											{
												Mydata?.data?.user_data?.is_two_factor_auth_enabled ?
													<button className={`flex justify-center items-center border rounded-xl bg-gray-100 border-gray-100 h-[45px] w-[130px]`} onClick={handleOff}>
														<div className="text-[#11142D]  font-semibold lg:text-sm">Disable 2FA</div>
													</button>
												: null
											}
											{
												Mydata?.data?.user_data?.is_two_factor_auth_enabled ? null :
													<button className="flex justify-center items-center border rounded-xl bg-[#6C5DD3] border-[#6C5DD3] h-[45px] w-[130px]" onClick={handleOn}>
															<div className="text-white font-semibold lg:text-sm">Enable 2FA</div>
													</button>

											}
											</div>
										</div>
									</div>
									</div>
						</div>
						</div>

					</div>
						
				)
			}
			{ profile &&
			<div>
				<DkSettings hide={hide}/>
				<MbSettings hide={hide}/>
			</div>
		}
		{ gameSetting &&
			<div>
				<GameSetting hide={hide}/>
				<MbGameSettings hide={hide}/>
			</div>
		}
		</>
	)
}