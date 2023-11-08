import React from "react"
import { GroupChatConv } from "./GruopChatConv";
import { DkChatConv } from "./DkChatConv";
import { MbGroupChatConv } from "./MbGroupChatConv";

export function GroupComponents () {
	const [conv, Setconv] = React.useState(false);
	
	return (
		<>
			<button onClick={() => Setconv(!conv)}
				className={`flex items-center w-full border border-white rounded-2xl h-[80px] pl-5`}
				>
				<div className="relative flex items-center justify-center border border-[2px] border-[#0049C6] rounded-full w-[48px] h-[48px]">
					<img src="/src/assets/hkhalil.jpg" className="bbc rounded-full w-[40px] h-[40px]" alt="Avatar" />
					</div>
					<div>
					<div className={`pl-3 lg:text-lg `}>Group 1</div>
					<div className={`pl-3 Inter text-sm lg:text-sm font-meduim text-[#808191]`}>3m ago</div>
				</div>
				</button>
			{conv && <GroupChatConv/>}
			{conv && <MbGroupChatConv/>}
		</>
	)
}