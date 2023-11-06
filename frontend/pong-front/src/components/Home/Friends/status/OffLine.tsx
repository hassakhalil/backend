import offsign from "/src/assets/offsign.svg"

export function OffLine () {
    return (
        <>
            <div className="border rounded-full bg-[#FF5F1F] w-[25px] h-[25px] flex items-center pl-[1px] justify-center">
                <img src={offsign} className="w-[14px] h-[14px]"></img>
            </div>
        </>
    )
}