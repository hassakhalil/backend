import { StartGaming } from "../../Start/StartGaming"


import start from "/src/assets/Start.png"


export function BrStart () {
    return (
        <>
            <div className="p-8 lg:hidden">
                    <div style={{backgroundImage:`url(${start})`}} className="bg-cover drop-shadow-xl bg-no-repeat bg-center rounded-custom w-full h-[350px]">
                    <div className="flex flex-col pl-10 pt-16">
                        <div className="flex flex-col text-white text-3xl font-bold">
                            <div>Join</div>
                            <div>Cyberpong</div>
                            <div>Game</div>
                        </div>
                        <div className="flex flex-col text-white text-md pt-5 pb-2">
                            <div>Discover the best</div>
                            <div>ping pong game</div>
                            <div>anywhere.</div>
                        </div>
                        <div className="pr-10">
                            <StartGaming/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}