import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Chatprofile } from "./Chatprofile";
import { useParams } from "react-router-dom";
import { DkChatConv } from "./DkChatConv";
import { ChatConv } from "./Chatconv";
// import { UserContext } from "../../pages/Profile";
// import { UserContext } from "../../pages/Chat";
// import { Chat   } from "./contexts/chatContext";
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
  profile: MyUserData;
}

interface room {
  id: string,
  name: string,
  type: string,
}
export function DirectMsg({ profile }: MbChatProps) {
  // const {RoomId} = useParams();

  // const Data = useContext(UserContext);
  // console.log('context data-------------------------------------->',Data.user_data);
  const [Rooms, setRooms] = useState([]);
  // console.log('in DirectMsg', profile.user_data);
  const { id } = useParams();
  // let Id;
  // if (id)
  //   Id = parseInt(id.toString());
  // else
  //   Id = undefined;
  console.log(id);

  const updateIsClicked = (index: number) => {
    setRooms((prevRooms: any) => {
      const updatedRooms = prevRooms.map((room: any, i: number) => {
        return { ...room, isClicked: false };
      });
      updatedRooms[index].isClicked = true;
      return updatedRooms;
    });
  };

  const handleProfileClick = (index: number) => {
    updateIsClicked(index);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(
          `http://${import.meta.env.VITE_API_URL}/get-all-rooms`,
          { withCredentials: true }
        );
        // const roomsWithClickState = response.data.map((room) => ({
        //   ...room,
        //   isClicked: false,
        // }));
        setRooms(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // if (Id)
  // console.log(Rooms);
  // console.log('directMsg', id, Rooms.find((room : room) => room.id.toString() === id?.toString()));

  return (
    <>
      <div className="flex flex-col  h-[90vh] fixed w-[40%]">
        {Rooms.map((room: any, index: number) => (
          <Chatprofile
            key={room.id}
            room={room}
          />
        ))}
      </div>
      <div className="bg-red-900">
        {(id && Rooms.find((room: room) => room.id.toString() === id?.toString())) && <ChatConv room={Rooms.find((room: room) => room.id.toString() === id?.toString())} profile={profile} />}
      </div>
    </>
  );
}