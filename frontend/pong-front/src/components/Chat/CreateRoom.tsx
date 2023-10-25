import React from "react";
import rmv from "/src/assets/remove.svg"


export function CreateRoom() {
	const [remove, SetRemove] = React.useState(false);
	
	const defalutColor: { [key: string]: string }  = {
		button1: "#E4E4E47F",
		button2: "#E4E4E47F",
		button3: "#E4E4E47F"
	}

	const defaultTextColor: { [key: string]: string }  = {
		button1: "#11142D",
		button2: "#11142D",
		button3: "#11142D"
	}
	
	
	const [buttoms, Setbuttoms] = React.useState(defalutColor);
	const [textColor, SetTextColor] = React.useState(defaultTextColor);

	const handleClick = (num: string) => {
		const newColor = {...defalutColor};
		const newTextColor = {...defaultTextColor};
		newTextColor[num] = '#FFFFFF'
		newColor[num] = "#6C5DD3";
		Setbuttoms(newColor);
		SetTextColor(newTextColor);
	}
  
	return (
	  <>
		{!remove ? (
		  <div className="blur-background z">
			<div className="h-5/6 fixed top-1/4 w-full pr-8 pl-8 lg:w-6/12 xl:w-4/12 lg:right-[25%] xl:right-[35%] lg:h-5/6">
			  <div className="w-full h-5/6 bg-white shadow-2xl rounded-custom">
				<div className="flex items-center justify-between w-full p-8">
				  <div className="text-lg text-[#11142D] font-semibold">Create new room chat</div>
				  <button
					onClick={() => SetRemove(!remove)}
					className="flex items-center justify-center border border-white rounded-full w-[48px] h-[48px] shadow-xl"
				  >
					<img src={rmv}/>
				  </button>
				</div>
				<div className="flex flex-col justify-between h-[80%] p-8 pt-0">
					<div className="flex flex-col gap-[10px]">
						<div className="text-xs text-[#808191]">Room name</div>
					<input
						className="w-full h-12 px-4 rounded-xl bg-gray-100 focus:outline-none text-[#11142D]"
					/>
					</div>
					<div className="flex flex-col gap-[10px]">

					<div className="text-xs text-[#808191]">Password</div>
					<input type="password"
						className="w-full h-12 px-4 rounded-xl bg-gray-100 focus:outline-none text-[#11142D]"
						/>
					</div>

					<div className="flex items-center justify-around">
						<button onClick={() => handleClick('button1')} style={{backgroundColor: buttoms.button1}} className={`h-[40px] w-[70px] lg:w-[100px] rounded-xl text-sm lg:text-lg text-[${textColor.button1}]`}>Public</button>
						<button  onClick={() => handleClick('button2')} style={{backgroundColor: buttoms.button2}} className={`h-[40px] w-[70px] lg:w-[100px] rounded-xl text-sm lg:text-lg text-[${textColor.button2}]  `}>Protected</button>
						<button  onClick={() => handleClick('button3')} style={{backgroundColor: buttoms.button3}} className={` h-[40px] w-[70px] lg:w-[100px] rounded-xl text-sm lg:text-lg text-[${textColor.button3}] `}>Private</button>
					</div>
					<div className="flex items-center justify-center">
						<div className="flex items-center justify-center w-full lg:w-6/12 h-[50px] bg-[#6C5DD3] rounded-xl text-white font-bold tracking-wider">Create Room</div>
					</div>
				</div>
			  </div>
			</div>
		  </div>
		) : null}
	  </>
	);
  }
  
  