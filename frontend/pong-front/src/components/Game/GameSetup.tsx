import { Game } from "../../pages/Game";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SocketProvider } from "../../game/contexts/SocketContext";
import axios from "axios";

interface customParam
{
  user_id : number;
  gameDuration: string;
}

export const GameSetup  = () =>
{
  const {state} = useLocation();
  let customParam;
  // const [userData, setUserData] = useState({
  //   user_data: {
  //       id: 0,
  //       username: "",
  //       avatar: "",
  //       rating: 0,
  //       me: false,
  //       is_two_factor_auth_enabled: false,
  //   },
  //   friends: [],
  //   match_history: [],
  //   achievements: [],
  //   wins: 0,
  //   loses: 0,
  //   draws: 0,
  //   });

  //   useEffect(() => {
  //   const fetchData = async () => {
  //       try {
  //       // const response = await axios.get(`http://${import.meta.env.VITE_API_UR}/profile/${username}`, { withCredentials: true });
  //       const response = await axios.get(`http://${import.meta.env.VITE_API_UR}/profile/me`, {withCredentials: true})
  //       setUserData(response.data);
  //       } catch (error) {
  //       console.error("Error fetching user data:");
  //       }
  //   };

  //   fetchData();
  //   }, []);
    // if (state)
    // {
        customParam =
        {
            gameDuration : state.gameDuration,
            user_id : state.user_id,
        };
    // }

    // else
    // {
    //     customParam =
    //     {
    //         gameDuration : '5',
    //         // gameDuration : state.gameDuration,
    //         user_id : userData.user_data.id,
    //         // user_id : state.user_id,
    //     };
    // }
  // console.log("true = " + customParam.user_id);


  return (
    <>
    <SocketProvider customParam={customParam}>
      <Game/>
    </SocketProvider>
    </>
  );
}