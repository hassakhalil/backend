import React, { useState } from "react"
import rmv from "/src/assets/remove.svg"
import axios from "axios";
import rec from "/src/assets/rectangle.svg"

interface Props {
	roomName: string,
	RoomType: string,
	hide: () => void;
}

export function EnterPass ( {hide, roomName, RoomType}: Props ) {
	const [pass, setpass] = useState('');
	const [error, SetError] = React.useState(false);
	const [sent, Setsent] = React.useState(false);
	const [remove, setRemove] = React.useState(false);
	const data = {
		roomName: roomName,
		RoomType: RoomType,
		hide: hide
	}

	const ProtectedRooms = async ( {roomName, RoomType}: Props, Mypassword: string )  => {
		const jsonData = {
			name: roomName,
			password: Mypassword,
			type: RoomType,
		};
	
		try {
			const response = await axios.post("http://localhost:3000/join-room", jsonData, {withCredentials: true})
			.then((response) => {
				console.log(response.data);
				Setsent(true);
				SetError(false);
				hide();
			})
		}
		catch (error) {
			console.log(error);
			SetError(true);
			Setsent(false);
		}
	}

	return (
		<>

		<div className="blur-background">

			<div className="absolute left-[20%] top-[30%] z">
			  <div className="h-[300px] bg-white shadow-2xl rounded-custom">
				<div className="flex items-center justify-between p-8">
				  <div className="text-lg text-[#11142D] font-semibold">Enter Password</div>
				  <button
					onClick={hide}
					className="flex items-center justify-center border border-white rounded-full w-[48px] h-[48px] shadow-xl"
				  >
					<img src={rmv}/>
				  </button>
				</div>
				<div className="flex flex-col justify-between h-[60%] p-8 pt-0">
					<div className="flex flex-col gap-[10px]">
					<div className="text-xs text-[#808191]">Password</div>
					<input type="password"
						className="w-full h-12 px-4 rounded-xl bg-gray-100 focus:outline-none text-[#11142D] shadow-md"
						onChange={(e) => {
							e.preventDefault();
							setpass(e.target.value)
						}}
						/>
					</div>
					{
								error ? 
								<div className="absolute pt-[10px] lg:pt-[20px]">
									<div className="border bg-[#E9DCE5] rounded-lg w-[170px] h-[25px]  flex gap-1 items-center justify-center">
										<div className="text-xs font-semibold text-[#6C5DD3]">Invitation Not Valid</div>
										<div>
											<div  style={{ backgroundImage: `url(${rec})`}} className="w-[14px] h-[14px] bg-center bg-no-repeat bg-cover">
												<div className="text-white flex items-center justify-center text-xs font-semibold">
													!
												</div>
											</div>
										</div>
									</div>
								</div> : null

							}
							{
								sent ? 
								<div className="absolute pt-[10px] lg:pt-[20px]">
									<div className="border bg-[#E9DCE5] rounded-lg w-[170px] h-[25px]  flex gap-1 items-center justify-center">
										<div className="text-xs font-semibold text-[#6C5DD3]">Done</div>
										<div>
											<div  style={{ backgroundImage: `url(${rec})`}} className="w-[14px] h-[14px] bg-center bg-no-repeat bg-cover">
												<div className="text-white flex items-center justify-center text-xs font-semibold">
													!
												</div>
											</div>
										</div>
									</div>
								</div>
								
								: null
							}
					<button className="flex items-center justify-center" onClick={() => {ProtectedRooms(data, pass)}}>
						<div className="flex items-center justify-center w-full lg:w-6/12 h-[50px] bg-[#6C5DD3] rounded-xl text-white font-bold tracking-wider shadow-md">Join Room</div>
					</button>
				</div>
			  </div>
			 </div>
			</div>
		</>
	)
}
