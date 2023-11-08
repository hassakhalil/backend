import burger from "/src/assets/burger.png"
import React from "react";

interface Props {
    clicked: () => void;
}

export function Burger ({clicked}: Props) {
    return (
        <>
            <button onClick={clicked} className="lg:hidden">
                <img src={burger} alt="burger button"></img>
            </button>
        </>
    )
}