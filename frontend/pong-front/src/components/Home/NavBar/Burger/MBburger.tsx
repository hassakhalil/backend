import { Avatar } from "../Avatar"
import down from "/src/assets/small-down.svg"
import logo from "/src/assets/mainLogo.svg"
import { useState } from "react"
import React from "react"
import { Link, NavLink, useNavigate, useParams } from "react-router-dom"
import { DkSettings } from "../../../settings/DkSettings"
import { GameMode } from "../../../Profile/GamMode"
import axios from "axios"
import { Navigate } from "react-router-dom"
import { useEffect } from "react"
import { MbGameMode } from "../../../Profile/MbGameMode"
import { MyContext, UserContext } from "../../../../pages/Profile"
import { useContext } from "react";
import { MbSettings } from "../../../settings/MbSettings"
import { useDataContext } from "../../../Profile/States/stateContext"
import { ChatSocketContext } from "../../../Chat/contexts/chatContext"



interface friendsList{
	id:  '',
	username: '',
	avatar:    '',
	state:    '',
  }

export function  MBburger (  ) {

	const data = useContext(MyContext);
	const state = useDataContext();
	const chatContext = useContext(ChatSocketContext);
	useEffect(()=>
	{
		if (chatContext?.connected)
		console.log('connected >>>>>>>>>>>>>>>>>>	')
	chatContext?.on('State', (friendState : friendsList)=>
	{
	console.log('on state --------------------------------------<>')
	state?.setData((old) =>
	old.map((item : friendsList) => (item.id === friendState.id ? { ...item, ...friendState } : item))
	)})

	}, [chatContext])
	// const {param} = useParams();
	// let isOnline = 'ingame'
		// console.log('before comparison-----------------------')
		// console.log('comparison = ---------------',  (state?.data[state?.data.length - 1].state && state?.data[state?.data.length - 1].state === isOnline));
	// console.log(param + " this is you param");


	const initialColors: { [key: string]: string } = {
		button1: 'initial',
		button2: 'initial',
		button3: 'initial',
		button4: 'initial',
		button5: 'initial',
		button6: 'initial',
	};
	
	const strokeColors: { [key: string]: string } = {
		img1: '#808191',
		img2: '#808191',
		img3: '#808191',
		img4: '#808191',
		img5: '#808191',
		img6: '#808191',
	};

	const [click, SetClick] = useState(false);
	const [buttonColors, setButtonColors] = useState(initialColors);
	const [strokeColor, setstrokeColor] = useState(strokeColors);
    const [settings, SetSettings] = React.useState(false);
	const [game, Setgame] = useState(false);
	const [logout, Setlogout] = useState(false);
	

		const handleClick = (buttonName: string, imgNum: string) => {
			SetClick(!click)
			const newColors = { ...initialColors };
			const newImgs = { ...strokeColors };
			
			newColors[buttonName] = '#6C5DD3';
			newImgs[imgNum] = '#FFF';
			setButtonColors(newColors);
			setstrokeColor(newImgs);
		};
	

	
	return (
		<>
		<div className="h-screen border w-[112px] flex justify-center">
			<div className="flex flex-col gap-3 items-center pt-4">
			<a href="/profile/me">
				<img src={logo} className="w-[90px] h-[90px] pb-8"></img>
			</a>
			<NavLink to="/profile/me">
				<button onClick={() => {handleClick('button2', 'img2')}} style={{ backgroundColor: buttonColors.button2 }} className={`p-3 border shadow-md border-white w-[50px] h-[50px]  flex items-center justify-center rounded-2xl `}>
				<svg width="20" height="20" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
				
					<g id="Profile">
					<circle id="Ellipse_736" cx="9.07881" cy="5.77803" r="4.77803" stroke={strokeColor.img2} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					<path id="Path_33945" fill-rule="evenodd" clip-rule="evenodd" d="M1.50002 17.2013C1.49873 16.8654 1.57385 16.5336 1.7197 16.2311C2.17736 15.3157 3.46798 14.8306 4.53892 14.6109C5.31128 14.4461 6.09431 14.336 6.88217 14.2814C8.34084 14.1533 9.80793 14.1533 11.2666 14.2814C12.0544 14.3366 12.8374 14.4467 13.6099 14.6109C14.6808 14.8306 15.9714 15.27 16.4291 16.2311C16.7224 16.8479 16.7224 17.5639 16.4291 18.1807C15.9714 19.1418 14.6808 19.5812 13.6099 19.7917C12.8384 19.9633 12.0551 20.0766 11.2666 20.1304C10.0794 20.231 8.88659 20.2494 7.69681 20.1853C7.42221 20.1853 7.15677 20.1853 6.88217 20.1304C6.09663 20.0772 5.31632 19.964 4.54807 19.7917C3.46798 19.5812 2.18652 19.1418 1.7197 18.1807C1.5746 17.8746 1.49955 17.54 1.50002 17.2013Z" stroke={strokeColor.img2} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</g>
				</svg>
                </button>
			</NavLink>
		
			<NavLink to="/Chat">
				<button onClick={() => handleClick('button3', 'img3')} style={{ backgroundColor: buttonColors.button3 }} className={`p-3 border shadow-md border-white w-[50px] h-[50px] flex items-center justify-center rounded-2xl `}>
				<svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g id="Chat">
					<path id="Path" fill-rule="evenodd" clip-rule="evenodd" d="M11.0568 1.00008C7.54687 0.985898 4.28557 2.80704 2.4605 5.80035C0.635434 8.79366 0.512919 12.5223 2.13757 15.6286L2.33789 16.0191C2.50209 16.3264 2.53644 16.6864 2.43329 17.0191C2.14742 17.7784 1.90849 18.5544 1.71784 19.3429C1.71784 19.7429 1.83231 19.9715 2.26158 19.962C3.0219 19.7941 3.77068 19.5777 4.50332 19.3143C4.81886 19.2274 5.15437 19.2475 5.45725 19.3715C5.73389 19.5048 6.2967 19.8477 6.31578 19.8477C9.99154 21.7804 14.4808 21.2472 17.5998 18.5074C20.7187 15.7676 21.8199 11.39 20.3676 7.50403C18.9153 3.61809 15.2111 1.03053 11.0568 1.00008V1.00008Z" stroke={strokeColor.img3} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					<ellipse id="Oval" cx="6.28751" cy="11.0001" rx="0.476965" ry="0.47619" stroke={strokeColor.img3} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					<ellipse id="Oval_2" cx="11.057" cyerror="11.0001" rx="0.476965" ry="0.47619" stroke={strokeColor.img3} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					<ellipse id="Oval_3" cx="15.8266" cy="11.0001" rx="0.476965" ry="0.47619" stroke={strokeColor.img3} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</g>
					</svg>
				</button>
				</NavLink>
				<button onClick={() => {handleClick('button4', 'img4'), Setgame(!game)}} style={{ backgroundColor: buttonColors.button4 }} className={`p-3 border shadow-md border-white w-[50px] h-[50px] flex items-center justify-center rounded-2xl `}>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g id="Iconly/Two-tone/Game">
					<g id="Game">
					<path id="Stroke 1" d="M8.84819 12.314V16.059" 	stroke={strokeColor.img4} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					<path id="Stroke 2" d="M10.7586 14.1868H6.9375"  stroke={strokeColor.img4} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					<path id="Stroke 3" d="M15.3665 12.428H15.2595"  stroke={strokeColor.img4} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					<path id="Stroke 4" d="M17.18 16.0027H17.073"  stroke={strokeColor.img4} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					<path id="Stroke 5" opacity="0.4" d="M8.07227 2V2C8.07227 2.74048 8.68475 3.34076 9.44029 3.34076H10.4968C11.6624 3.34492 12.6065 4.27026 12.6118 5.41266V6.08771"  stroke={strokeColor.img4} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					<path id="Stroke 7" fill-rule="evenodd" clip-rule="evenodd" d="M16.4283 21.9625C13.4231 22.0134 10.473 22.0113 7.57275 21.9625C4.3535 21.9625 2 19.6663 2 16.5112V11.8616C2 8.70651 4.3535 6.41029 7.57275 6.41029C10.4889 6.36044 13.4411 6.36148 16.4283 6.41029C19.6476 6.41029 22 8.70755 22 11.8616V16.5112C22 19.6663 19.6476 21.9625 16.4283 21.9625Z"  stroke={strokeColor.img4} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</g>
					</g>
				</svg>
				</button>


                <div className="flex items-center justify-center text-[#808191] text-sm lg:text-md pt-16">Friends</div>
				<div className="flex flex-col pl-1 pt-5 gap-3 scrollable-div-ver6">
					<div>
						{data?.MyuserData?.friends?.map((friend: { avatar: string; username: string }, index: number) => (
							<div key={index}>
								<Avatar avatar={friend.avatar} name={friend.username}/>
							</div>
						))
						}
					</div>
				</div>
				<div className="flex items-center justify-center pb-16 pt-5">
					<img src={down} className="w-[12px] h-[12px]"></img>
				</div>


				<button onClick={() => {handleClick('button6', 'img6'); SetSettings(!settings)}} style={{ backgroundColor: buttonColors.button6 }} className={`p-3 border shadow-md border-white w-[50px] h-[50px] flex items-center justify-center rounded-2xl `}>
				<svg width="20" height="20" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g id="Setting">
					<path id="Path_33946" fill-rule="evenodd" clip-rule="evenodd" d="M18.8064 6.62361L18.184 5.54352C17.6574 4.6296 16.4905 4.31432 15.5753 4.83872V4.83872C15.1397 5.09534 14.6198 5.16815 14.1305 5.04109C13.6411 4.91402 13.2224 4.59752 12.9666 4.16137C12.8021 3.88415 12.7137 3.56839 12.7103 3.24604V3.24604C12.7251 2.72922 12.5302 2.2284 12.1698 1.85767C11.8094 1.48694 11.3143 1.27786 10.7973 1.27808H9.54326C9.03672 1.27807 8.55107 1.47991 8.19376 1.83895C7.83644 2.19798 7.63693 2.68459 7.63937 3.19112V3.19112C7.62435 4.23693 6.77224 5.07681 5.72632 5.0767C5.40397 5.07336 5.08821 4.98494 4.81099 4.82041V4.82041C3.89582 4.29601 2.72887 4.61129 2.20229 5.52522L1.5341 6.62361C1.00817 7.53639 1.31916 8.70261 2.22975 9.23231V9.23231C2.82166 9.57404 3.18629 10.2056 3.18629 10.8891C3.18629 11.5725 2.82166 12.2041 2.22975 12.5458V12.5458C1.32031 13.0719 1.00898 14.2353 1.5341 15.1454V15.1454L2.16568 16.2346C2.4124 16.6798 2.82636 17.0083 3.31595 17.1474C3.80554 17.2866 4.3304 17.2249 4.77438 16.976V16.976C5.21084 16.7213 5.73094 16.6516 6.2191 16.7822C6.70725 16.9128 7.12299 17.233 7.37392 17.6717C7.53845 17.9489 7.62686 18.2646 7.63021 18.587V18.587C7.63021 19.6435 8.48671 20.5 9.54326 20.5H10.7973C11.8502 20.5001 12.7053 19.6491 12.7103 18.5962V18.5962C12.7079 18.088 12.9086 17.6 13.2679 17.2407C13.6272 16.8814 14.1152 16.6807 14.6233 16.6831C14.9449 16.6917 15.2594 16.7798 15.5387 16.9394V16.9394C16.4515 17.4653 17.6177 17.1544 18.1474 16.2438V16.2438L18.8064 15.1454C19.0615 14.7075 19.1315 14.186 19.001 13.6964C18.8704 13.2067 18.55 12.7894 18.1108 12.5367V12.5367C17.6715 12.284 17.3511 11.8666 17.2206 11.3769C17.09 10.8873 17.16 10.3658 17.4151 9.92796C17.581 9.63834 17.8211 9.3982 18.1108 9.23231V9.23231C19.0159 8.70289 19.3262 7.54349 18.8064 6.63277V6.63277V6.62361Z" stroke={strokeColor.img6} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					<circle id="Ellipse_737" cx="10.1752" cy="10.8891" r="2.63616" stroke={strokeColor.img6} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</g>
				</svg>
				</button>
				<a href={`http://${import.meta.env.VITE_API_URL}/logout`}>
				<button onClick={() => {handleClick('button5', 'img5'); Setlogout(!logout)}} style={{ backgroundColor: buttonColors.button5 }} className={`p-3 border shadow-md border-white w-[50px] h-[50px] flex items-center justify-center rounded-2xl `}>
				<svg fill="#808191" height="20" width="20" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 489.9 489.9">
						<g><g><g>
							<path d="M468.3,255.8c0.1-0.1,0.1-0.1,0.2-0.2c0.3-0.4,0.6-0.7,0.8-1.1c0.1-0.1,0.1-0.2,0.2-0.3c0.2-0.4,0.5-0.8,0.7-1.2
								c0-0.1,0.1-0.2,0.1-0.2c0.2-0.4,0.4-0.8,0.6-1.3c0-0.1,0-0.1,0.1-0.2c0.2-0.4,0.3-0.9,0.5-1.4c0-0.1,0-0.2,0.1-0.2
								c0.1-0.5,0.3-0.9,0.3-1.4c0-0.2,0-0.3,0.1-0.5c0.1-0.4,0.1-0.8,0.2-1.2c0.1-0.6,0.1-1.1,0.1-1.7c0-0.6,0-1.1-0.1-1.7
								c0-0.4-0.1-0.8-0.2-1.2c0-0.2,0-0.3-0.1-0.5c-0.1-0.5-0.2-0.9-0.3-1.4c0-0.1,0-0.2-0.1-0.2c-0.1-0.5-0.3-0.9-0.5-1.4
								c0-0.1,0-0.1-0.1-0.2c-0.2-0.4-0.4-0.9-0.6-1.3c0-0.1-0.1-0.2-0.1-0.2c-0.2-0.4-0.4-0.8-0.7-1.2c-0.1-0.1-0.1-0.2-0.2-0.3
								c-0.3-0.4-0.5-0.8-0.8-1.1c-0.1-0.1-0.1-0.1-0.2-0.2c-0.4-0.4-0.7-0.9-1.2-1.3l-98.9-98.8c-6.7-6.7-17.6-6.7-24.3,0
								c-6.7,6.7-6.7,17.6,0,24.3l69.6,69.6H136.8c-9.5,0-17.2,7.7-17.2,17.1c0,9.5,7.7,17.2,17.2,17.2h276.8l-69.1,69.1
								c-6.7,6.7-6.7,17.6,0,24.3c3.3,3.3,7.7,5,12.1,5s8.8-1.7,12.1-5l98.3-98.3C467.5,256.6,467.9,256.2,468.3,255.8z"/>
							<path d="M110.7,34.3h128c9.5,0,17.2-7.7,17.2-17.1c0-9.5-7.7-17.2-17.2-17.2h-128C59.4,0,17.6,41.8,17.6,93.1v303.7
								c0,51.3,41.8,93.1,93.1,93.1h125.9c9.5,0,17.2-7.7,17.2-17.1c0-9.5-7.7-17.2-17.2-17.2H110.7c-32.4,0-58.8-26.4-58.8-58.8V93.1
								C52,60.6,78.3,34.3,110.7,34.3z"/>
						</g></g></g>
					</svg>
				</button>
				</a>
			</div>
		</div>
		{settings &&
			<div>
				<DkSettings hide={() => SetSettings(false)}/>
				<MbSettings hide={() => SetSettings(false)}/>
			</div>
		}
		{game  && 
					<div>
						<GameMode hide={() => {}}/>
						<MbGameMode  hide={() => {}}/>
					</div>

				}
		</>
	)
}