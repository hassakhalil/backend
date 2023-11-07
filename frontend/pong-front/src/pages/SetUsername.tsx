
import rec from "/src/assets/rectangle.svg"
import imgPath from "/src/assets/onboarding.png"
import React, { useContext } from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useProfilecontext } from "../ProfileContext";
// import { UserError } from "./Error/UserError";

interface Props {
	setLogin: () => void
}

// interface friendsList{
//     id:  '',
//     username: '',
//     avatar:    '',
//     state:    '',
//   }
  
// interface MyUserData {
// 	user_data: {
// 		id: 0,
// 		username: '',
// 		avatar: ''
// 		me: false,
// 		is_two_factor_auth_enabled: false,
// 		state: ''
// 	  },
// 	  friends: friendsList[],
// 	  blocks: [],
// 	  match_history: [],
// 	pending_requests: [],
// 	  achievements: [],
// 	  wins: 0,
// 	  loses: 0,
// 	  draws: 0,
// }


// const fetchData = async () => {
// 	try {
// 		const response = await axios.get(`http://${import.meta.env.VITE_API_URL}/profile/me`, { withCredentials: true });
  
// 		let Mydata : MyUserData;
// 		Mydata = response.data;
// 		console.log(Mydata)
// 		return (Mydata);
// 	} catch (error) {
// 		}
// 	};
export const SetUsername = ( {setLogin}: Props ) => {

    const [formData, setFormData] = useState<{username: string}>({
        username: '',
      });
	  const [error, Seterror] = useState(false);
	  const navigate = useNavigate();

      const handleFormSubmit = async () => {
          try {
         	const response = await axios.post(`http://${import.meta.env.VITE_API_URL}/set-username`, formData, { withCredentials: true })
			.then ((response) => {

				setLogin();
				navigate("/profile/me");
			} )
        } catch (error) {
		  Seterror(true);
        }
      };

    return (
        <> 
        <div className="mobile-nav-bar sm:hidden lg:block">
           <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center" >
            <div className="border flex flex-col items-center justify-center bg-white w-[500px] h-[500px] shadow-xl rounded-custom">
                <div className="flex items-center justify-center text-[#808191]">Enter Your Full Name</div>
                <div className="flex flex-col items-center gap-5 pt-5">
                <form
					className="flex justify-center items-center rounded-xl h-[70px] w-[300px]"
					onSubmit={(e) => {
						e.preventDefault();
						handleFormSubmit();
					}}
					>
					<input
						className="rounded-xl w-full h-full border bg-gray-100 border-[3px] pr-3 pl-3 focus:border-[#6C5DD3] focus:outline-none text-[#888EFF] text-center"
						maxLength={8}
						value={formData.username}
						onChange={(e) => {
						e.preventDefault();
						setFormData({ ...formData, username: e.target.value });
						}}
					/>
					</form>
				<button className="flex justify-center items-center border rounded-xl bg-[#6C5DD3] border-[#6C5DD3] h-[45px] w-[140px]" onClick={handleFormSubmit}>
					<div className="text-white font-semibold lg:text-sm">Submit</div>
				</button>
                </div>
				{
					error ?
						<div className="pt-[10px] lg:pt-[20px]">
							<div className="border bg-[#E9DCE5] rounded-lg w-[300px] h-[30px]  flex gap-1 items-center justify-center">
								<div className="text-xs font-semibold text-[#6C5DD3]">This user not found Or already used</div>
								<div>
									<div  style={{ backgroundImage: `url(${rec})`}} className="w-[14px] h-[14px] bg-center bg-no-repeat bg-cover">
										<div className="text-white flex items-center justify-center text-xs font-semibold">
											!
										</div>
									</div>
								</div>
							</div>
						</div>
						: null
				}
            </div>
            </div>
        </div>
        <div className="flex items-center justify-center h-screen">
            <div className="lg:hidden">
                <div className="flex items-center justify-center text-[#808191]">Enter Your Full Name</div>
                <div className="flex flex-col gap-5 pt-5 items-center">
                <form className="flex justify-center items-center rounded-xl h-[70px] w-[300px]">
                    <input className="rounded-xl w-full h-full border bg-gray-100 border-[3px]  pr-3 pl-3 focus:border-[#6C5DD3] focus:outline-none text-[#888EFF] text-center"
					maxLength={8}
                    value={formData.username}
                    onChange={(e) => {
						setFormData({ ...formData, username: e.target.value });
					  }}
					/>
                </form>
				
				<button className="flex relative left-0 justify-center items-center border rounded-xl bg-[#6C5DD3] border-[#6C5DD3] h-[45px] w-[130px]" onClick={handleFormSubmit}>
					<div className="text-white font-semibold lg:text-sm">Submit</div>
				</button>
                </div>
                {
					error ?
					<div className="pt-[10px] lg:pt-[20px]">
						<div className="border bg-[#E9DCE5] rounded-lg w-[300px] h-[30px]  flex gap-1 items-center justify-center">
							<div className="text-xs font-semibold text-[#6C5DD3]">This user not found Or already used</div>
							<div>
								<div  style={{ backgroundImage: `url(${rec})`}} className="w-[14px] h-[14px] bg-center bg-no-repeat bg-cover">
									<div className="text-white flex items-center justify-center text-xs font-semibold">
										!
									</div>
								</div>
							</div>
						</div>
					</div>
					: null
				}
            </div>
        </div>

        </>
    )
}