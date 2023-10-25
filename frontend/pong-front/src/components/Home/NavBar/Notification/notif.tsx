import { DkNotif } from "./DkNotif"
import { NotifMsg } from "./NotifMsg"
import { NotifRoom } from "./NotifRoom"

export function Notif () {
    return (
        <>
            <div className="flex flex-col p-8 pt-[140px] notif-container lg:hidden">
                <div className="text-[#11142D] text-2xl font-medium">Recent Notification</div>
                <NotifMsg profile="/src/assets/hhamdy.jpg" name="Saad Mney" requestType="Request a 1 game to win" time="12h"/>
                <NotifMsg profile="/src/assets/hhamdy.jpg" name="Hassan d3if" requestType="Request a 1 game to win" time="12h"/>
                <NotifMsg profile="/src/assets/hhamdy.jpg" name="Houssam nadi" requestType="Request a 1 game to win" time="12h"/>
                <NotifMsg profile="/src/assets/hhamdy.jpg" name="Adnan" requestType="Request a 1 game to win" time="12h"/>
                <NotifRoom profile="/src/assets/hhamdy.jpg" name="Adnan" time="12h" RoomName="LeetPong"/>
            </div>
			<DkNotif/>
        </>
    )
}