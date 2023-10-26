import { useContext } from "react";
import { Chatprofile } from "./Chatprofile"
import { DirectMsg } from "./DirectMsg"
import { GroupMsg } from "./GroupMsg"
import { SocketContext } from './contexts/SocketContext';
// import { SocketProvider } from "./contexts/chatContext";
import React from "react";
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


  interface MbChatProps {
	profile: MyUserData;
  }

export function MbChat ({profile }: MbChatProps) {

		console.log('MbChat');
	// const socket = useContext(SocketContext);
	return (
		<>
			<div className="pr-8 pl-8 pt-28 lg:pl-32">
			{/* <SzocketProvider> */}
				<DirectMsg profile={profile}/>
    		{/* </SocketProvider> */}
				<div className="pt-8">
					{/* <GroupMsg/> */}
				</div> 
			  </div>
		</>
	)
}