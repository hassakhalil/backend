import maroc from "/src/assets/maroc.svg"
import player from "/src/assets/Player.png"
import wins from "/src/assets/Wins.svg"
import Loses from "/src/assets/Loses.svg"
import achi from "/src/assets/achivements.svg"
import React from "react"

interface Props {
	profile: string,
	name: string,
	winNum: string,
	LoseNum: string,
	achivNum: string,
	rating: string
}

export function ProfileCard ( {profile, name, winNum, LoseNum, achivNum, rating}: Props ) {
	return (
		<>
		<div className="lg:pt-10 md:pb-10 pt-10 flex items-center justify-center lg:pr-16">
			<div className=" border border-white w-[290px] h-[460px] shadow rounded-custom">
			<div className="flex relative gap-16 flex-col p-10 bg-no-repeat w-[290px] h-[192px] rounded-custom-img path2">
				<img src={player} className="absolute pl-10"></img>
				<div className="text-white text-2xl font-bold tracking-wider">{name}</div>
				<div className="flex items-center gap-[10px] pt-2">		
					<img src={maroc} className="rounded-md w-[24px] h-[24px]"></img>
					<div className="text-white text-2xl font-bold tracking-wider">{rating}</div>
				</div>
            </div>
			<div className="flex flex-col p-10">
				<img src={profile} className="w-[80px] h-[80px] rounded-full"></img>
				<div className="flex flex-col gap-3">
					<div className="flex gap-[10px] pt-8">
						<img src={wins}></img>
						<div className="font-medium">{winNum} wins</div>
					</div>
					<div className="flex gap-[10px]">
						<img src={Loses}></img>
						<div className="font-medium">{LoseNum} loses</div>
					</div>
					<div className="flex gap-[10px]">
						<img src={achi}></img>
						<div className="font-medium">{achivNum}/7 achivments</div>
					</div>
				</div>
			</div>
			</div>
			</div>
		</>
	)
}