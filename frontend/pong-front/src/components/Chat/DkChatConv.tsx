
import rmv from "/src/assets/remove.svg"
import React from "react";
import { Msg } from "./Msg";
import { useEffect } from "react";
import { MsgMe } from "./MsgMe";
import { useContext } from "react";
import { ChatSocketContext } from "./contexts/chatContext";
import Leave from "/src/assets/Leave.svg"
import axios from "axios";
import send from "/src/assets/Send.svg"


interface DkChatConvProps {
	prop_room: any;
	profile: any
	members: any
	messages: any
	setMessages: any
	// Update the type accordingly
}

interface joinRoomDto {
	roomId: string
}

interface ChatDto {
	roomId: string
	userId: string
	message: string
}

const LeaveRoom = (id: number) => {
	try {
	  let response =  axios.delete(
		`http://${import.meta.env.VITE_API_URL}/leave-room/${id}`,
		{ withCredentials: true }
	  )
	  .then ((response) => {("leave room")})
  } catch (error) {
  }
}

export function DkChatConv({ prop_room, members, profile, messages, setMessages }: DkChatConvProps) {
	// ('dd');
	const [remove, SetRemove] = React.useState(false);
	const [message, setMessage] = React.useState('');
	const room = prop_room;

	const socket = useContext(ChatSocketContext);

	let joinRoom: joinRoomDto = {
		roomId: room.id.toString()
	};
	socket.emit('join-room', joinRoom);

	useEffect(() => {
		// console.log('new room')
		socket.on('chat', (data: ChatDto) => {

				const _data = {
					user_id: data.userId,
					message: data.message,
					date: new Date(),
				};
				setMessages((old) => [...old, _data])
			});
			
			return () => {
			// socket.emit('leave-room',joinRoom)
			socket.off('chat');
		};
	}, []);
	const handleSubmit = (e) => {
		e.preventDefault();

		let chat: ChatDto = {
			roomId: room.id.toString(),
			userId: profile.user_data.id,
			message: message,
		}
		socket.emit('chat', chat);

		setMessage('');
	}
	(profile);

	return (
		<>

			{!remove && (
				<div className="w-full sm:w-[100%]" >

					<div className="pl-16 z px-8 h-[90vh]">
						<div className="w-full h-full sm:w-[80%] flex flex-col justify-around">

							<div className="text-white text-xl">
								<div className="flex items-center justify-between lg:pr-10 lg:pb-10">
									<div className="text-[#1B1D21]  md:text-2xl">{room.name || members.find(member => member.username !== profile.user_data.username).username}</div>
									{
										room?.type !== "direct" ? 
										<button className="flex gap-[4px]" onClick={() => LeaveRoom(room.id)}>
										<div>
										<img className="w-[24px] h-[24px]" src={Leave}>
										</img>
										</div>
										<div className="text-sm text-[#808191]">Leave Room</div>
										</button> : null
									}
								</div>
							</div>
							<div className="overflow-y-auto">
								{messages.map((message : any, index : number) => {
									const friend = profile.friends.find(f => f.id === message.user_id);
									if (friend) {
										return (<Msg key={`friend-${index}`}
											profile={friend.avatar}
											name={friend.username}
											msg={message.message}
											/>);
									} else if (message.message) {

										return (<MsgMe key={`me-${index}`}
											profile={profile.user_data.avatar}
											name={profile.user_data.username}
											msg={message.message}
										/>);
									}
								})}

							</div>
							<div className="flex items-center justify-center">

								<div className="flex flex-row justify-center w-[100%] lg:w-[60%]">
									<form onSubmit={handleSubmit} className="w-[100%] h-[100px]">
										<input
											className="w-full px-4 bg-gray-100 h-[50px] focus:outline-none rounded-tl-xl rounded-bl-xl focus:border-[#6C5DD3] text-[#808191]"
											placeholder="Write Something"
											onChange={(e) => setMessage(e.target.value)}
											value={message}
											name="message"
										/>
									</form>

									<button onClick={handleSubmit}
										className="flex justify-center items-center border rounded-br-xl rounded-tr-xl bg-[#6C5DD3] border-[#6C5DD3] h-[50px] w-[100px]">
										{/* <div className="text-white font-semibold lg:text-sm">send</div> */}
										<img src={send} className="w-[30px] h-[30px]"></img>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

