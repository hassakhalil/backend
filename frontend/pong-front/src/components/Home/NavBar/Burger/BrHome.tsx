import { Link } from "react-router-dom"

interface Props {
	buttonColors: { [key: string]: string }
	strokeColor: { [key: string]: string }
	handleClick: (buttonName: string, imgNum: string) => void;
}

export function BrHome ( {buttonColors, strokeColor, handleClick}: Props ) {
    return (
        <>
            <div className="pr-8 pl-8">
			<Link to="/home">

                    <button onClick={() => handleClick('button1', 'img1')} style={{ backgroundColor: buttonColors.button1 }} className="flex items-center pl-8 bg-[#6C5DD3] w-full h-[56px] rounded-2xl">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g id="House">
					<path id="Vector" fill-rule="evenodd" clip-rule="evenodd" d="M3 20.25V10.5H4.5V20.25C4.5 20.4489 4.57902 20.6397 4.71967 20.7803C4.86032 20.921 5.05109 21 5.25 21H18.75C18.9489 21 19.1397 20.921 19.2803 20.7803C19.421 20.6397 19.5 20.4489 19.5 20.25V10.5H21V20.25C21 20.8467 20.7629 21.419 20.341 21.841C19.919 22.2629 19.3467 22.5 18.75 22.5H5.25C4.65326 22.5 4.08097 22.2629 3.65901 21.841C3.23705 21.419 3 20.8467 3 20.25ZM19.5 3.75V9L16.5 6V3.75C16.5 3.55109 16.579 3.36032 16.7197 3.21967C16.8603 3.07902 17.0511 3 17.25 3H18.75C18.9489 3 19.1397 3.07902 19.2803 3.21967C19.421 3.36032 19.5 3.55109 19.5 3.75Z" fill={strokeColor.img1}/>
					<path id="Vector_2" fill-rule="evenodd" clip-rule="evenodd" d="M10.9395 2.24997C11.2208 1.96876 11.6022 1.81079 12 1.81079C12.3977 1.81079 12.7792 1.96876 13.0605 2.24997L23.031 12.219C23.1718 12.3598 23.2509 12.5508 23.2509 12.75C23.2509 12.9491 23.1718 13.1401 23.031 13.281C22.8901 13.4218 22.6991 13.5009 22.5 13.5009C22.3008 13.5009 22.1098 13.4218 21.969 13.281L12 3.31047L2.03097 13.281C1.89014 13.4218 1.69913 13.5009 1.49997 13.5009C1.30081 13.5009 1.1098 13.4218 0.968971 13.281C0.828141 13.1401 0.749023 12.9491 0.749023 12.75C0.749023 12.5508 0.828141 12.3598 0.968971 12.219L10.9395 2.24997Z" fill={strokeColor.img1}/>
					</g>
				</svg>
                        <div className={`pl-8 text-[${strokeColor.img1}] font-semibold text-base`}>Home</div>
                    </button>
			</Link>
                </div>
        </>
    )
}