interface Props {
    Profile: string,
    rank: string,
    name: string,
    win: string,
    Losses: string;
}

export function Leader ( {Profile, rank, name, win, Losses}: Props ) {
    return (
        <>
            <div className="flex items-center justify-around pb-7 pt-10 p-5 lg:pt-5">
                <button>
                    <img src={Profile} className="rounded-full w-[46px] h-[46px] lg:w-[50px] lg:h-[50px]"></img>
                </button>
                <div className="flex items-center justify-center border bg-gray-100 rounded-lg h-[26px] w-[26px] lg:w-[30px] lg:h-[30px]">
                    <div className="font-poppins text-sm lg:text-lg text-[#5961F9] font-bold">{rank}</div>
                </div>
                <div className="text-gray-400 flex items-center justify-center text-center font-poppins font-semibold text-xs lg:text-lg font-normal leading-5">
                    {name}
                </div>
                <div className="flex items-center justify-center">
                    <div className="flex flex-col lg:gap-2">
                        <div className="text-[#14D1A4] text-base font-bold lg:text-lg">Win</div>
                        <div className="text-[#FF5473] text-base font-bold lg:text-lg">Losses</div>
                    </div>
                    <div className="flex flex-col lg:gap-2">
                        <div className="text-[#14D1A4] text-base font-bold pl-2 lg:text-lg">{win}</div>
                        <div className="text-[#FF5473] text-base font-bold pl-2 lg:text-lg">{Losses}</div>
                    </div>
                </div> 
            </div>
            <div className="pr-5 pl-5">
                <div className="border-t border-gray-300"></div>
            </div>
        </>
    )
}