interface Props {
    profile: string,
    name: string,
    RoomName: string,
    time: string
}

export function NotifRoom ( {profile, name, RoomName, time}: Props ) {
    return (
        <>
		<div className="lg:pb-5">

            <div className="flex items-center border w-full h-[90px] lg:h-[90px] bg-[#6C5DD3] lg:pr-10 lg:pl-10 rounded-2xl">
                <div>
                    <img src={profile} className="rounded-full w-[48px] h-[48px] lg:w-[50px] lg:h-[50px]"></img>
                </div>
                <div className="pl-6 flex flex-col gap-[6px]">
                    <div className="flex">
                        <div className="text-white lg:text-md">{name}</div>
                        <div className="text-white absolute right-0 pr-16">{time}</div>
                    </div>
                    <div className="text-white lg:text-md">Add you to a room <span className="font-bold lg:text-md">{RoomName}.</span> </div>
                </div>
            </div>
		</div>
        </>
    )
}