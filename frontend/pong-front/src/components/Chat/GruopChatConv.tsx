import rmv from "/src/assets/remove.svg"
import groupsetting from "/src/assets/GroupSetting.svg"
import React from "react"
import { Msg } from "./Msg"
import { GroupSettings } from "./GroupSettings";

export function GroupChatConv () {
	const [remove, SetRemove] = React.useState(false);
	const [settings, Setsettings] = React.useState(false);
  
	return (
	  <>
		{!remove && (
		  <div className="w-full absolute lg:w-6/12 lg:pl-10 bg-white xl:pl-0 h-[100vh] top-0 right-0 mobile-nav-bar sm:hidden lg:block">
			<div className="z px-8 h-[100vh] lg:block">
			  <div className="pt-28 text-white text-xl">
				<div className="flex items-center justify-between">
				  <div className="text-[#1B1D21] md:text-2xl lg:pb-10">Hamouu</div>
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
  
			  <div className="px-8 h-[100%] scrollable-container lg:pt-1">
				<Msg profile="/src/assets/hkhalil.jpg" name="hassan" time="2m ago" msg="ach wach"/>
				<Msg profile="/src/assets/hkhalil.jpg" name="hassan" time="2m ago" msg="ach"/>
				<Msg profile="/src/assets/hkhalil.jpg" name="hassan" time="2m ago" msg="ach    "/>
				<Msg profile="/src/assets/hkhalil.jpg" name="hassan" time="2m ago" msg="  "/>
				<Msg profile="/src/assets/hkhalil.jpg" name="hassan" time="2m ago" msg="ach wach "/>
				<Msg profile="/src/assets/hkhalil.jpg" name="hassan" time="2m ago" msg="ach wach "/>
				<Msg profile="/src/assets/hkhalil.jpg" name="hassan" time="2m ago" msg="ach wach "/>
				<Msg profile="/src/assets/hkhalil.jpg" name="hassan" time="2m ago" msg="ach wach "/>
				<Msg profile="/src/assets/hkhalil.jpg" name="hassan" time="2m ago" msg="ach wach "/>
				{/* <Msg profile="/src/assets/hkhalil.jpg" name="hassan" time="2m ago" msg="1"/>
				<Msg profile="/src/assets/hkhalil.jpg" name="hassan" time="2m ago" msg="1 "/>
				<Msg profile="/src/assets/hkhalil.jpg" name="hassan" time="2m ago" msg=""/>
				<Msg profile="/src/assets/hkhalil.jpg" name="hassan" time="2m ago" msg="345t2erdfggwetrfgdcxcefgsdc"/>
				<Msg profile="/src/assets/hkhalil.jpg" name="hassan" time="2m ago" msg="454545454545"/> */}
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
  