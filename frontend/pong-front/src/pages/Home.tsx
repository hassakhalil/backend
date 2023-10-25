// import { NavBar } from "../components/Home/NavBar/NavBar";
// import { Start } from "../components/Home/Start/Start"
// import { GameCard } from "../components/Home/GameCard/GameCard";
// import { Friends } from "../components/Home/Friends/friends";
// import { StartEnjoying } from "../components/Home/Start/StartEnjoying";
// import { LeaderBoard } from "../components/Home/Learders/LeaderBoard";
// // import { LiveMatch } from "../components/Home/Live/LiveMatch";
// import { LatestMatches } from "../components/Home/LTSMatches/LatestMatches";
// import React from "react";

// export function Home() {
//     return (
//         <>
//             <div className="w-screen">
//                 <NavBar/>
//                 <div className="pt-[110px] lg:pl-36">
//                 <Start/>
//                 <h1 className="flex items-center justify-center pt-16 lg:pt-10 text-[#353E6C] text-xl font-bold md:text-2xl pb-10 lg:pb-0">Start Game</h1>
//                 <div className="lg:flex w-full scrollable-div-ver1 scrollable-div-hor lg:pl-50 md:pt-10">
//                     <GameCard TableType="Astro Table" GameType="3 Win Game" Views="13.9k playing" imgPath="./src/assets/3_win_game.png"/>
//                     <GameCard TableType="Sky Table" GameType="7 Win Game" Views="13.9k playing" imgPath="./src/assets/7_win_game.png"/>
//                     <GameCard TableType="Sky Table" GameType="1 Win Game" Views="13.9k playing" imgPath="./src/assets/1_win_game.png"/>
//                     <GameCard TableType="Sky Table" GameType="5 Win Game" Views="13.9k playing" imgPath="./src/assets/5_win_game.png"/>
//                     <GameCard TableType="Simple Table" GameType="Bot Game" Views="0 playing" imgPath="./src/assets/Bot_Img.png"/>
//                 </div>
// 				<div className="lg:flex-col lg:justify-center gap-9 w-full lg:pt-10">
// 					<div className="lg:flex gap-9 items-center justify-center lg:w-full">
// 						<div className="lg:w-6/12">
// 							<Friends/>
// 						</div>
// 						<div className="lg:w-6/12">
// 							<StartEnjoying/>
// 						</div>
// 					</div>
// 				</div>
// 				<div className="lg:flex lg:justify-center w-full lg:pt-10">
// 				<div className="lg:flex lg:w-full">
// 					<div className=" lg:w-6/12">
// 						<LeaderBoard/>
// 					</div>

// 					<div className="lg:w-6/12">
// 						<LatestMatches/>
// 					</div>
// 					</div>
// 				</div>
//                 {/* <div>
//                     <LiveMatch/>
//                 </div> */}
//                 <div className="flex justify-center items-center text-blue-900 font-poppins text-sm font-semibold leading-normal tracking-wider pb-5 lg:text-md">1337 Future Is Loading</div>
//                 </div>
//             </div>
//         </>
//     )
// }