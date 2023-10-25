import React from "react"

export function GameRes () {
    return (
        <>
            <div className="border drop-shadow-lg bg-white rounded-custom w-full h-[55px] lg:h-[65px]">
                <div className="flex justify-around items-center gap-1 p-[7px]">
                    <img src="/src/assets/hhamdy.jpg " className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full"></img>
                    <div className="flex justify-center text-xs text-[#808191] items-center border bg-[#F4F4FF] rounded-md w-[44px] h-[21px] lg:w-[60px] lg:h-[30px] lg:text-lg">Saad</div>
                    <div className="border flex justify-center items-center border-gray-200  rounded-md w-[44px] h-[14px] lg:w-[60px] lg:h-[30px]">
                        <div className="flex justify-center items-center text-xs lg:text-lg gap-[7px]">
                            <div className="text-[#14D1A4]">8</div>
                            <div className="text-gray-500">-</div>
                            <div className="text-[#FF8F8F]">3</div>
                        </div>
                    </div>
                    <div className="flex justify-center text-xs text-[#808191] items-center border bg-[#F4F4FF] rounded-md w-[44px] h-[21px] lg:w-[60px] lg:h-[30px] lg:text-lg">Saad</div>
                    <img src="/src/assets/hhamdy.jpg " className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full"></img>
                </div>
            </div>
        </>
    )
}