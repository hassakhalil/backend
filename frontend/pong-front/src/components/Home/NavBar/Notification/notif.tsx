import React, { useContext } from "react"
import { DkNotif } from "./DkNotif"
import { NotifMsg } from "./NotifMsg"
import { NotifRoom } from "./NotifRoom"
import { MyContext } from "../../../../pages/Profile"

export function Notif () {


	const MyData = useContext(MyContext);
    return (
        <>
            <div className="flex flex-col p-8 pt-[140px] notif-container lg:hidden">
                <div className="text-[#11142D] text-2xl font-medium">Recent Notification</div>
				{MyData?.MyuserData?.pending_requests.map((notif: {id: number, avatar: string; username: string} , index: number) => (
						<div key={index}>
							<NotifMsg profile={notif.avatar} name={notif.username} requestType="Request a friend invitation"/>
						</div>
					))
					}
            </div>
			<DkNotif/>
        </>
    )
}