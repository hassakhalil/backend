import profile from "/src/assets/hhamdy.jpg"

interface Props {
    name: string,
    GoalNum: string,
}

export function PlayerStatus ( {name, GoalNum}: Props ) {
    return (
        <>
            <div className="flex pl-5 pt-3">
                    <img src={profile} className="w-[40px] h-[40px] rounded-full"></img>
                    <div className="flex flex-col pl-5">
                        <div className="text-[#808191] font-medium"> {name}</div>
                        <div className="text[#BACCFD] font-xs font-extralight"> {GoalNum} Goals</div>
                    </div>
                </div>
        </>
    )
}