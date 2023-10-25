import React from "react";
import { DkSettings } from "../../../settings/DkSettings";
import { MbSettings } from "../../../settings/MbSettings";


interface Props {
	buttonColors: { [key: string]: string }
	strokeColor: { [key: string]: string }
	handleClick: (buttonName: string, imgNum: string) => void;
}

export function BrSettings ( {buttonColors, strokeColor, handleClick}: Props ) {
	const [settings, SetSettings] = React.useState(false);

    return (
        <>
		<div className="pr-8">
            <button  onClick={() => {handleClick('button6', 'img6'); SetSettings(!settings)}} style={{ backgroundColor: buttonColors.button6 }} className="flex gap-5 pl-8 items-center bg-[#6C5DD3] w-full h-[56px] rounded-2xl">
                <div>
				<svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g id="Setting">
					<path id="Path_33946" fill-rule="evenodd" clip-rule="evenodd" d="M18.8064 6.62361L18.184 5.54352C17.6574 4.6296 16.4905 4.31432 15.5753 4.83872V4.83872C15.1397 5.09534 14.6198 5.16815 14.1305 5.04109C13.6411 4.91402 13.2224 4.59752 12.9666 4.16137C12.8021 3.88415 12.7137 3.56839 12.7103 3.24604V3.24604C12.7251 2.72922 12.5302 2.2284 12.1698 1.85767C11.8094 1.48694 11.3143 1.27786 10.7973 1.27808H9.54326C9.03672 1.27807 8.55107 1.47991 8.19376 1.83895C7.83644 2.19798 7.63693 2.68459 7.63937 3.19112V3.19112C7.62435 4.23693 6.77224 5.07681 5.72632 5.0767C5.40397 5.07336 5.08821 4.98494 4.81099 4.82041V4.82041C3.89582 4.29601 2.72887 4.61129 2.20229 5.52522L1.5341 6.62361C1.00817 7.53639 1.31916 8.70261 2.22975 9.23231V9.23231C2.82166 9.57404 3.18629 10.2056 3.18629 10.8891C3.18629 11.5725 2.82166 12.2041 2.22975 12.5458V12.5458C1.32031 13.0719 1.00898 14.2353 1.5341 15.1454V15.1454L2.16568 16.2346C2.4124 16.6798 2.82636 17.0083 3.31595 17.1474C3.80554 17.2866 4.3304 17.2249 4.77438 16.976V16.976C5.21084 16.7213 5.73094 16.6516 6.2191 16.7822C6.70725 16.9128 7.12299 17.233 7.37392 17.6717C7.53845 17.9489 7.62686 18.2646 7.63021 18.587V18.587C7.63021 19.6435 8.48671 20.5 9.54326 20.5H10.7973C11.8502 20.5001 12.7053 19.6491 12.7103 18.5962V18.5962C12.7079 18.088 12.9086 17.6 13.2679 17.2407C13.6272 16.8814 14.1152 16.6807 14.6233 16.6831C14.9449 16.6917 15.2594 16.7798 15.5387 16.9394V16.9394C16.4515 17.4653 17.6177 17.1544 18.1474 16.2438V16.2438L18.8064 15.1454C19.0615 14.7075 19.1315 14.186 19.001 13.6964C18.8704 13.2067 18.55 12.7894 18.1108 12.5367V12.5367C17.6715 12.284 17.3511 11.8666 17.2206 11.3769C17.09 10.8873 17.16 10.3658 17.4151 9.92796C17.581 9.63834 17.8211 9.3982 18.1108 9.23231V9.23231C19.0159 8.70289 19.3262 7.54349 18.8064 6.63277V6.63277V6.62361Z" stroke={strokeColor.img6} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					<circle id="Ellipse_737" cx="10.1752" cy="10.8891" r="2.63616" stroke={strokeColor.img6} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</g>
				</svg>
                </div>
                <div className={`pl-4 text-[${strokeColor.img6}] font-semibold text-base`}>Settings</div>
            </button>
		</div>
		{ settings && <DkSettings hide={() => SetSettings(false)}/> }
		{ settings && <MbSettings hide={() => SetSettings(false)}/>}
        </>
    )
}