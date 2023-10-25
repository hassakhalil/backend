import { GameRes } from "./GameRes"

export function LatestMatches () {
    return (
        <>
            <div className="flex flex-col justify-center items-center px-10 pb-10">
                <div className="border bg-white drop-shadow-lg rounded-custom w-full h-[700px]">
					<div className="flex justify-center items-center text-blue-900 font-poppins text-xl pt-10 font-semibold leading-normal tracking-wider lg:pb-5 lg:pt-10 lg:text-2xl">Last Played Matches </div>
                    <div className="flex flex-col items-center justify-center gap-y-6 p-3 pt-10 lg:pt-80 lg:pb-10 scrollable-div-ver8">
                        <GameRes/>
                        <GameRes/>
                        <GameRes/>
                        <GameRes/>
                        <GameRes/>
                        <GameRes/>
                        <GameRes/>
                        <GameRes/>
                        <GameRes/>
                        <GameRes/>
                    </div>
                </div>
            </div>
        </>
    )
}