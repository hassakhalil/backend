import { FriendPoints } from "./Friendpoints"

export function MyFriends () {
    return (
        <>
        <div className="lg:flex lg:justify-center lg:items-center p-10 pt-0">
            <div className="flex flex-col border h-[700px] w-full lg:w-full lg:h-[700px] rounded-custom drop-shadow-lg bg-[#FFF]">
                <div className="flex justify-center items-center pt-12 text-blue-900 font-poppins text-2xl font-semibold leading-normal tracking-wider lg:text-2xl">Friends</div>
                <div className="flex flex-col scrollable-div-ver2">
                    <FriendPoints Profile="/src/assets/ahamdy.jpg" name="Houssam" win="45" Losses="1"/>
                    <FriendPoints Profile="/src/assets/ahamdy.jpg" name="Houssam" win="45" Losses="1"/>
                    <FriendPoints Profile="/src/assets/ahamdy.jpg" name="Houssam" win="45" Losses="1"/>
                    <FriendPoints Profile="/src/assets/ahamdy.jpg" name="Houssam" win="45" Losses="1"/>
                    <FriendPoints Profile="/src/assets/ahamdy.jpg" name="Houssam" win="45" Losses="1"/>
                    <FriendPoints Profile="/src/assets/ahamdy.jpg" name="Houssam" win="45" Losses="1"/>
                    <FriendPoints Profile="/src/assets/ahamdy.jpg" name="Houssam" win="45" Losses="1"/>
                </div>
            </div>
        </div>
        </>
    )
}