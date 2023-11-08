import React from "react"
import { NavLink } from "react-router-dom"

interface Props {
	profile: string,
	name: string,
	msg: string,
}

export function Msg ( {profile, name, msg} : Props ) {

	(name);
	return (
		<>
			<div className="flex gap-[10px] pb-5">
				<NavLink to={`/profile/${name}`}>
				<button >
					<img src={profile} className="w-[32px] h-[32px] rounded-full"></img>
				</button>
				</NavLink>
				<div className="flex flex-col">
				<div className="flex gap-[10px] pb-3 items-center">
					<div className="text-sm">{name}</div>
					{/* <div className="text-xs text-[#808191]">{time}</div> */}
				</div>
				<div className="flex flex-col">
					<div className="message-bubble text-[#808191] text-sm">{msg}</div>
					{/* <div className="message-bubble text-[#808191] text-sm">{msg}</div> */}
				</div>
				</div>
			</div>
		</>
	)
}