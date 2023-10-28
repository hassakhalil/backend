import React from "react"


interface Props {
	buttonColors: { [key: string]: string }
	strokeColor: { [key: string]: string }
	handleClick: (buttonName: string, imgNum: string) => void;
}

export function BrProfile (  {buttonColors, strokeColor, handleClick}: Props ) {
    return (
        <>
           <div className="pr-8 pl-8">
		   <a href="/profile/me">
		   	<button onClick={() => handleClick('button2', 'img2')} style={{ backgroundColor: buttonColors.button2 }} className="flex items-center pl-8 bg-[#6C5DD3] w-full h-[56px] rounded-2xl">
				<svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g id="Profile">
					<circle id="Ellipse_736" cx="9.07881" cy="5.77803" r="4.77803" stroke={strokeColor.img2} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					<path id="Path_33945" fill-rule="evenodd" clip-rule="evenodd" d="M1.50002 17.2013C1.49873 16.8654 1.57385 16.5336 1.7197 16.2311C2.17736 15.3157 3.46798 14.8306 4.53892 14.6109C5.31128 14.4461 6.09431 14.336 6.88217 14.2814C8.34084 14.1533 9.80793 14.1533 11.2666 14.2814C12.0544 14.3366 12.8374 14.4467 13.6099 14.6109C14.6808 14.8306 15.9714 15.27 16.4291 16.2311C16.7224 16.8479 16.7224 17.5639 16.4291 18.1807C15.9714 19.1418 14.6808 19.5812 13.6099 19.7917C12.8384 19.9633 12.0551 20.0766 11.2666 20.1304C10.0794 20.231 8.88659 20.2494 7.69681 20.1853C7.42221 20.1853 7.15677 20.1853 6.88217 20.1304C6.09663 20.0772 5.31632 19.964 4.54807 19.7917C3.46798 19.5812 2.18652 19.1418 1.7197 18.1807C1.5746 17.8746 1.49955 17.54 1.50002 17.2013Z" stroke={strokeColor.img2} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</g>
					</svg>
					<div className={`pl-8 text-[${strokeColor.img2}] font-semibold text-base`}>Profile</div>
                </button>
				</a>
            </div>
        </>
    )
}