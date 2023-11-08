import { StartGaming } from "./StartGaming"

export function StartEnjoying () {
    return (
        <>
            <div className="pt-11 p-10 lg:p-0 flex items-center drop-shadow-lg justify-center lg:pr-[32px] lg:pl-0 lg:pr-0 ">
                <div className="path1 bg-black bg-cover bg-no-repeat bg-center rounded-custom w-full h-[200px] lg:h-[280px] lg:w-full">
                    <div className="flex flex-col pt-10 justify-center items-center font-normal text-xl lg:text-3xl sm:pt-12 lg:pt-20 rubik-moonrocks text-[#FFF]">
                        <h1>START ENJOYING</h1>
                        <h1>THE GAME</h1>
                    </div>
                    <div className="pt-6 pr-12 pl-12 lg:pt-5">
                        <StartGaming/>
                    </div>
                </div>
            </div>
        </>
    )
}