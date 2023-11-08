import React, { useContext } from "react"

import { GameRes } from "./GameRes"
import { UserContext } from "../../../pages/Profile"

interface Props {
	length?: number
	match_history?: any,
	My_name?: string;
	My_profile?: string;
}

export function LatestMatches ({length, match_history, My_name, My_profile} : Props) {

    return (
        <>
            <div className="flex flex-col justify-center items-center px-10 pb-10">
                <div className="border bg-white drop-shadow-lg rounded-custom w-full h-[700px]">
					<div className="flex justify-center items-center text-blue-900 font-poppins text-xl pt-10 font-semibold leading-normal tracking-wider lg:pb-5 lg:pt-10 lg:text-2xl">Last Played Matches </div>
					{
						(length === 0) ? <div className="h-[700px] pb-44 flex items-center justify-center text-xl">No Game Player Yet</div> : 
						<div className="flex flex-col lg:px-10 px-5 pt-5 gap-y-6 scrollable-div-ver8">
							{match_history.map((match : any, index: number) => (
								<div key={index}>
									{/* <FriendStatus avatar={friend.avatar} name={friend.username} state="offline"/> */}
									<GameRes name={match.friend_username} profile={match.friend_avatar} score={match.friend_score} My_name={My_name} My_profile={My_profile} My_score={match.my_score}/>
								</div>
							))
							}
						</div>
					}
                </div>
            </div>
        </>
    )
}