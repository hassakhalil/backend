import hhamdy from "/src/assets/hhamdy.jpg"

export function AddMember () {
	return (
		<>
		<div className="py-1">

			<div className="w-full h-[60px] drop-shadow-lg bg-white rounded-custom flex flex-row items-center justify-around">
				<div className="flex gap-[8px] items-center">
					<img src={hhamdy} className="w-[30px] h-[30px] rounded-full"></img>
					<div className="text-sm text-[#353E6C]">hhamdy</div>
				</div>
				<button className="flex items-center justify-center bg-[#6C5DD3] h-[30px] rounded-custom w-[100px]">
					<div className="text-white text-xs font-semibold pt-[2px]">Add menmber</div>
				</button>
			</div>
		</div>
		</>
	)
}