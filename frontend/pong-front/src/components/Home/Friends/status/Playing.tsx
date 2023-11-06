import playing from "/src/assets/Playing.svg"

export function Playing () {
    return (
        <>
            <button className="border rounded-full bg-[#6C5DD3] w-[25px] h-[25px] flex items-center justify-center">
                <img src={playing} className="pl-[1px] w-[12px] h-[12px]"></img>
            </button>
        </>
    )
}