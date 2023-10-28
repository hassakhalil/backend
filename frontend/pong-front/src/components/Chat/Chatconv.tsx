import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Chatprofile } from "./Chatprofile";
import { useParams } from "react-router-dom";
import { DkChatConv } from "./DkChatConv";


interface MyUserData {
	user_data: {
		id: 0,
		username: '',
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
}

interface ChatConvProps {
	room: any,
	profile: MyUserData,
}

export function ChatConv({ room, profile }: ChatConvProps) {
	const [roomMembers, setRoomMembers] = useState([]);
	const [msg, setMsg] = useState([]);
	const { id } = useParams();

	console.log('ChatConv', id, 'room', room, 'profile', profile);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const responseMembers = await axios.get(
					`http://${import.meta.env.VITE_API_URL}/get-room-members/${id}`,
					{ withCredentials: true }
				);
				setRoomMembers(responseMembers.data);
			} catch (error) {
				console.error("Error fetching room members:", error);
			}

			try {
				const responseMsg = await axios.get(
					`http://${import.meta.env.VITE_API_URL}/get-room-messages/${id}`,
					{ withCredentials: true }
				);
				setMsg(responseMsg.data);
			} catch (error) {
				console.error("Error fetching room messages:", error);
			}
		};

		fetchData();
	}, [id]);

	console.log('room members', msg);

	return (
		<>
			{roomMembers && (
				<div className="">

				<DkChatConv
					prop_room={room}
					members={roomMembers}
					profile={profile}
					messages={msg}
					setMessages={setMsg}
					/>
				</div>
			)}
		</>
	);
}
