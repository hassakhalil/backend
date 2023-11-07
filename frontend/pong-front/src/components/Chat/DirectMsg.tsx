import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Chatprofile } from "./Chatprofile";
import { useParams } from "react-router-dom";
import { DkChatConv } from "./DkChatConv";
import { ChatConv } from "./Chatconv";
import { CreateRoom } from "./CreateRoom";
import { JoinRoom } from "./JoinRoom";
import { GroupSettings } from "./GroupSettings";
import Leave from "/src/assets/Leave.svg"
import { LastMatch } from "../Profile/LastMatch/LastMatch";
import msg from "/src/assets/message.svg"

interface Friend {
  id: number;
  username: string;
  avatar: string;
}

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

interface MbChatProps {
	profile: MyUserData | undefined;
}

interface room {
	id: string,
	name: string,
	type: string,
}

export function DirectMsg({ profile }: MbChatProps) {
	const [remove, setremove] = useState(false);
	const [rooms, setrooms] = React.useState(false);
	const [setting, setSettings] = useState(false);

  const [Rooms, setRooms] = useState([]);
  const [OtherRooms, setOtherRooms] = useState([]);


  const { id } = useParams();
  (id);


  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(
          `http://${import.meta.env.VITE_API_URL}/get-all-rooms`,
          { withCredentials: true }
        );
        setRooms(response.data);
      } catch (error) {
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(
          `http://${import.meta.env.VITE_API_URL}/get-other-rooms`,
          { withCredentials: true }
        );
        setOtherRooms(response.data);
	} catch (error) {
	}
};

fetchData();
}, []);

  return (
    <>
	<div>

	<div className="flex flex-col overflow-y-auto h-[70vh] fixed w-[20%] md:w-[30%] lg:w-[40%]">
		{
			rooms ? 
			<div className="">
				{OtherRooms.map((otheRroom: {id:number, type: string, name: string, avatar: string}, index: number) => (
					<JoinRoom
						avatar={otheRroom.avatar}
						roomName={otheRroom.name}
						RoomType={otheRroom.type}
				/>
				
				))}
			</div>
			:
				<div>
			{Rooms.map((room: any, index: number) => (
				<Chatprofile
				key={room.id}
				room={room}
				hide={() => setSettings(!setting)}
				/>
				))}
			</div>
		}
	</div>

	  <div className="flex flex-col sm:flex-row fixed top-[85%] w-full md:right-[19%] right-[20%] items-center pt-10 items-center sm:gap-6 justify-center pr-16 sm:pr-20 md:pr-0 ">
			<button onClick={() => setremove(!remove)} className="border border-[#6C5DD3] shadow-md bg-[#6C5DD3] lg:w-[200px] w-[140px] h-[50px] rounded-2xl">
				<div className="text-white font-semibold lg:text-sm text-xs">Create New Room Chat</div>
			</button>
			{

				rooms ? <button className="text-sm text-[#6C5DD3]" onClick={() => setrooms(!rooms)}>Back To Your Rooms</button> :
				<button onClick={() => setrooms(!rooms)}>
					<div className="text-sm text-[#6C5DD3]">Join New rooms</div>
				</button>
			}
		</div>
		  </div>
      <div className="w-[70%] sm:w-[80%] md:w-[70%] lg:w-[66%] xl:w-[60%] fixed left-[30%] sm:left-[30%] md:left-[40%] lg:left-[48%] h-[85vh]">
        {
			(id && Rooms.find((room: room) => room.id.toString() === id?.toString())) ? <ChatConv room={Rooms.find((room: room) => room.id.toString() === id?.toString())} profile={profile} />
			: <div className="flex flex-col h-[85vh] items-center justify-center pb-28">
				<img src={msg} className="w-[150px] h-[150px]"></img>
				<div className="text-gray-500">Send private messages to a friend or group</div>
			</div>
		}
      </div>
	  <div>
		{
			remove ?
			<div className="w-screen h-screen blur-background">
				<CreateRoom hide={() => setremove(!remove)}/>
			</div> : null
		}
		{
			setting ?
			<div className="w-screen h-screen">
			 	<GroupSettings hide={() => setSettings(!setting)}/>
			</div> : null
		}

	  </div>

    </>
  );
}