
import React, { useEffect, useState } from "react";
import { DkChatConv } from "./DkChatConv";
import axios from "axios";
import { Link, NavLink, useParams } from "react-router-dom";

// interface MyUserData {
//   user_data: {
//     id: 0,
//     username: '',
//     me: false,
//     is_two_factor_auth_enabled: false,
//   },
//   friends: [],
//   blocks: [],
//   match_history: [],
//   achievements: [],
//   wins: 0,
//   loses: 0,
//   draws: 0,
// }


interface Props {
  room: any;
}

export function Chatprofile({ room }: Props) {
  // const [RoomMembers, setRoomMembers] = useState();
  // const [msg, setMsg] = useState();
  // const {roomId} = useParams

  // console.log('chatProfile' , room.)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       let response = await axios.get(
  //         `http://localhost:3000/get-room-members/${room.id}`,
  //         { withCredentials: true }
  //       );
  //       setRoomMembers(response.data);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //     try {
  //       let response = await axios.get(
  //         `http://localhost:3000/get-room-messages/${room.id}`,
  //         { withCredentials: true }
  //       );
  //       setMsg(response.data);
  //     } catch (error) {
  //       console.error("Error fetching messages:", error);
  //     }
  //   };

  //   fetchData();
  // }, [isClicked]);

  // console.log(
  //   room.name || (RoomMembers ? RoomMembers.find((member) => member.id !== profile.user_data.id).username : "")
  // );



  return (
    <>

      < NavLink to={`/Chat/${room.id}`} className={({ isActive }) => isActive ? "flex items-center w-full  border border-white rounded-2xl h-[80px] pl-5 bg-[#11142D]" : "flex items-center w-full  border border-white rounded-2xl h-[80px] pl-5"}>
        {
          ({ isActive }) => (
            <>
              <div className="relative flex items-center justify-center border border-[2px] border-[#0049C6] rounded-full w-[48px] h-[48px]">
                <img src={'/Users/ahamdy/front_v5/pong-front/src/assets/hkhalil.jpg'} className="bbc rounded-full w-[40px] h-[40px]" alt="Avatar" />
                <div className="absolute top-0 mt-[-3px] lg:mt-[-10px] lg:mr-[-10px] right-0 mr-[-5px]">
                </div>
              </div>
              <div>
                <div className={`pl-3 lg:text-lg ${isActive ? 'text-white' : 'text-[#11142D]'}`}>
                  room</div>
                <div className={`pl-3 Inter text-sm lg:text-sm font-meduim ${isActive ? 'text-white' : 'text-[#808191CC]'}`}>online</div>
              </div>
            </>
          )
        }
      </NavLink>

    </>
    // </>
  );
}

{/* <div>
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
  </div> */}