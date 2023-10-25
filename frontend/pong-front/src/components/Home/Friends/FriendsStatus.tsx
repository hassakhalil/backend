import React from "react"

interface Props {
    avatar: string,
    name: string,
	state: string,
}

export function FriendStatus ( {avatar, name, state}: Props ) {
    return (
        <>
            <div className="flex flex-col justify-center items-center pl-10">
                <button className="flex items-center justify-center border border-[3px] border-[#0049C6] rounded-full w-[80px] h-[80px]">
                    <img src={avatar} className="bbc rounded-full w-[68px] h-[68px]"></img>
                </button>
                <div className="pt-2 pl-3 lg:text-lg">
                    {name}
                </div>
				<div className="pt-2 pl-3 text-sm text-[#808191CC]">
                    {state}
                </div>
            </div>
        </>
    )
}