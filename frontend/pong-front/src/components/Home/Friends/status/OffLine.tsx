import offsign from "/src/assets/offsign.svg"

export function OffLine () {
    return (
        <>
            <div className="border rounded-full bg-[#FF5F1F] w-[30px] h-[30px] lg:w-[50px] lg:h-[50px] flex items-center justify-center">
                <img src={offsign} className="lg:w-[20px] lg:h-[20px]"></img>
            </div>
        </>
    )
}