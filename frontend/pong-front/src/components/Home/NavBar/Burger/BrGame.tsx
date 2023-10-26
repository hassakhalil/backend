	import { Link, useParams } from "react-router-dom"
	import React, { useContext } from "react"
	import { MbGameSettings } from "../../../settings/MbGameSetting";
	import { GameSetting } from "../../../settings/GameSettings";
	import { GameMode } from "../../../Profile/GamMode";
	import { MbGameMode } from "../../../Profile/MbGameMode";
	import { useDataContext } from "../../../Profile/States/stateContext";
	import { useEffect } from "react";
	import { useState } from "react";
	import axios from 'axios';
	interface Props {
		buttonColors: { [key: string]: string }
		strokeColor: { [key: string]: string }
		handleClick: (buttonName: string, imgNum: string) => void;
	}



	export function BrGame ( {buttonColors, strokeColor, handleClick}: Props ) {

		const [game, Setgame] = React.useState(false);
		const state = useDataContext();
		let isOnline = 'online'
		console.log('before comparison-----------------------')
		console.log('comparison = ---------------',  (state?.data[state?.data.length - 1].state === isOnline));
		// console.log(state.);
		// let isCurrent = 'ingame';
		
		// const [userData, setUserData] = useState({
		// 	user_data: {
		// 		id: 0,
		// 		username: "",
		// 		avatar: "",
		// 		rating: 0,
		// 		state: "",
		// 		me: false,
		// 		is_two_factor_auth_enabled: false,
		// 	},
		// 	friends: [],
		// 	blocks: [],
		// 	match_history: [],
		// 	achievements: [],
		// 	wins: 0,
		// 	loses: 0,
		// 	draws: 0,
		// 	});
		
		// 	useEffect(() => {
		// 		try {
		// 		const response =  axios.get(`http://${import.meta.env.VITE_API_URL}/profile/me`, {withCredentials: true})
		// 		.then ((response) => {
		// 			setUserData(response.data);
		// 		})
		// 		} catch (error) {
		// 		console.error("Error fetching user data:");
		// 		}
		
		// 	}, []);
		// 	console.log('------------------------------------value', userData.user_data.state === 'ingame');
		// const Mystate = state?.data[state?.data.length - 1] === 'online';
		// console.log("state ===------------------------------" , Mystate);

		return (
			<>

				<div className="pr-8 pl-8">
				<button onClick={() => {handleClick('button4', 'img4'), Setgame(!game)}} style={{ backgroundColor: buttonColors.button4 }} className="flex items-center pl-8 bg-[#6C5DD3] w-full h-[56px] rounded-2xl">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g id="Iconly/Two-tone/Game">
					<g id="Game">
					<path id="Stroke 1" d="M8.84819 12.314V16.059" stroke={strokeColor.img4} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					<path id="Stroke 2" d="M10.7586 14.1868H6.9375"stroke={strokeColor.img4} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					<path id="Stroke 3" d="M15.3665 12.428H15.2595" stroke={strokeColor.img4} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					<path id="Stroke 4" d="M17.18 16.0027H17.073" stroke={strokeColor.img4} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					<path id="Stroke 5" opacity="0.4" d="M8.07227 2V2C8.07227 2.74048 8.68475 3.34076 9.44029 3.34076H10.4968C11.6624 3.34492 12.6065 4.27026 12.6118 5.41266V6.08771" stroke={strokeColor.img4} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					<path id="Stroke 7" fill-rule="evenodd" clip-rule="evenodd" d="M16.4283 21.9625C13.4231 22.0134 10.473 22.0113 7.57275 21.9625C4.3535 21.9625 2 19.6663 2 16.5112V11.8616C2 8.70651 4.3535 6.41029 7.57275 6.41029C10.4889 6.36044 13.4411 6.36148 16.4283 6.41029C19.6476 6.41029 22 8.70755 22 11.8616V16.5112C22 19.6663 19.6476 21.9625 16.4283 21.9625Z"stroke={strokeColor.img4} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</g>
					</g>
				</svg>
					<div className={`pl-8 text-[${strokeColor.img4}] font-semibold text-base`}>Games</div>
				</button>
					</div>
				{game  && ((state?.data[state?.data.length - 1].state !== undefined) && (state?.data[state?.data.length - 1].state === isOnline)) && 
					<div>
						<GameMode hide={() => {}}/>
						<MbGameMode  hide={() => {}}/>
					</div>

				}

			</>
		)
	}