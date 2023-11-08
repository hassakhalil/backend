import profile from "/src/assets/hhamdy.jpg"
import unlock from "/src/assets/unlock.svg.svg"
import achivement from "/src/assets/achivement.png"
import React from "react"

interface Props {
	Achi: any
}

export function Achivement ( {Achi} : Props ) {


	return (
		<>
			<div className="lg:flex lg:justify-center lg:items-center p-10 pt-0">
            <div className="flex flex-col border h-[700px] w-full lg:w-full lg:h-[700px] rounded-custom drop-shadow-lg bg-[#FFF]">
                <div className="flex justify-center items-center pt-12 text-blue-900 font-poppins text-2xl font-semibold leading-normal tracking-wider lg:text-2xl pb-4">Achivements</div>
                <div className="flex justify-between gap-[10px] items-center p-5">
					<div className="flex gap-[8px] items-center">
						<img src={achivement} className="w-[45px] h-[45px] rounded-full"></img>
						<div className="text-sm text-[#808191]">Played Your First Game</div>
					</div>
					{
						(Achi.some((obj : any) => obj.name === "Played Your First Game") === true ) ? null :
						<div className="flex gap-[8px] items-center">
							<div className="text-xs text-[#808191]">unlocked</div>	
							<img className="w-[20px] h-[20px]" src={unlock}></img>
						</div>
					}
				</div>
				<div className="flex justify-between gap-[10px] items-center p-5">
					<div className="flex gap-[8px] items-center">
						<img src={achivement} className="w-[45px] h-[45px] rounded-full"></img>
						<div className="text-sm text-[#808191]">Played a Game With Friend</div>
					</div>
					{
						(Achi.some((obj : any) => obj.name === "Played a Game With Friend") === true ) ? null :
						<div className="flex gap-[8px] items-center">
							<div className="text-xs text-[#808191]">unlocked</div>	
							<img className="w-[20px] h-[20px]" src={unlock}></img>
						</div>
					}
				</div>
				<div className="flex justify-between gap-[10px] items-center p-5">
					<div className="flex gap-[8px] items-center">
						<img src={achivement} className="w-[45px] h-[45px] rounded-full"></img>
						<div className="text-sm text-[#808191]">Get 800 Elo Points</div>
					</div>
					{
						(Achi.some((obj : any) => obj.name === "Get 800 Elo Point") === true ) ? null :
						<div className="flex gap-[8px] items-center">
							<div className="text-xs text-[#808191]">unlocked</div>	
							<img className="w-[20px] h-[20px]" src={unlock}></img>

						</div>
					}
				</div>
				<div className="flex justify-between gap-[10px] items-center p-5">
					<div className="flex gap-[8px] items-center">
						<img src={achivement} className="w-[45px] h-[45px] rounded-full"></img>
						<div className="text-sm text-[#808191]">Play With AI Player</div>
					</div>
					{
						(Achi.some((obj : any) => obj.name === "Play With AI Player") === true ) ? null :
						<div className="flex gap-[8px] items-center">
							<div className="text-xs text-[#808191]">unlocked</div>	
							<img className="w-[20px] h-[20px]" src={unlock}></img>

						</div>
					}
				</div>
				<div className="flex justify-between gap-[10px] items-center p-5">
					<div className="flex gap-[8px] items-center">
						<img src={achivement} className="w-[45px] h-[45px] rounded-full"></img>
						<div className="text-sm text-[#808191]">Won Over AI Player</div>
					</div>
					{
						(Achi.some((obj : any) => obj.name === "Won Over AI Player") === true ) ? null :
						<div className="flex gap-[8px] items-center">
							<div className="text-xs text-[#808191]">unlocked</div>	
							<img className="w-[20px] h-[20px]" src={unlock}></img>

						</div>
					}
				</div>
				<div className="flex justify-between gap-[10px] items-center p-5">
					<div className="flex gap-[8px] items-center">
						<img src={achivement} className="w-[45px] h-[45px] rounded-full"></img>
						<div className="text-sm text-[#808191]">Played 3 Matches In Total</div>
					</div>
					{
						(Achi.some((obj : any) => obj.name === "Played 3 Games") === true ) ? null :
						<div className="flex gap-[8px] items-center">
							<div className="text-xs text-[#808191]">unlocked</div>	
							<img className="w-[20px] h-[20px]" src={unlock}></img>

						</div>
					}
				</div>
				<div className="flex justify-between gap-[10px] items-center p-5">
					<div className="flex gap-[8px] items-center">
						<img src={achivement} className="w-[45px] h-[45px] rounded-full"></img>
						<div className="text-sm text-[#808191]">Play 7 Matches In Total</div>
					</div>
					{
						(Achi.some((obj : any) => obj.name === "Played 3 Games") === true ) ? null :
						<div className="flex gap-[8px] items-center">
							<div className="text-xs text-[#808191]">unlocked</div>	
							<img className="w-[20px] h-[20px]" src={unlock}></img>

						</div>
					}
				</div>
            </div>
        </div>
		</>
	)
}