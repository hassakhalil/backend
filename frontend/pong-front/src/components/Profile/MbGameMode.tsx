import { useEffect, useState } from "react"
import { GameCard } from "../Home/GameCard/GameCard";
import rmv from "/src/assets/remove.svg"
import React from "react";
import axios from "axios";

interface Props {
	hide: () => void
}

export function MbGameMode ( {hide}: Props ) {
	const [remove, Setremove] = useState(false);

	const [userData, setUserData] = useState({
	user_data: {
		id: 0,
		username: "",
		avatar: "",
		rating: 0,
		me: false,
		is_two_factor_auth_enabled: false,
	},
	friends: [],
	blocks: [],
	match_history: [],
	achievements: [],
	wins: 0,
	loses: 0,
	draws: 0,
	});

	useEffect(() => {
	const fetchData = async () => {
		try {
		const response = await axios.get(`http://${import.meta.env.VITE_API_URL}/profile/me`, {withCredentials: true})
		setUserData(response.data);
		} catch (error) {
		console.error("Error fetching user data:");
		}
	};

	fetchData();
	}, []);

	return (
		<>
			{
				remove ? null : (
					<div className="blur-background z block lg:hidden">
						<div className="centered-component sm:pt-28 pt-32">
							<div className="flex flex-col w-screen h-screen bg-white shadow-lg pt-10 rounded-custom pb-5">
								<div className="flex items-center justify-between px-10 pt-5">
									<div className="flex items-center justify-center text-xl p-5 pt-5 text-[#11142D] font-bold">Game Mode</div>
									<button
										onClick={() => {Setremove(!remove); hide();}}
										className="flex items-center justify-center border border-white rounded-full w-12 h-12 shadow-xl"
									>
										<img src={rmv} alt="Remove"/>
									</button>
								</div>
							<div className="flex flex-col overflow-y-auto pt-3">
								<GameCard TableType="AI Table" GameType="5" imgPath="/src/assets/Bot_Img.png" user_id={userData.user_data.id}/>
								<GameCard TableType="world Table" GameType="2" imgPath="/src/assets/3_win_game.png" user_id={userData.user_data.id}/>
								<GameCard TableType="friend Table" GameType="1" imgPath="/src/assets/7_win_game.png" user_id={userData.user_data.id}/>
							</div>
							</div>
						</div>
					</div>
				)	
			}
		</>
	)
}