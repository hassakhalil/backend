interface Props {
	profile: string,
	name: string,
	time: string
	msg: string,
}

export function Msg({ profile, name, time, msg }: Props) {
	return (
	  <>
		<div className="flex pr-32 gap-[10px] pb-5">
		  <img src={profile} className="w-[32px] h-[32px] rounded-full"></img>
		  <div className="flex flex-col">
			<div className="flex gap-[10px] pb-3 items-center"> {/* Add justify-end class here */}
			  <div className="text-sm">{name}</div>
			  <div className="text-xs text-[#808191]">{time}</div>
			</div>
			<div className="flex flex-col justify-self-end"> {/* Add justify-self-end class here */}
			  <div className="message-bubble text-[#808191] text-sm">{msg}</div>
			  {/* <div className="message-bubble text-[#808191] text-sm">{msg}</div> */}
			</div>
		  </div>
		</div>
	  </>
	);
  }
  
  // text-[#808191]