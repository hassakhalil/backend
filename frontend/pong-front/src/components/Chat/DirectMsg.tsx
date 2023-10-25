import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chatprofile } from "./Chatprofile";

interface Friend {
  id: number;
  username: string;
  avatar: string;
}

export function DirectMsg() {
  const [Rooms, setRooms] = useState([]);
  const [userData, setUserData] = useState({
    user_data: {
      id: 0,
      username: "",
      avatar: "",
      rating: 0,
      me: false,
      is_two_factor_auth_enabled: false,
    },
    friends: [],
    match_history: [],
    achievements: [],
    wins: 0,
    loses: 0,
    draws: 0,
  });

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

  	console.log('directMsg');
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(
          `http://${import.meta.env.VITE_API_UR}/get-all-rooms`,
          { withCredentials: true }
        );
        const roomsWithClickState = response.data.map((room) => ({
          ...room,
          isClicked: false,
        }));
        setRooms(roomsWithClickState);
        response = await axios.get(`http://${import.meta.env.VITE_API_UR}/profile/me`, {
          withCredentials: true,
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col h-[90vh] fixed w-full">
        {Rooms.map((room: any, index: number) => (
			<Chatprofile
            key={room.id}
            room={room}
            profile={userData}
            isClicked={room.isClicked}
            onClick={() => handleProfileClick(index)}
          />
        ))}
      </div>
    </>
  );
}