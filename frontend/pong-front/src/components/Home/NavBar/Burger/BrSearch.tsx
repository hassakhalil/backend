import React, { useState } from "react";
import { DkSearch } from "../../../Search/DkSearch";

interface Props {
	buttonColors: { [key: string]: string }
	strokeColor: { [key: string]: string }
	handleClick: (buttonName: string, imgNum: string) => void;
}

export function BrSearch ( {buttonColors, strokeColor, handleClick}: Props ) {

	const [search, setsearch] = useState(false);

	return (
		<>
		<div className="pr-8 pl-8">
			<button onClick={() => {handleClick('button1', 'img1'); setsearch(!search)}} style={{ backgroundColor: buttonColors.button1 }} className={`flex items-center pl-7 bg-[#6C5DD3] w-full h-[56px] rounded-2xl`}>
			<svg width="25px" height="25px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M22 11.8201C22 9.84228 21.4135 7.90885 20.3147 6.26436C19.2159 4.61987 17.6542 3.33813 15.8269 2.58126C13.9996 1.82438 11.9889 1.62637 10.0491 2.01223C8.10927 2.39808 6.32748 3.35052 4.92896 4.74904C3.53043 6.14757 2.578 7.92935 2.19214 9.86916C1.80629 11.809 2.00436 13.8197 2.76123 15.6469C3.51811 17.4742 4.79985 19.036 6.44434 20.1348C8.08883 21.2336 10.0222 21.8201 12 21.8201" stroke={strokeColor.img1} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
				<path d="M2 11.8201H22" stroke={strokeColor.img1} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
				<path d="M12 21.8201C10.07 21.8201 8.5 17.3401 8.5 11.8201C8.5 6.30007 10.07 1.82007 12 1.82007C13.93 1.82007 15.5 6.30007 15.5 11.8201" stroke={strokeColor.img1} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
				<path d="M18.3691 21.6901C20.3021 21.6901 21.8691 20.1231 21.8691 18.1901C21.8691 16.2571 20.3021 14.6901 18.3691 14.6901C16.4361 14.6901 14.8691 16.2571 14.8691 18.1901C14.8691 20.1231 16.4361 21.6901 18.3691 21.6901Z" stroke={strokeColor.img1} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
				<path d="M22.9998 22.8202L20.8398 20.6702" stroke={strokeColor.img1} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
				</svg>
			<div className={`pl-8 text-[${strokeColor.img1}] font-semibold text-base`}>Invite a Friend</div>
				</button>
		</div>
		{search &&
			<div>
				<DkSearch hide={() => setsearch(!search)}/>
			</div>
		}
		</>
	)
}