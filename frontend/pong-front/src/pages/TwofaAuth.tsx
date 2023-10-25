import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function TwofaAuth () {
	const [code, setCode] = React.useState(
		{
			code: ''
		}
	);
	const navigate = useNavigate();


	const verifyYourCode = async () => {
		try {
			console.log(code.code);
			const responce = await axios.post(`http://${import.meta.env.VITE_API_URL}/2fa/authenticate`, code, {
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json',
				  },
			});
			if (responce) {
				navigate("/profile/me");
			}
		}
		catch (error) {
			console.log(error);
		}
	}

	return (
		<>
		<div className=" h-screen w-screen flex items-center justify-center">
			<div className="flex flex-col items-center pt-5 border border-[3px] border-[#BACCFD] rounded-custom w-[240px] h-[257px] pt-5">
				<div className="text-[#888EFF] font-bold pb-16">Verify your device</div>
				<div className="text-[#888EFF] font-light pb-1">Enter your code</div>
				<form className="flex  justify-center items-center rounded-xl h-[30px] w-[160px]">
					<input className="flex rounded-xl text-[#888EFF] w-full h-full border bg-gray-100 border-[3px]  pr-3 pl-3 focus:border-[#6C5DD3] focus:outline-none text-center"
					value={code.code}
					onChange={(e) => {
						setCode({ ...code, code: e.target.value });
					}}
					></input>
				</form>
				<div className="pt-4">
				{/* <a href="http://localhost:5173/profile/me"> */}
					<button className="flex justify-center items-center border rounded-xl bg-[#6C5DD3] border-[#6C5DD3] h-[45px] w-[130px]" onClick={verifyYourCode}>
							<div className="text-white font-semibold lg:text-sm">Verify Code</div>
					</button>
				{/* </a> */}
				</div>
			</div>
		</div>
		</>
	)
}