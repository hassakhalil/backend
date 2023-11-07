import { MbChat } from "../components/Chat/MbChat";
import { NavBar } from "../components/Home/NavBar/NavBar";
import { useContext, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createContext } from "react";
import { useState } from "react";
import { useProfilecontext } from "../ProfileContext";


interface MyUserData {
  user_data: {
    id: number;
    username: string;
    me: boolean;
    is_two_factor_auth_enabled: boolean;
  };
  friends: any[]; // Replace 'any' with the appropriate type
  blocks: any[]; // Replace 'any' with the appropriate type
  match_history: any[]; // Replace 'any' with the appropriate type
  achievements: any[]; // Replace 'any' with the appropriate type
  wins: number;
  loses: number;
  draws: number;
}


export function Chat () {

	const profile = useProfilecontext();

	return (
		<>
			<MbChat profile={profile.data}/>
      
		</>
	)
}