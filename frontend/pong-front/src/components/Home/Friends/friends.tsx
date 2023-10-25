import { FriendStatus } from "./FriendsStatus"
import React from "react"
import rmv from "/src/assets/remove.svg"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Avatar } from "../NavBar/Avatar";
import { Navigate, useNavigate } from "react-router-dom";

interface Props {
	ChooseFriend: () => void;
}

export function Friends ( ) {
	const [remove, Setremove] = React.useState(false);
	const navigate = useNavigate();

	// interface UserData {
	// 	id: number;
	// 	username: string;
	// 	avatar: string;
	// 	rating: number;
	// 	me: boolean;
	// 	is_two_factor_auth_enabled: boolean;
	//   }
	  
	//   interface Friend {
	// 	id: number;
	// 	username: string;
	// 	avatar: string;
	//   }
	  
	//   interface UserState {
	// 	user_data: UserData;
	// 	friends: Friend[];
	// 	match_history: any[];
	// 	achievements: any[];
	// 	wins: number;
	// 	loses: number;
	// 	draws: number;
	//   }
	  
	//   const [userData, setUserData] = useState<UserState>({
	// 	user_data: {
	// 	  id: 0,
	// 	  username: "",
	// 	  avatar: "",
	// 	  rating: 0,
	// 	  me: false,
	// 	  is_two_factor_auth_enabled: false,
	// 	},
	// 	friends: [],
	// 	match_history: [],
	// 	achievements: [],
	// 	wins: 0,
	// 	loses: 0,
	// 	draws: 0,
	//   });

	  useEffect(() => {
		  try {
			const response =  axios.get(`http://${import.meta.env.VITE_API_URL}/profile/me`, { withCredentials: true })
			.then ((response) => {
				console.log("h2");

			})
			// setUserData(response.data);

		} catch (error) {
			console.error("Error fetching user data:");
			// navigate("/error");
		}
	  }, []);

    return (
        <>
		{
			remove ? null :
			<div className="blur-background z">
					<div className="centered-component"></div>
				<div className="flex items-center justify-center pt-28">
					<div className="flex flex-col border bg-[#FFF] rounded-custom lg:h-[320px] lg:w-[800px] w-screen h-screen pt-10">
						<div className="p-10 px-4 lg:px-10 lg:pt-4 flex items-center justify-between">
							<div className="text-blue-900 font-poppins font-semibold leading-normal tracking-wider lg:text-2xl text-lg">Invite friend to play with </div>
							<button
								onClick={() => Setremove(!remove)}
								className="flex items-center shadow-lg justify-center border border-white rounded-full w-12 h-12"
							>
								<img src={rmv} alt="Remove" />
							</button>
						</div>
						<div className="flex flex-col lg:flex-row items-center justify-center lg:overflow-x-auto overflow-y-auto gap-[15px] lg:gap-0">
							{userData.friends.map((friend, index: number) => (
								<div key={index}>
									<FriendStatus avatar={friend.avatar} name={friend.username} state="offline"/>
								</div>
							))
							}
						</div>
					</div>
				</div>
				</div>
		}	
        </>
    )
}