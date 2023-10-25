import React from "react"

interface Props {
    profile: string,
    name: string,
    status: string,
}

export function BrFriends ( {profile, name, status}: Props ) {

    return (
        <>
		<a href={`/profile/${name}`}>
            <button className="flex items-center pt-5">
                <div className="w-[24px] h-[24px]">
                    <img src={profile} className="rounded-full"></img>
                </div>
                <div className="pl-4 text-[#808191]">
                    {name}
                </div>
                <div className="absolute right-0">
                    <img src={status} className="pr-16"></img>
                </div>
            </button>
		</a>
        </>
    )
}