import dot from "../../assets/dot.svg"
import React from "react"

interface Props {
    gameType: string,
    TableType: string,
    Views: string,
    imgPath: string;
}

export function Cards ( {gameType, TableType, Views, imgPath}: Props ) {
    console.log(imgPath + " maroc");
    return (
        <>
        <div className="flex z-[9999]">
            <div className="w-[104px] h-[96px] rounded-lg overflow-hidden">
                <img src={imgPath} alt="image" className="bbc w-full h-full"></img>
            </div>
            <div className="items-center text-white paddingLeft-40">
                <h3 className="p-1 font-semibold">{gameType}</h3>
                <h3 className="text-gray-100 text-sm Poppins">{TableType}</h3>
                <div className="flex p-1">
                    <img src={dot}></img>
                    <h3 className="text-gray-100 Poppins text-sm paddingLeft-10">{Views}</h3>
                </div>
            </div>
        </div>
        </>
    )
}