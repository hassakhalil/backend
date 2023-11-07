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
  import axios from 'axios'
  interface Props {
    avatar: string,
    username: string,

  }

  interface friendsList{
    id:  '',
    username: '',
    avatar:    '',
    state:    '',
    }
  
  export function NavBar( ) {
    const [showNotif, setShowNotif] = React.useState(false);
    const [showBurger, setShowBurger] = React.useState(false);
;
    const profile = useProfilecontext();



        useEffect(()=>
        {
        }, [profile?.user_data?.avatar])
    return (
      <>
        <div className="nav-container zz">
          <nav>
            <div className="border h-24 sm:h-20">
              <div className="flex justify-between items-center h-full px-7">
                <div>
                  <Burger clicked={() => setShowBurger(!showBurger)}/>
                  <div className="fixed left-0 top-0 bg-white zz sm:hidden lg:block mobile-nav-bar">
                    <MBburger />
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="pr-20 pb-3">
                    <Notification
                      clicked={() => setShowNotif(!showNotif)}
                    />
                  </div>
                  <div className="lg:pr-16">
                  {profile?.data?.user_data.avatar && <Avatar avatar={profile?.data?.user_data.avatar} name={profile?.data?.user_data.username} />}
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
