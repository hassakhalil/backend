import { Game } from "../../pages/Game";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SocketProvider } from "../../game/contexts/SocketContext";
import axios from "axios";
import { GameRoute } from "./GameRoute";
import { Route, Routes, useNavigate  } from "react-router-dom";
import { useHistory } from 'react-router-dom';
// import useNavigate
interface customParam
{
  user_id : number;
  OpponentId : number,
  gameDuration: string;
}

export const GameSetup  = ( ) =>
{

  let customParam : customParam;
  const {state} = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Perform any cleanup or additional logic here
      // ...

      // Store the redirection path in sessionStorage only if accessing /game
      if (window.location.pathname === "/game") {
        sessionStorage.setItem("redirectPath", "/");
      }

      // Some browsers require the returnValue to be set
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    // Check sessionStorage for the redirection path on component mount
    const storedRedirectPath = sessionStorage.getItem("redirectPath");

    if (storedRedirectPath) {
      // Redirect to the stored path
      navigate(storedRedirectPath);
      // Clear the stored path from sessionStorage
      sessionStorage.removeItem("redirectPath");
    }
  }, [navigate]);
  if (state === null) {
    navigate('/error');
    return null;
  }
        customParam =
        {
            gameDuration : state.gameDuration,
            user_id : state.user_id,
        OpponentId : state.OpponentId
        };
  // }
  return (
    <>
    <SocketProvider customParam={customParam}>
      <Game user_id={customParam.user_id}/>
    <GameRoute/>
    </SocketProvider>
    </>
  );
}