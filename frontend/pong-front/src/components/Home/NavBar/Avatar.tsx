import React from "react";
import { Link } from "react-router-dom";
import {useEffect} from 'react'
import { useProfilecontext } from "../../../ProfileContext";
import { OffLine } from "../Friends/status/OffLine";
import { Enline } from "../Friends/status/Enline";
import { Playing } from "../Friends/status/Playing";
interface Props {
	avatar: string,
	name: string,
	state : string,
}

export function Avatar ( {avatar, name, state}: Props ) {

	const profile = useProfilecontext()
	useEffect(()=>
	{
		
	},[profile]);
	useEffect(() =>
	{

	}, [state])

    return (
        <>
			<Link to={`/profile/${name}`}>
				{/* <button>
					<img src={avatar} className="rounded-full w-[30px] h-[30px] lg:w-[45px] lg:h-[45px]" alt="profile"></img>
						{state === 'offline' && <OffLine/>}
						{state === 'online' && <Enline/>}
						{state === 'ingame' && <Playing/>}
				</button> */}
				<div className="flex relative items-center justify-center rounded-full h-[60px] w-[60px]">
					<img src={avatar} className="absolute bbc rounded-full w-[50px] h-[50px]" />
					<div className="absolute right-0 top-0">
						{state  === 'offline' && <OffLine/>}
						{state === 'online' && <Enline />}
						{state === 'ingame' && <Playing/>}
					</div>
				</div>
			</Link>
        </>
    )
}