import { AddMember } from "./AddMember";
import { GroupRestriction } from "./GroupRestriction";
import rmv from "/src/assets/remove.svg"
import React from "react";


export function GroupSettings() {
	const [remove, setRemove] = React.useState(false);
  
	return (
	  <>
		{remove ? null : (
			
			<div className="blur-background lg:centred-component">

			<div className="bg-gray-100 px-8 shadow rounded-custom lg:w-[50%] w-full xl:w-[40%] lg:h-[80%] h-full pt-32  lg:pt-10 overflow-hidden centered-component">
					<div className="flex items-center justify-between">
						<div className="text-[#1B1D21] font-semibold text-xl">Room Setting</div>
						<button
						onClick={() => setRemove(!remove)}
						className="flex items-center justify-center border bg-white rounded-full w-12 h-12 shadow-xl"
						>
						<img src={rmv} alt="Remove" />
						</button>
					</div>
					<div className="pt-3 h-[70vh]">

					<div className="h-full">
							<div className="w-full h-2/6 overflow-y-auto">
								<GroupRestriction/>
								<GroupRestriction/>
								<GroupRestriction/>
								<GroupRestriction/>
								<GroupRestriction/>
								<GroupRestriction/>
								<GroupRestriction/>
								<GroupRestriction/>
								<GroupRestriction/>
								<GroupRestriction/>
								<GroupRestriction/>
								<GroupRestriction/>

							</div>
								<div className="flex items-center justify-center text-2xl font-semibold font-sans text-[#11142D] pt-5">Add Friends to room</div>
								<div className="px-8 py-4">
									<input type="search" className="shadow-md h-[50px] w-full rounded-xl focus:outline-none px-4 pr-10" placeholder="Search..."/>
								</div>
							<div className="w-full pt-3 h-3/6 overflow-y-auto pb-10">
								<AddMember/>
								<AddMember/>
								<AddMember/>
								<AddMember/>
								<AddMember/>
								<AddMember/>
								<AddMember/>
								<AddMember/>
								<AddMember/>
							</div>

					</div>
					</div>
				</div>
		</div>

		)}
	  </>
	);
  }