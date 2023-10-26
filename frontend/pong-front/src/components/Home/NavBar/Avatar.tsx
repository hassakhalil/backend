import React from "react";
import { Link } from "react-router-dom";

interface Props {
	avatar: string,
	name: string,
}

export function Avatar ( {avatar, name}: Props ) {

    return (
        <>
			<Link to={`/profile/${name}`}>
				<button>
					<img src={avatar} className="rounded-full w-[30px] h-[30px] lg:w-[45px] lg:h-[45px]" alt="profile"></img>
				</button>
			</Link>
        </>
    )
}