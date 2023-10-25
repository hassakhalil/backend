import profile from "/src/assets/hhamdy.jpg"
import unlock from "/src/assets/unlock.svg"
import achivement from "/src/assets/achivement.png"

export function Achivement () {
	return (
		<>
			<div className="lg:flex lg:justify-center lg:items-center p-10 pt-0">
            <div className="flex flex-col border h-[700px] w-full lg:w-full lg:h-[700px] rounded-custom drop-shadow-lg bg-[#FFF]">
                <div className="flex justify-center items-center pt-12 text-blue-900 font-poppins text-2xl font-semibold leading-normal tracking-wider lg:text-2xl pb-4">Achivements</div>
                <div className="flex justify-between gap-[10px] items-center p-5">
					<div className="flex gap-[8px] items-center">
						<img src={achivement} className="w-[45px] h-[45px] rounded-full"></img>
						<div className="text-sm text-[#808191]">First Scrore</div>
					</div>
					<div className="flex gap-[8px] items-center">
						<div className="text-xs text-[#808191]">unlocked</div>
						<img src={unlock}></img>
					</div>
				</div>
				<div className="flex justify-between gap-[10px] items-center p-5">
					<div className="flex gap-[8px] items-center">
						<img src={achivement} className="w-[45px] h-[45px] rounded-full"></img>
						<div className="text-sm text-[#808191]">Win first game</div>
					</div>
					<div className="flex gap-[8px] items-center">
						<div className="text-xs text-[#808191]">unlocked</div>
						<img src={unlock}></img>
					</div>
				</div>
				<div className="flex justify-between gap-[10px] items-center p-5">
					<div className="flex gap-[8px] items-center">
						<img src={achivement} className="w-[45px] h-[45px] rounded-full"></img>
						<div className="text-sm text-[#808191]">Beat first friend</div>
					</div>
					<div className="flex gap-[8px] items-center">
						<div className="text-xs text-[#808191]">unlocked</div>
						<img src={unlock}></img>
					</div>
				</div>
				<div className="flex justify-between gap-[10px] items-center p-5">
					<div className="flex gap-[8px] items-center">
						<img src={achivement} className="w-[45px] h-[45px] rounded-full"></img>
						<div className="text-sm text-[#808191]">Win 3 Game in Row</div>
					</div>
					<div className="flex gap-[8px] items-center">
						<div className="text-xs text-[#808191]">unlocked</div>
						<img src={unlock}></img>
					</div>
				</div>
				<div className="flex justify-between gap-[10px] items-center p-5">
					<div className="flex gap-[8px] items-center">
						<img src={achivement} className="w-[45px] h-[45px] rounded-full"></img>
						<div className="text-sm text-[#808191]">Score 100</div>
					</div>
					<div className="flex gap-[8px] items-center">
						<div className="text-xs text-[#808191]">unlocked</div>
						<img src={unlock}></img>
					</div>
				</div>
				<div className="flex justify-between gap-[10px] items-center p-5">
					<div className="flex gap-[8px] items-center">
						<img src={achivement} className="w-[45px] h-[45px] rounded-full"></img>
						<div className="text-sm text-[#808191]">Beat friend 3 time in Row </div>
					</div>
					<div className="flex gap-[8px] items-center">
						<div className="text-xs text-[#808191]">unlocked</div>
						<img src={unlock}></img>
					</div>
				</div>
				<div className="flex justify-between gap-[10px] items-center p-5">
					<div className="flex gap-[8px] items-center">
						<img src={achivement} className="w-[45px] h-[45px] rounded-full"></img>
						<div className="text-sm text-[#808191]">Beat 3 friend in Row</div>
					</div>
					<div className="flex gap-[8px] items-center">
						<div className="text-xs text-[#808191]">unlocked</div>
						<img src={unlock}></img>
					</div>
				</div>
            </div>
        </div>
		</>
	)
}