import { NavBar } from "../components/Home/NavBar/NavBar";
import { HeadProfile } from "../components/Profile/HeadProfile/HeadProfile";
import { LastMatch } from "../components/Profile/LastMatch/LastMatch";
import { ProfileCard } from "../components/Profile/ProfileCard/ProfileCard";
import { States } from "../components/Profile/States/States";
import { Achivement } from "../components/Profile/Achivement/Achivement";
import { LatestMatches } from "../components/Home/LTSMatches/LatestMatches";
import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useProfilecontext } from "../ProfileContext";
import { useDataContext } from "../components/Profile/States/stateContext";
// import isEqual from 'lodash/isEqual';

interface MyUserData {
	user_data: {
		id: 0,
		username: '',
		avatar: ''
		me: false,
		is_two_factor_auth_enabled: false,
		state: '',
		rating: '',
	  },
	  friends: [],
	  blocks: [],
	  match_history: [],
	pending_requests: [],
	  achievements: [],
	  wins: 0,
	  loses: 0,
	  draws: 0,
}


export const UserContext = createContext<{
	userData: MyUserData;
	setUserData: React.Dispatch<React.SetStateAction<MyUserData>>;
  } | undefined>(undefined);


  export const MyContext = createContext<{
	MyuserData: MyUserData;
	setMyUserData: React.Dispatch<React.SetStateAction<MyUserData>>;
  } | undefined>(undefined);
  
  export function Profile() {
    // ('mchit l profile')
  const profile = useProfilecontext()
	let { username } = useParams();

  if (!username)
  username = 'me';
	React.useEffect(() => {
    var timer = sessionStorage.getItem("Timer");
		var Color = sessionStorage.getItem("Color");
		if (Color == null)
    Color = '#000000'
  if (timer == null) {
    timer = '1';
  }
  sessionStorage.setItem("Timer", timer);
		sessionStorage.setItem("Table", Color);
	  }, [username]);
    
    let name: string = username ? username : "";
    const [userData, setUserData] = useState<MyUserData>({
      user_data: {
        id: 0,
        username: name,
        avatar: "",
        rating: "",
        me: false,
        is_two_factor_auth_enabled: false,
      },
      friends: [],
      blocks: [],
      match_history: [],
      pending_requests: [],
      achievements: [],
      wins: 0,
      loses: 0,
      draws: 0,
    });
    
    function isEqual(objA: {}, objB: {}) {
      return JSON.stringify(objA) === JSON.stringify(objB);
    }
    
    
    useEffect(() => {
      try {
        const response =  axios.get(`http://${import.meta.env.VITE_API_URL}/profile/${username}`, { withCredentials: true })
        .then ((response) => {
			const newData = response.data;
      // ('in Profile component', username);
			if (!isEqual(newData, userData)) {
				// ("here");
				setUserData(newData);
			}
		})
      } catch (error) {
      }

  }, [userData, username, profile?.data]);

  const lastMatch = userData.match_history.length > 0
  ? userData.match_history[userData.match_history.length - 1]
  : undefined;
  return (
    <UserContext.Provider value={{ userData,setUserData}}>
    {/* <MyContext.Provider value={{ MyuserData,setMyUserData}}> */}

      <div>
       {userData?.user_data?.state &&  <HeadProfile
        state={userData?.user_data?.state}
          profile={userData?.user_data?.avatar}
          name={userData?.user_data?.username}
          friendNum={userData?.friends?.length.toString()}
		  me={userData?.user_data?.me}
        />}
        <div className="md:flex md:flex-row md:justify-center md:justify-around  md:w-full lg:pl-28">
          <div>
				<LastMatch
				name={lastMatch?.friend_username}
				profile={lastMatch?.friend_avatar}
				score={lastMatch?.friend_score}
				My_name={userData?.user_data?.username}
				My_profile={userData?.user_data?.avatar}
				My_score={lastMatch?.my_score}
				length={userData.match_history.length}
				/>
            <div className="mobile-nav-bar sm:hidden xl:block scrollable-div-hor1">
              <States res1={userData?.wins?.toString()} res2={userData?.loses?.toString()} res3={userData?.draws?.toString()} res4={(userData?.wins + userData?.loses + userData?.draws).toString()} />
            </div>
          </div>
          <ProfileCard
            profile={userData?.user_data?.avatar}
            name={userData?.user_data?.username}
            winNum={userData?.wins?.toString()}
            LoseNum={userData?.loses?.toString()}
            achivNum={userData?.achievements?.length.toString()}
			rating={userData?.user_data?.rating}
          />
        </div>
        <div className="xl:hidden">
          <States res1={userData?.wins?.toString()} res2={userData?.loses?.toString()} res3={userData?.draws?.toString()} res4={(userData?.wins + userData?.loses + userData?.draws).toString()} />
        </div>
        <div className="md:flex md:flex-row md:justify-around md:pt-10 md:w-full lg:pl-28 pt-10">
		<div className="md:w-6/12">
			{
				(userData?.match_history.length === 0) ? <LatestMatches length={userData?.match_history.length}/> : <LatestMatches match_history={userData?.match_history} My_name={userData?.user_data?.username} My_profile={userData?.user_data?.avatar}/>
			}
		</div>
          <div className="md:w-6/12">
            <Achivement Achi={userData?.achievements}/>
          </div>
        </div>
      </div>
    {/* </MyContext.Provider> */}
    </UserContext.Provider>
  );
}

