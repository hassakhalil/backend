import React, { useContext, useState } from "react"
import { NotifMsg } from "./NotifMsg"
// import { NotifRoom } from "./NotifRoom"
import { MyContext } from "../../../../pages/Profile"
import { useProfilecontext } from "../../../../ProfileContext"
import { useEffect } from "react"
import { DkNotif } from "./DkNotif"

export function Notif () {


	const profile = useProfilecontext();
	const [show, setshow] = useState(true);
		useEffect(()=>
		{

		}, [profile?.data, profile?.setData])
	// const MyData = useContext(MyContext);
	// const profile = 
    return (
        <>
		{
			show ? 
            <div className="flex flex-col p-8 pt-[140px] notif-container lg:hidden">
                <div className="text-[#11142D] text-2xl font-medium">Recent Notification</div>
				{profile?.data?.pending_requests.map((notif: {id: number, avatar: string, username: string , type : string} , index: number) => (
						<div key={index}>
							<NotifMsg profile={notif.avatar} name={notif.username} requestType={notif.type} id={notif.id} show={() => setshow(false)}/>
						</div>
					))
					}
            </div> : null
		}
		<DkNotif/>
        </>
    )
}