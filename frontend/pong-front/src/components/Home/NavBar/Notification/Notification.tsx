import React from "react"
import notif from "/src/assets/bell.png"
import { UserContext } from "../../../../pages/Profile"
import { ChatSocketContext, ChatSocketProvider } from "../../../Chat/contexts/chatContext"
import { useContext } from "react"
import { useDataContext } from "../../../Profile/States/stateContext"
import { useProfilecontext } from "../../../../ProfileContext"
// import useEffect from 'rea
interface Props {
    clicked: () => void
}

export function Notification({ clicked }: Props) {

    const chatContext = useContext(ChatSocketContext);
    const state = useDataContext();
    const profile = useProfilecontext();
    React.useEffect(() => {

            chatContext?.on('gameRequest', (notif: {id: number, avatar: string; username: string, type : string}) => {

                // if (!profile?.data.pending_requests.find(newRequest))
                profile?.setData((prevUserData) => ({
                    ...prevUserData,
                    pending_requests: [...prevUserData.pending_requests, notif],
                  }));
            })


            chatContext?.on('friendRequest', (notif: {id: number, avatar: string; username: string, type : string}) => {

                // if (!profile?.data.pending_requests.find(newRequest))
                profile?.setData((prevUserData) => ({
                    ...prevUserData,
                    pending_requests: [...prevUserData.pending_requests, notif],
                  }));
            })
          return () =>{
        // chatContext?.off('State');
        chatContext?.off('friendRequest')
        chatContext?.off('gameRequest')}
          
    }, [chatContext, profile?.data?.user_data.avatar, state, profile?.setData])

    return (
        <>
            <button onClick={clicked}>
                <div className="flex items-center justify-center">
                    <img src={notif} className="flex items-center justify-center absolute sm:w-[30px] sm:h-[30px]"></img>
                    <div>
						{
							(profile?.data?.pending_requests?.length === 0) ? null : 
							<div className="relative left-[12px] bottom-[10px] pt-[3px] flex items-center justify-center border border-[#FF5F1F] bg-[#FF5F1F] rounded-full w-[20px] h-[20px]">
								<div className="text-white text-sm sm:text-md">{profile?.data?.pending_requests?.length}</div>
							</div>
						}
                    </div>
                </div>
            </button>
        </>
    )
}