import React from "react"
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

interface Props {
	//   date: string;
	  name: string;
	  profile: string;
	  score: number	
	  My_name: string | undefined
	  My_profile: string | undefined
	  My_score: number | undefined
	}

export function GameRes ( {name, profile, score, My_name, My_profile, My_score}: Props ) {
    return (
        <>
            <div className="border drop-shadow-lg bg-white rounded-custom w-full h-[55px] lg:h-[65px]">
                <div className="flex justify-around items-center gap-1 p-[7px]">
                    <img src={My_profile} className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full"></img>
                    <div className="flex justify-center text-xs text-[#808191] items-center border bg-[#F4F4FF] rounded-md w-[44px] h-[21px] lg:w-[60px] lg:h-[30px] lg:text-[15px]">{My_name}</div>
                    <div className="border flex justify-center items-center border-gray-200  rounded-md w-[44px] h-[14px] lg:w-[60px] lg:h-[30px]">
                        <div className="flex justify-center items-center text-xs lg:text-[15px] gap-[7px]">
                            <div className={`${(My_score > score) ? "text-[#14D1A4]" : "text-[#FF8F8F]"}`}>{My_score}</div>
                            <div className="text-gray-500">-</div>
                            <div className={`${(score > My_score) ? "text-[#14D1A4]" : "text-[#FF8F8F]"}`}>{score}</div>

                        </div>
                    </div>
                    <div className="flex justify-center text-xs text-[#808191] items-center border bg-[#F4F4FF] rounded-md w-[44px] h-[21px] lg:w-[60px] lg:h-[30px] lg:text-[15px]">{name}</div>
					<Link to={`/profile/${name}`}>
						<img src={profile} className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full"></img>
					</Link>
                </div>
            </div>
        </>
    )
}