import { MbChat } from "../components/Chat/MbChat";
import { NavBar } from "../components/Home/NavBar/NavBar";
import { useContext, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Profile";

export function Chat () {

	const data = useContext(UserContext);

	// console.log(data?.userData?.user_data);

	// const navigate = useNavigate();
	// const [userData, setUserData] = React.useState({
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


	// useEffect(() => {
	// 	// const fetchData = async () => {
	// 	  try {
	// 		const response = axios.get(`http://backend:3000/profile/me`, { withCredentials: true })
	// 		.then ((response) => {
	// 			console.log(response.data);
	// 			setUserData(response.data);
	// 		})
	// 	  } catch (error) {
	// 		console.error("Error fetching user data:");
	// 	  }
	// 	// };
	
	// 	// fetchData();
	//   }, []);


	return (
		<>
			<div>
				<NavBar username={data?.userData?.user_data?.username} avatar={data?.userData?.user_data?.avatar} id={data?.userData?.user_data?.id}/>
				<MbChat/>
			</div>
		</>
	)
}