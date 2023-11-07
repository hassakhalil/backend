import rmv from "/src/assets/remove.svg"
import rec from "/src/assets/rectangle.svg"
import React from "react"
import axios from "axios";

interface Props {
	hide: () => void;
}

export function Add ( {hide}: Props ) {
    const [remove, SetRemove] = React.useState(false);
	const [friendName, SetfriendName] = React.useState<string>('');
	const [error, SetError] = React.useState(false);
	const [sent, Setsent] = React.useState(false);



	const handleFormSubmit = async ( ) => {
		try {
			const response = await axios.post(`http://${import.meta.env.VITE_API_URL}/add-friend/${friendName}`, null, { withCredentials: true })
			.then (function (response) {
				SetError(false);
				Setsent(true);
			});
        } catch (error) {
		  SetError(true);
		  Setsent(false);
        }
      };

    return (
        <>
        {remove ? null : (
			<div className="blur-background">
            <div className="centered-component">
                <div className="border bg-white rounded-custom w-[316px] h-[330px] lg:w-[350px] lg:h-[300px]">
                    <div className="flex flex-col">
                        <div className="flex justify-between items-center p-8">
                            <div className="text-[#11142D] font-medium lg:text-md">Send invite to a friend</div>
                            <button onClick={() => {SetRemove(!remove); hide();}} className="flex items-center justify-center border border-white rounded-full w-[48px] h-[48px] lg:w-[50px] h-[50px] shadow-xl">
                                <img src={rmv}></img>
                            </button>
                        </div>
                        <div className="pr-8 pl-8 pb-2">
                            <form className="flex items-center border border-4 border-[#6C5DD3] rounded-xl w-full h-[56px] lg:w-full lg:h-[50px]" onSubmit={handleFormSubmit}>
                                <input  className="rounded-xl w-full h-full pr-3 pl-3 lg:text-md lg:pl-5 focus:outline-none text-[#888EFF]" placeholder="Username"
								value={friendName}
								onChange={(e) => {
									SetfriendName(e.target.value );
								  }}>
								  </input>
                            </form>
							{
								error ? 
								<div className="absolute pt-[10px] lg:pt-[20px]">
									<div className="border bg-[#E9DCE5] rounded-lg w-[170px] h-[25px]  flex gap-1 items-center justify-center">
										<div className="text-xs font-semibold text-[#6C5DD3]">Invitation Not Valid</div>
										<div>
											<div  style={{ backgroundImage: `url(${rec})`}} className="w-[14px] h-[14px] bg-center bg-no-repeat bg-cover">
												<div className="text-white flex items-center justify-center text-xs font-semibold">
													!
												</div>
											</div>
										</div>
									</div>
								</div> : null

							}
							{
								sent ? 
								<div className="absolute pt-[10px] lg:pt-[20px]">
									<div className="border bg-[#E9DCE5] rounded-lg w-[170px] h-[25px]  flex gap-1 items-center justify-center">
										<div className="text-xs font-semibold text-[#6C5DD3]">Invitation Send</div>
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


                        <div className="flex justify-around pt-16">
                            <button className="flex justify-center items-center border rounded-xl bg-[#E4E4E47F] border-[#E4E4E47F] h-[45px] w-[100px]" onClick={() => {SetRemove(!remove); hide();}}>
                                <div className="text-[#808191] font-semibold lg:text-sm">Cancel</div>
                            </button>

                            <button className="flex justify-center items-center border rounded-xl bg-[#6C5DD3] border-[#6C5DD3] h-[45px] w-[100px]" onClick={handleFormSubmit}>
                                <div className="text-white font-semibold lg:text-sm">Invite</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
		</div>
        )}
        </>
    )
}

