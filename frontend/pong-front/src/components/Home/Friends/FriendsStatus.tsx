import React from "react"
import { useProfilecontext } from "../../../ProfileContext";
import { useNavigate  } from "react-router-dom";

interface Props {
    avatar: string,
    name: string,
	// state: string,
    id: number
    hide: () => void
}

export function FriendStatus ( {avatar, name, id, hide}: Props ) {

    const profile = useProfilecontext()
    const navigate = useNavigate()
    const handlePlay = () => {


        hide();
        navigate('/game', { state: { gameDuration: 6, user_id: profile?.data?.user_data?.id, OpponentId : id} });
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center pl-10">
                <button className="flex items-center justify-center border border-[3px] border-[#0049C6] rounded-full w-[80px] h-[80px]" onClick={handlePlay}>
                    <img src={avatar} className="bbc rounded-full w-[68px] h-[68px]"></img>
                </button>
                <div className="pt-2 pl-3 lg:text-lg">
                    {name}
                </div>
            </div>
        </>
    )
}