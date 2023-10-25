import arrow from "/src/assets/Arrrow.svg"
import { LiveGame } from "./LiveGame"

export function LiveMatch () {
    return (
        <>
        <div className="flex flex-col justify-center items-center">
            <div className="text-blue-900 font-poppins text-2xl font-semibold leading-normal tracking-wider pb-10">Live Matches</div>
            <button className="border bg-gray-100 w-3/5 h-[48px] rounded-xl flex justify-center items-center">
                <div className="mr-auto pl-10 font-normal text-[#808191]">
                    Popular
                </div>
                <div className="ml-auto pr-10">
                    <img src={arrow}></img>
                </div>
            </button>
            <div className="w-full">
                <LiveGame gametype="7 GAME TO WIN" watching="7.2k" imgPath="src/assets/img4.png"/>
                <LiveGame gametype="5 GAME TO WIN" watching="6.2k" imgPath="src/assets/img5.png"/>
                <LiveGame gametype="1 GAME TO WIN" watching="3.1k" imgPath="src/assets/img6.png"/>
                <LiveGame gametype="3 GAME TO WIN" watching="1.3k" imgPath="src/assets/img7.png"/>
            </div>
        </div>
        </>
    )
}