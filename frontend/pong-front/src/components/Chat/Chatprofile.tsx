
import React, { useEffect, useState } from "react";
import { DkChatConv } from "./DkChatConv";
import axios from "axios";
import { Link, NavLink, useParams } from "react-router-dom";
import { GroupSettings } from "./GroupSettings";
import settings from "/src/assets/GroupSetting.svg"
import Leave from "/src/assets/Leave.svg"

interface Props {
  room: any;
  hide: () => void,
}

export function Chatprofile({ room, hide }: Props) {
	
	const [role, setRole] = useState('')
	useEffect(() => {
			try {
				const response = axios.get(`http://localhost:3000/get-my-role/${room.id}`, {withCredentials: true})
				.then ((response) => {
					setRole(response.data);
				})
			}
			catch (error) {
				console.log(error);
			}
	  }, []);


  return (
    <>
      < NavLink to={`/Chat/${room.id}`} className={({ isActive }) => isActive ? "flex items-center justify-between w-full  border border-white rounded-2xl h-[80px] pl-5 bg-[#6C5DD3]" : " w-full  flex items-center justify-between border border-white rounded-2xl h-[80px] pl-5"}>
        {
          ({ isActive }) => (
            <>
			<div className="flex">

              <div className="relative flex items-center justify-center border border-[2px] border-[#0049C6] rounded-full w-[48px] h-[48px]">
                <img src={room.avatar} className="bbc rounded-full w-[40px] h-[40px]" alt="Avatar" />
                <div className="absolute top-0 mt-[-3px] lg:mt-[-10px] lg:mr-[-10px] right-0 mr-[-5px]">
                </div>
              </div>
              <div>
                <div className={`pl-3 lg:text-lg mobile-nav-bar sm:hidden md:block ${isActive ? 'text-white' : 'text-[#11142D]'}`}>
                  {room.name}
				  </div>
                <div className={`pl-3 Inter mobile-nav-bar sm:hidden md:block text-sm lg:text-sm font-meduim ${isActive ? 'text-white' : 'text-[#808191CC]'}`}>online</div>
              </div>
			</div>
			{
				role === "owner" || role === "admin" ? (	
					<button className="absolute right-0 pr-10" onClick={hide}>
						<img src={settings} alt="Settings" />
					</button>
				) : null
			}
		
            </>	
          )
        }
      </NavLink>

    </>
  );
}
