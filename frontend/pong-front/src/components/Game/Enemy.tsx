import check from "/src/assets/check.svg"
import plusFriend from "/src/assets/PersonPlusFill.svg"
import { Enline } from "../Home/Friends/status/Enline"


interface Props {
	profile: string,
	name: string,
	friendNum: string,
}

export function Enemy ( {profile, name, friendNum}: Props ) {
	return (
		<>
			<div className=" flex-col pt-8 gap-8  pb-10 items-center">
					<div className="flex gap-6">
					<div className="flex items-center justify-center border border-[3px] border-[#0049C6] rounded-full w-[75px]  h-[75px] sm:w-[85px] sm:h-[85px]">
							<img src={profile} className="absolute bbc rounded-full w-[57px] h-[57px] sm:w-[67px] sm:h-[67px]"></img>
							<div className="absolute pb-12 pl-14 lg:pb-14 lg:pl-16">
								<Enline/>
							</div>
					</div>
					<div className="flex flex-col justify-center gap-4">
						<div className="flex">
							<div className="whitespace-nowrap text-xl">{name}</div>
							<div className="pl-4">
								<img src={check} className="w-[25px] h-[25px]"></img>
							</div>
						</div>
						<div className="text-sm text-[#808191]">{friendNum} Friends</div>
					</div>
					</div>
					{/* <div className="flex gap-1">
						<button className="flex justify-center items-center border rounded-xl bg-[#6C5DD3] border-[#6C5DD3] h-[45px] w-[100px] pr-">
								<div className="text-white font-semibold lg:text-sm">Message</div>
						</button>
					</div> */}
				</div>
		</>
	)
}