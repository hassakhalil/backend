import Authentication from "../components/Enbording/Authentication";
import Logo from "../assets/mainLogo.svg"
import React from "react";

export function SignIn() {
    return (
        <>
                <div className="flex h-full w-screen items-center justify-center">
				<div className="flex flex-col justify-center items-center  pb-10">
				<div className="zz">
					<img src={Logo} width="120px" height="120px"></img>
				</div>
                        <div className=" pt-16 font-semibold text-sm drop-shadow-lg">
                            <Authentication/>
                        </div>
                    <div>
                    </div>
                </div>
                </div>
        </>
    );
}