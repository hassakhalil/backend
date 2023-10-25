import { CreateRoom } from "./CreateRoom";
import { GroupComponents } from "./GroupComponent";
import React from "react";
export function GroupMsg () {

	const [room, SetRoom] = React.useState(false);

	return (
		<>
			<div className="text-[#808191] text-sm pb-5">Group Message</div>
			<div className="flex flex-col">
				<div className="scrollable-div-ver9 flex flex-col gap-5">
					<GroupComponents/>
					<GroupComponents/>
					<GroupComponents/>
					<GroupComponents/>
					<GroupComponents/>
					<GroupComponents/>
					<GroupComponents/>
				</div>
				<div className="flex items-center justify-center pt-5 pb-5">
					<button onClick={() => SetRoom(!room)} className="border border-[#6C5DD3] shadow-md bg-[#6C5DD3] w-[200px] h-[50px] rounded-2xl">
						<div className="text-white font-semibold text-sm">Create New Room Chat</div>
					</button>
				</div>
			</div>
			{ room &&  <CreateRoom/>}
		</>
	)
}