
import rmv from "/src/assets/remove.svg"
import React from "react";
import profile from "/src/assets/ahamdy.jpg"
import profile1 from "/src/assets/hkhalil.jpg"
import { Msg } from "./Msg";


export function Chatconv() {
	const [remove, SetRemove] = React.useState(false);
  
	return (
	  <>

		{!remove && (

		  <div className="fixed inset-0 bg-white z px-8 lg:hidden">
			<div className="w-full h-full flex flex-col">
			  <div className="text-white text-xl py-2">
				<div className="flex items-center justify-between">
				  <div className="text-[#1B1D21]">Hamouu</div>
				  <button
					onClick={() => SetRemove(!remove)}
					className="flex items-center justify-center border border-white rounded-full w-12 h-12 shadow-xl"
				  >
					<img src={rmv} alt="Remove" />
				  </button>
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
	  </>
	);
  }
  