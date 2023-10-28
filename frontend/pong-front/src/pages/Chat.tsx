import { MbChat } from "../components/Chat/MbChat";
import { NavBar } from "../components/Home/NavBar/NavBar";
import { useContext, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createContext } from "react";
import { useState } from "react";
import { useProfilecontext } from "../ProfileContext";


interface MyUserData {
  user_data: {
    id: number;
    username: string;
    me: boolean;
    is_two_factor_auth_enabled: boolean;
  };
  friends: any[]; // Replace 'any' with the appropriate type
  blocks: any[]; // Replace 'any' with the appropriate type
  match_history: any[]; // Replace 'any' with the appropriate type
  achievements: any[]; // Replace 'any' with the appropriate type
  wins: number;
  loses: number;
  draws: number;
}


export function Chat () {


	// const [RoomMembers, setRoomMembers] = useState();
	// const { id } = useParams();
	// console.log(id);
	const profile = useProfilecontext();
	// const [profile, setProfile] = useState<MyUserData>(
	// 	{
	// 		user_data: {
	// 		id: 0,
	// 		username: '',
	// 		me: false,
	// 		is_two_factor_auth_enabled: false,
	// 	  },
	// 	  friends: [],
	// 	  blocks: [],
	// 	  match_history: [],
	// 	  achievements: [],
	// 	  wins: 0,
	// 	  loses: 0,
	// 	  draws: 0,
	// }
	// );
  
	// useEffect(() => {
	// //   const fetchData = async () => {
	// 	try {
	// 	  let response =  axios.get(
	// 		`http://${import.meta.env.VITE_API_URL}/profile/me`,
	// 		{ withCredentials: true }
	// 	  ).then ((response) => {
	// 		  setProfile(response.data);
	// 			// console.log('profile', profile?.user_data);
	// 	  })
	// 	} catch (error) {
	// 	  console.error("Error fetching user data:", error);
	// 	}
	//   };
  
	//   fetchData();
	// }, []); 

	return (
		<>
		    {/* <UserContext.Provider value={{ userData,setUserData}}> */}
			{/* <div> */}
				{/* <NavBar username={profile?.user_data?.username} avatar={profile?.user_data?.avatar}/> */}
				<MbChat profile={profile.data}/>
			{/* </div> */}
			{/* </UserContext.Provider> */}
		</>
	)
}