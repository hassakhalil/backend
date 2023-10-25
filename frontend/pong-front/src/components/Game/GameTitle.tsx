import gameType from "/src/assets/7_win_game.png"
import box from "/src/assets/box.svg"
import replay from "/src/assets/replay.svg"

export function GameTitle () {
	return (
		<>
		<div className="flex game-mobile justify-center sm:justify-between">
			<div className="flex sm:flex-col lg:flex-row gap-6 items-center justify-center sm:pr-10">
				<div className="flex gap-[10px] items-center justify-center border bg-[#E4E4E47F] hover:bg-gray-200 transition duration-400 ease-in-out border-[#E4E4E47F] rounded-2xl w-[140px] h-[55px]">
					<div>
						<img src={replay}></img>
					</div>
					<div className="text-[#808191] font-semibold text-md">Shuffle play</div>
				</div>
				<div className="flex gap-[10px] items-center justify-center border bg-[#FF754C] hover:bg-[#FF5722] transition duration-400 ease-in-out border[#FF754C] rounded-2xl w-[130px] h-[55px]">
					<div>
						<img src={box}></img>
					</div>
					<div className="text-white font-semibold text-md">ReGame</div>
				</div>
			</div>
		</div>
		</>
	)
}