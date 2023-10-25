
import React, { useEffect, useState } from "react";
import { DkChatConv } from "./DkChatConv";
import axios from "axios";
interface Props {
  room: any;
  profile: any;
  isClicked: boolean;
  onClick: () => void;
}

export function Chatprofile({ room, profile, isClicked, onClick }: Props) {
  const [RoomMembers, setRoomMembers] = useState();
  const [msg, setMsg] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(
          `http://${import.meta.env.VITE_API_UR}/get-room-members/${room.id}`,
          { withCredentials: true }
        );
        setRoomMembers(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      try {
        let response = await axios.get(
          `http://${import.meta.env.VITE_API_UR}/get-room-messages/${room.id}`,
          { withCredentials: true }
        );
        setMsg(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchData();
  }, [isClicked]); 

  console.log(
    room.name || (RoomMembers ? RoomMembers.find((member) => member.id !== profile.id).username : "")
  );

  return (
    <>
      <div>
        <button
          onClick={onClick}
          className={`flex items-center w-full  border border-white rounded-2xl h-[80px] pl-5 ${
            isClicked ? "bg-[#6C5DD3]" : ""
          } `}
        >
          {isClicked && (
            <>
              <DkChatConv prop_room={room} members={RoomMembers} profile={profile} Old_Messages={msg} />
            </>
          )}
        </button>
      </div>
    </>
  );
}
