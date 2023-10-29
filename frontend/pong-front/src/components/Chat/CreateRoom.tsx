import React, { useState } from "react";
import rmv from "/src/assets/remove.svg"
import axios from "axios";


interface Props {
	hide: () => void;
}

interface Data {
	roomName: string,
	RoomType: string,
	pass: string
}

const handleCreateRoom = async ( {roomName, RoomType, pass}: Data ) => {
	const jsonData = {
		name: roomName,
		type: RoomType,
		password: pass,
	};
	
	try {
		const response = await axios.post("http://localhost:3000/create-room", jsonData, {withCredentials: true})
		.then((response) => {
			console.log(response.data);
		})
	}
	catch (error) {
		console.log(error);
	}
}

export function CreateRoom( {hide}: Props ) {

	const [data, setData] = useState<Data>({
		roomName: '',
		RoomType: '',
		pass: '',
	  });
	
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
	
	const [clicked, setClick] = React.useState(true);
	return (
	  <>
		<div className="centred-component">
			<div className="absolute left-[30%] xl:left-[40%] top-[30%] z">
			  <div className="h-[500px] bg-white shadow-2xl rounded-custom">
				<div className="flex items-center justify-between p-8">
				  <div className="text-lg text-[#11142D] font-semibold">Create new room chat</div>
				  <button
					onClick={hide}
					className="flex items-center justify-center border border-white rounded-full w-[48px] h-[48px] shadow-xl"
				  >
					<img src={rmv}/>
				  </button>
				</div>
				<div className="flex flex-col justify-between h-[80%] p-8 pt-0">
					<div className="flex flex-col gap-[10px]">
						<div className="text-xs text-[#808191]">Room name</div>
					<input 
						className="w-full h-12 px-4 rounded-xl bg-gray-100 focus:outline-none text-[#11142D] shadow-md"
						value={data.roomName}
						onChange={(e) => {
							e.preventDefault();
							setData({ ...data, roomName: e.target.value });
						}}
						/>
					</div>
					<div className="flex flex-col gap-[10px]">

					<div className="text-xs text-[#808191]">Password</div>
					<input type="password"
						className="w-full h-12 px-4 rounded-xl bg-gray-100 focus:outline-none text-[#11142D] shadow-md"
						value={data.pass}
						onChange={(e) => {
							e.preventDefault();
								setData({ ...data, pass: e.target.value });
						}}
						/>
					</div>

					<div className="flex items-center gap-1 justify-around">
						<button onClick={() => {handleClick('button1'), setData((prevData) => ({ ...prevData, RoomType: 'public' }))}} style={{backgroundColor: buttoms.button1}} className={`h-[40px] w-[70px] lg:w-[100px] shadow-md rounded-xl  text-[${textColor.button1}]`}> Public</button>
						<button  onClick={() => {handleClick('button2'), setData((prevData) => ({ ...prevData, RoomType: 'protected' }))}} style={{backgroundColor: buttoms.button2}}  className={`h-[40px] w-[70px] lg:w-[100px] rounded-xl shadow-md text-[${textColor.button2}]  `}>Protected</button>
						<button  onClick={() => {handleClick('button3'), setData((prevData) => ({ ...prevData, RoomType: 'private' }))}}  style={{backgroundColor: buttoms.button3}} className={` h-[40px] w-[70px] lg:w-[100px] rounded-xl  shadow-md text-[${textColor.button3}] `}>Private</button>
					</div>
					<button className="flex items-center justify-center" onClick={() => handleCreateRoom(data)}>
						<div className="flex items-center justify-center w-full lg:w-6/12 h-[50px] bg-[#6C5DD3] rounded-xl text-white font-bold tracking-wider shadow-md">Create Room</div>
					</button>
				</div>
			  </div>
			 </div>
		</div>

	  </>
	);
  }
  
  