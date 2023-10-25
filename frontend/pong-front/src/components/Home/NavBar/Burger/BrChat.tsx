import React from "react";
import { MbChat } from "../../../Chat/MbChat";
import { Link } from "react-router-dom";

interface Props {
    msgnum: string
	buttonColors: { [key: string]: string }
	strokeColor: { [key: string]: string }
	handleClick: (buttonName: string, imgNum: string) => void;
}

export function BrChat ( {msgnum, buttonColors, strokeColor, handleClick}: Props ) {

    return (
        <>
		<div className="pr-8 pl-8">
			<Link to="/Chat">
                <button onClick={() => handleClick('button5', 'img5')} style={{ backgroundColor: buttonColors.button5 }} className="flex w-full h-[56px] pl-8  items-center rounded-2xl">
                    <div>
					<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g id="Chat">
						<path id="Path" fill-rule="evenodd" clip-rule="evenodd" d="M11.0568 1.00008C7.54687 0.985898 4.28557 2.80704 2.4605 5.80035C0.635434 8.79366 0.512919 12.5223 2.13757 15.6286L2.33789 16.0191C2.50209 16.3264 2.53644 16.6864 2.43329 17.0191C2.14742 17.7784 1.90849 18.5544 1.71784 19.3429C1.71784 19.7429 1.83231 19.9715 2.26158 19.962C3.0219 19.7941 3.77068 19.5777 4.50332 19.3143C4.81886 19.2274 5.15437 19.2475 5.45725 19.3715C5.73389 19.5048 6.2967 19.8477 6.31578 19.8477C9.99154 21.7804 14.4808 21.2472 17.5998 18.5074C20.7187 15.7676 21.8199 11.39 20.3676 7.50403C18.9153 3.61809 15.2111 1.03053 11.0568 1.00008V1.00008Z" stroke={strokeColor.img5} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						<ellipse id="Oval" cx="6.28751" cy="11.0001" rx="0.476965" ry="0.47619" stroke={strokeColor.img5} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						<ellipse id="Oval_2" cx="11.057" cy="11.0001" rx="0.476965" ry="0.47619" stroke={strokeColor.img5} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						<ellipse id="Oval_3" cx="15.8266" cy="11.0001" rx="0.476965" ry="0.47619" stroke={strokeColor.img5} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</g>
					</svg>

                    </div>
                    <div className={`pl-8 text-[${strokeColor.img5}] font-semibold text-base`}>Chat</div>
                    <div className="flex items-center justify-center absolute right-0 pr-16">
                        <div className="flex items-center justify-center border border-[#FF5F1F] bg-[#FF5F1F] rounded-full w-[24px] h-[24px]">
                            <div className="text-white text-sm">{msgnum}</div>
                        </div>  
                    </div>
                </button>
			</Link>
		</div>
        </>
    )
}