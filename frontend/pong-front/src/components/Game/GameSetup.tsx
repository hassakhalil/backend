import { Game } from "../../pages/Game";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SocketProvider } from "../../game/contexts/SocketContext";
import axios from "axios";
import { GameRoute } from "./GameRoute";

interface customParam
{
  user_id : number;
  gameDuration: string;
}

export const GameSetup  = () =>
{
  
  const {state} = useLocation();
  let customParam;

        customParam =
        {
            gameDuration : state.gameDuration,
            user_id : state.user_id,
        };
  return (
    <>
    <SocketProvider customParam={customParam}>
    <GameRoute/>
      <Game />
    </SocketProvider>
    </>
  );
}