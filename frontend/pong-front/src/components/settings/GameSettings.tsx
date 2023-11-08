import React, { useContext, useState } from "react";
import rmv from "/src/assets/remove.svg"
import GameBack1 from "/src/assets/black.png"
import GameBack2 from "/src/assets/GameBack.png"
import GameBack3 from "/src/assets/Blue.png"
import { Deblock } from "./Deblock";
import { TwoFa } from "./TwoFA";
import { DkSettings } from "./DkSettings";
import { MbSettings } from "./MbSettings";
import { MbTwoFA } from "./MbTwoFA";

import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../pages/Profile";
import { useProfilecontext } from "../../ProfileContext";

interface Props {
	hide: () => void;
}

export function GameSetting  ( {hide}:Props ) {

	const [remove, SetRemove] = React.useState(false);

	const timeButton: { [key: string]: string } = {
		button1: "white",
		button2: "white",
		button3: "white",
		button4: "white",
	};
	const textColor: { [key: string]: string } = {
		button1: "black",
		button2: "black",
		button3: "black",
		button4: "black",
	};

	const Shadow: { [key: string]: string } = {
		button1: "",
		button2: "",
		button3: "",
		button4: "",
	};
	const [handleTimeButton, sethandleTimeButton] = React.useState(timeButton);
	const [handleTextColor, sethandleTextColor] = React.useState(textColor);
	const [shadow, SetShadow] = React.useState(Shadow);


	const handleButton = ( Buttonnum: string ) => {
		const NewColors = {...timeButton};
		const TextColors = {...textColor};
		sessionStorage.setItem("Timer", Buttonnum.charAt(Buttonnum.length - 1));


		NewColors[Buttonnum] = "#6C5DD3";
		TextColors[Buttonnum] = "white"

		sethandleTimeButton(NewColors);
		sethandleTextColor(TextColors);
	}

	const handleshadow = ( Buttonnum: string ) => {
		const Newshadow = {...Shadow};
		Newshadow[Buttonnum] = "selected";
		SetShadow(Newshadow);

		const color = Buttonnum.charAt(Buttonnum.length - 1);
		if (color == '1')
			sessionStorage.setItem("Color", "#000000");
		else if (color == '2')
			sessionStorage.setItem("Color", "#6C5DD3");
		else
			sessionStorage.setItem("Color", "#7EC3DD");
	}
	
	const [twoFA, setTwoFa] = useState(false);
	const [profile, setProfile] = useState(false);

	const data = useProfilecontext();

	
	return (
		<>
		{

			remove ? null : 
			<div className="blur-background z mobile-nav-bar sm:block">
					<div className="centered-component sm:pt-20">
					<div className="flex w-[600px] h-[700px] bg-white shadow-2xl rounded-custom">
						<div className="flex flex-col w-full">
						<div className="flex justify-between">
							<div className="text-[#11142D] font-semibold text-lg p-10">Game settings</div>
							<div className="pt-8 pr-5">
								<button onClick={() => {SetRemove(!remove), hide()}} className="flex items-center justify-center border border-white rounded-full w-[48px] h-[48px] lg:w-[50px] h-[50px] shadow-xl">
									<img src={rmv}></img>
								</button>
							</div>
						</div>
						<div className="flex items-center justify-around gap-10 pt-5 pl-5">
							<button  className={`flex items-center justify-center border  border-[2px]  border-[#FF754C] w-[120px] h-[35px] rounded-xl`}  onClick={() => {setProfile(!profile), SetRemove(!remove)}}>
								<div className="font-semibold">Your Profile</div>
							</button> 
							<button className={`flex items-center justify-center border border-[2px]  border-[#FF754C] w-[100px] h-[35px] rounded-xl`} onClick={() => {setTwoFa(!twoFA), SetRemove(!remove)}}>
								<div className="font-semibold">2FA</div>
							</button>
							<button className={`flex items-center justify-center border  border-[2px]  bg-[#6C5DD3] border-[#6C5DD3] w-[120px] h-[35px] rounded-xl`}>
								<div className="text-white font-semibold">Game Setting</div>
							</button> 
						</div>
						<div className="flex flex-col pt-10">
							<div className="flex flex-col items-center justify-center gap-[10px]">
							<div className="text-sm text-[#808191]">Time </div>
							<div className="flex gap-[15px]">
							<button className={`flex  items-center justify-center border-[#6C5DD3] bg-[${handleTimeButton.button1}] hover:bg-[#6C5DD3] transition-all duration-200 border-[2px] w-[50px] h-[35px] rounded-xl text-[${handleTextColor.button1}] hover:text-white`}  onClick={() => handleButton('button1')}>
								<div className="text-sm font-semibold">1min</div>
							</button>
							<button className={`flex  items-center justify-center border-[#6C5DD3] bg-[${handleTimeButton.button2}] hover:bg-[#6C5DD3] transition-all duration-200 border-[2px] w-[50px] h-[35px] rounded-xl text-[${handleTextColor.button2}] hover:text-white`}  onClick={() => handleButton('button2')}>
								<div className="text-sm font-semibold">2min</div>
							</button>
							<button className={`flex  items-center justify-center border-[#6C5DD3] bg-[${handleTimeButton.button3}] hover:bg-[#6C5DD3] transition-all duration-200 border-[2px] w-[50px] h-[35px] rounded-xl text-[${handleTextColor.button3}] hover:text-white`} onClick={() => handleButton('button3')}>
								<div className="text-sm font-semibold">3min</div>
							</button>
							<button className={`flex  items-center justify-center border-[#6C5DD3] bg-[${handleTimeButton.button4}] hover:bg-[#6C5DD3] transition-all duration-200 border-[2px] w-[50px] h-[35px] rounded-xl text-[${handleTextColor.button4}] hover:text-white`}onClick={() => handleButton('button4')}>
								<div className="text-sm font-semibold">4min</div>
							</button>
							</div>
							</div>

						</div>
						<div className="flex flex-col pt-10">
							<div className="flex flex-col items-center justify-center gap-[10px]">
							<div className="text-sm text-[#808191]">Choose Table Style</div>
							<div className="flex items-center justify-center gap-[15px] px-5">
								<button className="hover-grow">
									<img src={GameBack1} className={`w-[150px] h-[85px] rounded-xl ${shadow.button1}`} onClick={() => handleshadow('button1')}></img>
								</button>
								<button className="hover-grow">
									<img src={GameBack2} className={`w-[150px] h-[85px] rounded-xl ${shadow.button2}`} onClick={() => handleshadow('button2')}></img>
								</button>
								<button className="hover-grow">
									<img src={GameBack3} className={`w-[150px] h-[85px] rounded-xl ${shadow.button3}`} onClick={() => handleshadow('button3')}></img>
								</button>
							</div>
							</div>

						</div>
						<div className="flex flex-col pt-10">
							<div className="flex flex-col items-center justify-center gap-[10px] px-5">
							<div className="text-sm text-[#808191]">Blocked user</div>
								<div className="flex overflow-y-auto gap-[10px] flex-wrap w-full h-[120px] px-3 py-3 border-[2px] border-[#6C5DD3] rounded-xl">
									{data?.data.blocks.map((block : {username: string}, index: number) => (
										<div key={index}>
											<Deblock name={block.username}/>
										</div>
									))
									}
								</div>
								<div></div>
							</div>

						</div>
						</div>
					</div>
				</div>
			</div>
			}
			{ twoFA &&
				<div>
					<TwoFa hide={hide}/>
					<MbTwoFA hide={hide}/>
				</div>
			}
			{ profile &&
				<div>
					<DkSettings hide={hide}/>
					<MbSettings hide={hide}/>
				</div>
			}
		</>
	)
}