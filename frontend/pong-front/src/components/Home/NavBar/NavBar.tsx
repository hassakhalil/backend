// import React from "react";
import { Burger } from "./Burger/burger";
import { Notification } from "./Notification/Notification";
import { Avatar } from "./Avatar";
import { Notif } from "./Notification/notif";
import { Brb } from "./Burger/Brb";
import { MBburger } from "./Burger/MBburger";
import React, { useContext, useEffect, useState } from "react";
import { useProfilecontext } from "../../../ProfileContext";
import { ChatSocketContext } from "../../Chat/contexts/chatContext";
import { StateProvider } from "../../Profile/States/stateContext";
import { useDataContext } from "../../Profile/States/stateContext";
interface Props {
	avatar: string,
	username: string,
	// update: () => void;
}

export function NavBar( ) {
  const [showNotif, setShowNotif] = React.useState(false);
  const [showBurger, setShowBurger] = React.useState(false);
  // const profile = useProfilecontext()
	// const chatContext = useContext(ChatSocketContext);
  // const state = useDataContext();
  const profile = useProfilecontext();
  // useEffect(() => 
  // {
  //   if (chatContext?.connected)
  //   console.log('connected >>>>>>>>>>>>>>>>>>	')
  //     chatContext?.on('State', (friendState : friendsList)=>
  //     {
  //     console.log('on state --------------------------------------<>')
  //     state?.setData((old) =>
  //     old.map((item : friendsList) => (item.id === friendState.id ? { ...item, ...friendState } : item))
  //     )})
  //       return () =>{
  //         chatContext?.off('State');}
  // }, [profile, profile.setData])
  // console.log('user_data li f navbar', profile?.data?.user_data.avatar);
  return (
    <>
      <div className="nav-container zz">
        <nav>
          <div className="border h-24 sm:h-20">
            <div className="flex justify-between items-center h-full px-7">
              <div>
                <Burger clicked={() => setShowBurger(!showBurger)}/>
                <div className="fixed left-0 top-0 bg-white zz sm:hidden lg:block mobile-nav-bar">
                  <MBburger/>
                </div>
              </div>
              <div className="flex items-center">
                <div className="pr-20">
                  <Notification
                    clicked={() => setShowNotif(!showNotif)}
                    msgnum="5"
                  />
                </div>
                <div className="lg:pr-16">
                  <Avatar avatar={profile?.data?.user_data.avatar} name={profile?.data?.user_data.username} />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      {showNotif && <Notif />}
      {showBurger && <Brb />}
    </>
  );
}
