import video from "/src/assets/video.svg"
// import { Link } from "react-router-dom"

interface Props {
	buttonColors: { [key: string]: string }
	strokeColor: { [key: string]: string }
	handleClick: (buttonName: string, imgNum: string) => void;
}

export function BrVideo ( {buttonColors, strokeColor, handleClick}: Props ) {
    return (
        <>
           <div className="pr-8 pl-8">
		   <button onClick={() => handleClick('button3', 'img3')} style={{ backgroundColor: buttonColors.button3 }} className="flex items-center pl-8 bg-[#6C5DD3] w-full h-[56px] rounded-2xl">
		   <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g id="video">
			<path id="Path" d="M15.5 7.6L17.3314 6.2814C18.6544 5.32887 20.5 6.27427 20.5 7.90447V12.0955C20.5 13.7257 18.6544 14.6711 17.3314 13.7186L15.5 12.4" stroke={strokeColor.img3} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
			<rect id="Rectangle" x="1.5" y="1" width="14" height="18" rx="4" stroke={strokeColor.img3} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
			</g>
			</svg>
                <div className={`pl-8 text-[${strokeColor.img3}] font-semibold text-base`}>Live Games</div>
                </button>
            </div>
        </>
    )
}