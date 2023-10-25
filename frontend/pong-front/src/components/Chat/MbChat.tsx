import { useContext } from "react";
import { Chatprofile } from "./Chatprofile"
import { DirectMsg } from "./DirectMsg"
import { GroupMsg } from "./GroupMsg"
import { SocketContext } from './contexts/SocketContext';
import { SocketProvider } from "./contexts/chatContext";
import React from "react";
export function MbChat () {

		console.log('MbChat');
	// const socket = useContext(SocketContext);
	return (
		<>
			<div className="pr-8 pl-8 pt-28 lg:pl-32">
			{/* <SzocketProvider> */}
				<DirectMsg/>
    		{/* </SocketProvider> */}
				<div className="pt-8">
					{/* <GroupMsg/> */}
				</div> 
			  </div>
		</>
	)
}