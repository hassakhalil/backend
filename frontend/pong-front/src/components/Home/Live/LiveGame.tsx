import profile from "/src/assets/hhamdy.jpg"
import dot from "/src/assets/BlueDot.svg"
import wifi from "/src/assets/offsign.svg"

import { PlayerStatus } from "./PlayerStatus"

interface Props {
    imgPath: string,
    gametype: string,
    watching: string,
}

export function LiveGame ( { gametype, watching, imgPath}: Props ) {
    return (
        <>
        <div className="flex flex-col items-center justify-center p-10">
            <div className="flex flex-col bg-white drop-shadow-xl border rounded-custom h-[410px] w-full">
                <div style={{backgroundImage:`url(${imgPath})`}} className="bg-cover drop-shadow-xl bg-no-repeat bg-center rounded-custom-img w-full h-[190px]">
                    <div className="flex flex-col pt-10 justify-center items-center font-normal text-3xl rubik-moonrocks text-[#222C67]">
                        <h1>{gametype}</h1>
                        <h1>MATCH</h1>
                    </div>
                </div>
                <PlayerStatus name="houssam" GoalNum="3"/>
                <div className="pl-5 pt-2 font-extrabold text-[#6C5DD3]">
                    VS
                </div>
                <PlayerStatus name="Mohamed 6" GoalNum="6"/>
                <div className="flex pt-4 pl-10">
                    <div className="flex gap-[8px] items-center justify-center rounded-xl border bg-[#FF754C] w-[90px] h-[24px]">
                        <img src={wifi}></img>
                        <div className="text-white text-xs pt-[2px]">Live</div>
                    </div>
                    <div className="flex absolute right-0 pr-10">
                        <img src={dot} className="pr-2"></img>
                        <div>{watching} watching</div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}