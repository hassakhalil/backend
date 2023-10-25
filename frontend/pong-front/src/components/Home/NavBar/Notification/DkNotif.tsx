import { NotifMsg } from "./NotifMsg"
import { NotifRoom } from "./NotifRoom"

export function DkNotif () {
	return (
		<>
			<div className="fixed bg-white right-56 top-10 zz border shadow-xl rounded-custom w-[550px] h-[450px] scrollable-div-ver5 Dk-display">
			<div className="text-[#11142D] text-md font-medium pt-10 pl-10 ">Recent Notification</div>
                <NotifMsg profile="/src/assets/hhamdy.jpg" name="Saad Mney" requestType="Request a 1 game to win" time="12h"/>
                <NotifMsg profile="/src/assets/hhamdy.jpg" name="Hassan d3if" requestType="Request a 1 game to win" time="12h"/>
                <NotifMsg profile="/src/assets/hhamdy.jpg" name="Houssam nadi" requestType="Request a 1 game to win" time="12h"/>
                <NotifMsg profile="/src/assets/hhamdy.jpg" name="Adnan" requestType="Request a 1 game to win" time="12h"/>
                <NotifRoom profile="/src/assets/hhamdy.jpg" name="Adnan" time="12h" RoomName="LeetPong"/>
			</div>
		</>
	)
}