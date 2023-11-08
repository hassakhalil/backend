import { useState } from "react"
import { GameMode } from "../../Profile/GamMode"

export function StartGaming () {

	const [clicked, setClick] = useState(false);
    return (
        <>
            <div className="flex items-center justify-center">
                <button className="flex justify-center items-center bg-[#6C5DD3] w-full sm:w-[350px] h-[56px] md:h-[40px] md:h-[60px] rounded-2xl" onClick={() => setClick(!clicked)}>
                    <h1 className="text-white Inter text-base font-bold sm:text-lg">START GAMING</h1>
                </button>
            </div>
			{clicked && <GameMode/>}
        </>
    )
}