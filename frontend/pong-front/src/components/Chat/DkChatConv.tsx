
import rmv from "/src/assets/remove.svg"
import React from "react";
import { Msg } from "./Msg";
import { useEffect } from "react";
import { MsgMe } from "./MsgMe";
import { useContext } from "react";
import { ChatSocketContext } from "./contexts/chatContext";

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

export function DkChatConv({ prop_room, members, profile, messages, setMessages }: DkChatConvProps) {
	// console.log('dd');
	const [remove, SetRemove] = React.useState(false);
	const [message, setMessage] = React.useState('');
	const room = prop_room;

	// console.log("old msg "Old_Messages);
	// const [messages, SetMessages] = useState(Old_Messages);
	// const [rerender, setrerender] = useState(1);

	// console.log("initial messages", Old_Messages);
	const socket = useContext(ChatSocketContext);
	// let _Room : joinRoomDto = {
	// 	roomId: room.id,
	// }
	let joinRoom: joinRoomDto = {
		roomId: room.id.toString()
	};
	console.log("--------------------------------", prop_room, members)
	socket.emit('join-room', joinRoom);

	useEffect(() => {
		socket.on('chat', (data: ChatDto) => {

			// console.log(data.roomId === prop_room.id.toString())
			// if (prop_room.id === data.roomId.toString())
			// {
				console.log('chatData', data.message);
				console.log('chatfd', data.roomId);
				const _data = {
					user_id: data.userId,
					message: data.message,
					date: new Date(),
				};
				// if (room.id === prop_room.id)
				setMessages((old) => [...old, _data])
				// memoizedRef.current = [...memoizedRef.current, _data];
				// console.log('  : ', memoizedRef.current);
				// setrerender(Math.random());
				console.log('prop_room');
			// }
			// }
		});
		// console.log('wa7ed akhor');

		return () => {
			socket.off('chat');
		};
	}, []);
	// }, [rerender]);

	// const new_messages = useRef(Old_Messages);
	// const memoizedRef = useMemo(() => new_messages, [room, new_messages, Old_Messages]);


	console.log('joined a socket');



	const handleSubmit = (e) => {
		e.preventDefault();
		// }
		let Data = {
			userId: profile.user_data.id,
			message: message,
			date: new Date(),
		};
		let chat: ChatDto = {
			roomId: room.id.toString(),
			userId: profile.user_data.id,
			message: message,
		}
		socket.emit('chat', chat);
		// memoizedRef.current = [...memoizedRef.current, Data];
		console.log('new msg update ref');
		// const updatedMessages = [...messages, {
		// 	user_id: profile.user_data.id,
		// 	message: message,
		// 	date: new Date(),
		// }];	
		// SetMessages(updatedMessages);
		console.log("handleSubmit");
		console.log('payload', chat);
		// setrerender('');
		setMessage('');
		// setrerender(Math.random());

	}
	console.log(profile);

	return (
		<>

			{!remove && (
				<div className="w-full absolute lg:w-8/12 bg-white lg:pl-32 xl:pl-0 top-0 right-0 mobile-nav-bar sm:hidden lg:block">

					<div className="pl-16 z px-8 h-[90vh] sm:hidden mobile-nav-bar lg:block">
						<div className="w-full h-full flex flex-col justify-around">

							<div className="text-white text-xl">
								<div className="flex items-center justify-between lg:pr-10 lg:pb-10">
									<div className="text-[#1B1D21] md:text-2xl">{room.name || members.find(member => member.username !== profile.user_data.username).username}</div>
									<button
										onClick={() => SetRemove(!remove)}
										className="flex items-center justify-center border border-white rounded-full w-12 h-12 shadow-xl lg:hidden"
									>
										<img src={rmv} alt="Remove" />
									</button>
								</div>
							</div>
							<div className="overflow-y-auto">
								{messages.map((message) => {
									// console.log(message.user_id);
									const friend = profile.friends.find(f => f.id === message.user_id);
									if (friend) {
										// console.log('Found friend:', friend);
										return (<Msg
											profile={friend.avatar}
											name={friend.username}
											msg={message.message}
										/>);
									} else if (message.message) {
										1
										// console.log("me");
										return (<MsgMe
											profile={profile.user_data.avatar}
											name={profile.user_data.username}
											msg={message.message}
										/>);
									}
								})}

							</div>
							<div className="flex items-center justify-center">

								<div className="flex flex-row justify-center w-[50%]">
									<form onSubmit={handleSubmit} className="w-[100%] h-[100px]">
										<input
											className="w-full px-4 bg-gray-100 h-[50px] focus:outline-none rounded-custom focus:border-[#6C5DD3] text-[#808191]"
											placeholder="Write Something"
											//   onChange={(e) => setMessage( ...message, message: e.target.value)}
											onChange={(e) => setMessage(e.target.value)}
											value={message}
											name="message"
										/>
									</form>

									<button onClick={handleSubmit}
										className="flex justify-center items-center border rounded-xl bg-[#6C5DD3] border-[#6C5DD3] h-[45px] w-[100px]">
										<div className="text-white font-semibold lg:text-sm">send</div>
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

