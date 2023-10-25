import { useState } from "react"
import { Enline } from "../../Home/Friends/status/Enline"
import { GameMode } from "../GamMode"
import check from "/src/assets/check.svg"
import play from "/src/assets/Game.svg"
import plusFriend from "/src/assets/PersonPlusFill.svg"
import Friendadded from "/src/assets/Friends.svg"
import block from "/src/assets/block.svg"
import { Add } from "../../Home/NavBar/Notification/add"
import axios from "axios"
import { useEffect, useContext } from "react"
import React from "react"
import { MbGameMode } from "../MbGameMode"

interface Props {
	profile: string,
	name: string,
	friendNum: string,
	me: boolean,
}

import { MyContext, UserContext } from "../../../pages/Profile"
import { Link, useNavigate } from "react-router-dom"

export function HeadProfile ( {profile, name, friendNum, me}: Props ) {
	
	const data = useContext(UserContext);
	const Mydata = useContext(MyContext);
	const [gameMode, setGameMode] = useState(false);
	const [clicked, setClick] = useState(false);
	const [search, Setsearch] = useState(false);

	const handleMode = () => {
		setGameMode(!gameMode);
	}

	const handleFriend = async () => {
		try {
			console.log(name);
			const response = await axios.post(`http://${import.meta.env.VITE_API_URL}/add-friend/${name}`, null, { withCredentials: true })
			.then (function (response) {
				setClick(true);
			});
		} catch (error) {
			console.error('POST friend failed:', error);
			}
		};
		
	const handleSearch = () => {
		Setsearch(!search);
	}

	
	const blockFriend = async () => {
		try {
			const response = await axios.post(`http://${import.meta.env.VITE_API_URL}/block-friend/${name}`, null, {withCredentials: true});
		}
		catch (error) {
			console.log(error);
		}
	}

	const [isFriend, setFriend] = useState(false);

	useEffect(() => {
		Mydata?.MyuserData.friends.some(
			(friend: {username: string}) => {
				friend.username === name && setFriend(true);
			}
		);
		});

		const handleUnFriend = async () => {
			try {
				console.log(name);
				const response = await axios.delete(`http://${import.meta.env.VITE_API_URL}/delete-friend/${name}`, { withCredentials: true })
				.then (function (response) {
					setClick(true);
				});
			} catch (error) {
				console.error('POST friend failed:', error);
				}
			};

		const handleFriendreq = () => {
			console.log(isFriend)
			{ isFriend ? handleUnFriend() :
				handleFriend()
			}
		}
	return (
		<>
		<div className="pt-32 pl-10 pr-10 lg:pl-36 lg:pr-10">
			<div className="w-full h-[215px] sm:h-[150px] pr-6 pl-6 border border-white rounded-custom shadow">
				<div className="flex flex-col sm:flex-row sm:justify-around pt-8 gap-8">
					<div className="flex gap-6">
					<div className="flex relative items-center justify-center border border-[3px] border-[#0049C6] rounded-full w-[75px]  h-[75px] sm:w-[85px] sm:h-[85px]">
						<img src={profile} className="absolute bbc rounded-full w-[57px] h-[57px] sm:w-[67px] sm:h-[67px]"/>
							<div className="absolute right-0 top-0">
								<Enline/>
							</div>
					</div>
					<div className="flex flex-col justify-center gap-4">
						<div className="flex">
							<div className="whitespace-nowrap text-xl">{name}</div>
							<div className="pl-4">
								<img src={check} className="w-[25px] h-[25px]"></img>
							</div>
						</div>
						<div className="text-sm text-[#808191]">{friendNum} Friends</div>
					</div>
					</div>
					<div className="flex gap-7 items-center justify-around">
					{
						me ? null :
						<button className="flex justify-center items-center border rounded-xl bg-[#6C5DD3] border-[#6C5DD3] h-[45px] w-[100px] pr-">
								<div className="text-white font-semibold lg:text-sm">Message</div>
						</button>
					}
					{
							isFriend ?
							<button className={`flex items-center justify-center border border-gray-100 bg-gray-100 w-[50px] h-[45px] shadow rounded-xl`} onClick={handleFriendreq}>
								<img src={Friendadded} className="w-[24px] h-[24px]"></img>
							</button>
						:
						me ?
						(
							search ?
							<>
								<button className={`flex items-center justify-center border border-[#6C5DD3] bg-[#6C5DD3] w-[50px] h-[45px] shadow rounded-xl`} onClick={handleSearch}>
									<img src={plusFriend} className="w-[24px] h-[24px]"></img>
								</button>
								<Add hide={() => {Setsearch(!search)}}/>
							</>
							:
							<button className={`flex items-center justify-center border border-[#6C5DD3] bg-[#6C5DD3] w-[50px] h-[45px] shadow rounded-xl`} onClick={handleSearch}>
							<img src={plusFriend} className="w-[24px] h-[24px]"></img>
							</button>
						) :
							<button className={`flex items-center justify-center border border-[#6C5DD3] bg-[#6C5DD3] w-[50px] h-[45px] shadow rounded-xl`} onClick={handleFriendreq}>
							<img src={plusFriend} className="w-[24px] h-[24px]"></img>
							</button>
						  

					}
						<button className="flex items-center justify-center pb-[4px] border border-[#6C5DD3] bg-[#6C5DD3] w-[50px] h-[45px] shadow rounded-xl" onClick={handleMode}>
							<img src={play}></img>
						</button>
						{
							me ? null :
							<a href="/profile/me">
								<button className={`flex items-center justify-center border w-[50px] border-[#6C5DD3] bg-[#6C5DD3] h-[45px] shadow rounded-xl`} onClick={blockFriend}>
									<img src={block} className="w-[24px] h-[24px]"></img>
								</button>
							</a>
						}
					</div>
				</div>
			</div>
		</div>
		{ gameMode && 
			<div>
				<GameMode hide={()=> setGameMode(!gameMode)}/>
				<MbGameMode hide={()=> setGameMode(!gameMode)}/>
			</div>
		}
		</>
	)
}