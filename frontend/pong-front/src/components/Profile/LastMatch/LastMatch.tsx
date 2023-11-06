import calendar from "/src/assets/Calendar.svg";
import divide from "/src/assets/divide.svg";
import React from "react";

interface Props {
//   date: string;
  length: number
  name: string;
  profile: string;
  score: number	
  My_name: string;
  My_profile: string;
  My_score: number,
}

export function LastMatch({  name, profile, length, score, My_name, My_profile, My_score }: Props) {
  return (
    <>
      <div className="pt-10 md:pb-10 flex justify-center">
        <div className="border border-white w-[290px] h-[460px] xl:w-[630px] xl:h-[190px] shadow rounded-custom">
          <div className="flex flex-col gap-5 items-center justify-center pt-5">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-center">
              <div className="text-lg text-[#353E6C] font-bold xl:pr-64 tracking-wider">
                Last Match
              </div>
              {/* <div className="flex gap-1">
                <div className="text-xs text-[#BACCFD] whitespace-nowrap">
                  {date}
                </div>
                <img src={calendar}></img>
              </div> */}
            </div>
			{
				(length === 0) ? <div className="text-xl xl:pt-8 pt-32">No Game Played Yet</div> : 
				<div className="xl:flex">

				<div className="flex flex-col xl:flex-row items-center justify-center gap-1">
				<div className="text-xl font-bold text-[#121212] xl:hidden">{My_name}</div>
				<img
					src={My_profile}
					className="w-[80px] h-[80px] xl:w-[60px] xl:h-[60px] rounded-full xl:hidden"
				></img>
				<div className="flex items-center gap-[15px]">
					<img
						src={My_profile}
						className="w-[80px] h-[80px] xl:w-[60px] xl:h-[60px] rounded-full mobile-nav-bar sm:hidden xl:block"
					></img>
					<div className="text-xl font-bold text-[#121212] sm:hidden mobile-nav-bar xl:block">{My_name}</div>
					<div className={`font-bold xl:text-3xl text-xl xl:pl-4 ${(My_score > score) ? "text-[#14D1A4]" : "text-[#FF8F8F]"}`}>{My_score}</div>

				</div>
				</div>
				<div className="flex items-center justify-center xl:pr-8 xl:pl-8">
				<img src={divide}></img>
				</div>
				<div className="flex flex-col xl:flex-row items-center gap-1">
				<div className={`font-bold xl:text-3xl text-xl ${(score > My_score) ? "text-[#14D1A4]" : "text-[#FF8F8F]"} xl:hidden`}>{score}</div>
				<img
					src={profile}
					className="w-[80px] h-[80px] xl:w-[60px] xl:h-[60px] rounded-full xl:hidden"
					></img>
				<div className="text-xl font-bold text-[#121212] xl:hidden">{name}</div>
				<div className="flex items-center justify-center gap-[15px]">
				<div className={`font-bold xl:text-3xl text-xl ${(score > My_score) ? "text-[#14D1A4]" : "text-[#FF8F8F]"} xl:pr-4 hidden xl:block`}>{score}</div>
				<div className="text-xl font-bold text-[#121212] sm:hidden mobile-nav-bar xl:block">{name}</div>
				<a href={`/profile/${name}`}>
				<img
				src={profile}
				className="w-[80px] h-[80px] xl:w-[60px] xl:h-[60px] rounded-full mobile-nav-bar sm:hidden xl:block"
				></img>
				</a>
				</div>
				</div>
				</div>
			}
          </div>
        </div>
      </div>
    </>
  );
}
