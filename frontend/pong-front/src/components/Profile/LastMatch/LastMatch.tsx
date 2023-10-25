import calendar from "/src/assets/Calendar.svg";
import divide from "/src/assets/divide.svg";
import React from "react";

interface Props {
  date: string;
  name1: string;
  profile1: string;
  name2: string;
  profile2: string;
}

export function LastMatch({ date, name1, profile1, name2, profile2 }: Props) {
  return (
    <>
      <div className="pt-10 md:pb-10 flex justify-center">
        <div className="border border-white w-[290px] h-[460px] xl:w-[630px] xl:h-[190px] shadow rounded-custom">
          <div className="flex flex-col gap-5 items-center justify-center pt-5">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-center">
              <div className="text-lg text-[#353E6C] font-bold xl:pr-64 tracking-wider">
                Last Match
              </div>
              <div className="flex gap-1">
                <div className="text-xs text-[#BACCFD] whitespace-nowrap">
                  {date}
                </div>
                <img src={calendar}></img>
              </div>
            </div>
            <div className="xl:flex">

            <div className="flex flex-col xl:flex-row items-center gap-1">
              <div className="text-xl font-bold text-[#121212] xl:hidden">{name1}</div>
              <img
                src={profile1}
                className="w-[80px] h-[80px] xl:w-[60px] xl:h-[60px] rounded-full xl:hidden"
              ></img>
			  <div className="flex items-center gap-[15px]">
				<img
					src={profile1}
					className="w-[80px] h-[80px] xl:w-[60px] xl:h-[60px] rounded-full mobile-nav-bar sm:hidden xl:block"
				></img>
				<div className="text-xl font-bold text-[#121212] sm:hidden mobile-nav-bar xl:block">{name1}</div>
				<div className="font-bold text-3xl text-[#14D1A4] mobile-nav-bar sm:hidden xl:block pl-4">6</div>

			  </div>
            </div>
            <div className="flex items-center justify-center xl:pr-8 xl:pl-8 pb-4 pt-4">
              <img src={divide}></img>
            </div>
            <div className="flex flex-col xl:flex-row items-center gap-1">
              <img
                src={profile2}
                className="w-[80px] h-[80px] xl:w-[60px] xl:h-[60px] rounded-full xl:hidden"
				></img>
              <div className="text-xl font-bold text-[#121212] xl:hidden">{name2}</div>
            <div className="flex items-center gap-[15px]">
            <div className="font-bold text-3xl text-[#14D1A4] mobile-nav-bar sm:hidden xl:block pr-4">6</div>
            <div className="text-xl font-bold text-[#121212] sm:hidden mobile-nav-bar xl:block">{name2}</div>
			<a href={`/profile/${name2}`}>
            <img
              src={profile2}
              className="w-[80px] h-[80px] xl:w-[60px] xl:h-[60px] rounded-full mobile-nav-bar sm:hidden xl:block"
            ></img>
			</a>
            </div>
            </div>
			</div>
          </div>
        </div>
      </div>
    </>
  );
}
