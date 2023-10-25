import hhamdy from "/src/assets/hhamdy.jpg"
import ban from "/src/assets/ban.svg"
import mute from "/src/assets/mute.svg"
import kick from "/src/assets/kickOut.svg"

export function GroupRestriction () {
	return (
		<>
		<div className="pb-5">

			<div className="w-full h-[75px] drop-shadow-lg bg-white rounded-custom flex flex-row items-center justify-around">
				<button className="flex items-center gap-[5px]">
					<img src={hhamdy} className="w-[30px] h-[30px] rounded-full"></img>
					<div className="text-sm text-[#353E6C]">hhamdy</div>
				</button>
				<button className="flex items-center">
					<img src={ban} className="pt-2"></img>
					<div className="text-xs text-[#353E6C]">ban</div>
				</button>
				<button className="flex items-center gap-[4px]">
					<img src={mute} className=""></img>
					<div className="text-xs text-[#353E6C]">Mute</div>
				</button>
				<button className="flex items-center">
					<img src={kick} className=""></img>
					<div className="text-xs text-[#353E6C]">Kick out</div>
				</button>
			</div>
		</div>
		</>
	)
}