
import rmv from "/src/assets/remove.svg"
import React from "react";
import { Msg } from "./Msg";

import { GroupSettings } from "./GroupSettings";
import groupsetting from "/src/assets/GroupSetting.svg"




export function MbGroupChatConv() {
	const [remove, SetRemove] = React.useState(false);
	const [settings, Setsettings] = React.useState(false);

  
	return (
	  <>

		{!remove && (

		  <div className="fixed inset-0 px-8 z-min lg:hidden">
			<div className="w-full h-full bg-white flex flex-col">
			  <div className="pt-28 text-white text-xl py-2">
				<div className="flex items-center justify-between">
				  <div className="text-[#1B1D21]">Hamouu</div>
				  <div className="flex gap-2 items-center justify-center">
					<button onClick={() => Setsettings(!settings)}>
						<img src={groupsetting}></img>
					</button>
					<button
						onClick={() => SetRemove(!remove)}
						className="flex items-center justify-center border border-white rounded-full w-12 h-12 shadow-xl lg:hidden"
						>
						<img src={rmv} alt="Remove" />
					</button>
					</div>
				</div>
			  </div>
  
			  <div className="flex-1 px-8 scrollable-div-ver10 ">
				<Msg profile="/src/assets/hkhalil.jpg" name="hassan" time="2m ago" msg="ach wach"/>
				<Msg profile="/src/assets/hkhalil.jpg" name="hassan" time="2m ago" msg="ach"/>
				<Msg profile="/src/assets/hkhalil.jpg" name="hassan" time="2m ago" msg="ach    "/>
				<Msg profile="/src/assets/hkhalil.jpg" name="hassan" time="2m ago" msg="  "/>
				<Msg profile="/src/assets/hkhalil.jpg" name="hassan" time="2m ago" msg="ach wach "/>
				<Msg profile="/src/assets/hkhalil.jpg" name="hassan" time="2m ago" msg="ach wach "/>
				<Msg profile="/src/assets/hkhalil.jpg" name="hassan" time="2m ago" msg="ach wach "/>
				<Msg profile="/src/assets/hkhalil.jpg" name="hassan" time="2m ago" msg="ach wach "/>
				<Msg profile="/src/assets/hkhalil.jpg" name="hassan" time="2m ago" msg="ach wach "/>
				<Msg profile="/src/assets/hkhalil.jpg" name="hassan" time="2m ago" msg="ach wach "/>

			  </div>
  
			  <div className="flex flex-col items-center justify-center py-5">
				<form className="w-full max-w-xs">
				  <input
					className="w-full h-12 px-4 rounded-xl border border-[#6C5DD3] focus:outline-none focus:border-[#6C5DD3] text-[#808191]"
					placeholder="Write Something"
				  />
				</form>
				<button className="w-full max-w-xs bg-[#6C5DD3] text-white font-semibold rounded-xl h-12 mt-3">
				  Send
				</button>
			  </div>
			</div>
		  </div>
		)}
		{settings && <GroupSettings/>}
	  </>
	);
  }