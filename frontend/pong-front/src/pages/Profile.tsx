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
// import isEqual from 'lodash/isEqual';

interface MyUserData {
	user_data: {
		id: 0,
		username: '',
		avatar: ''
		me: false,
		is_two_factor_auth_enabled: false,
		state: ''
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
    console.log('mchit l profile')
  const profile = useProfilecontext()
	let { username } = useParams();

  if (!username)
  username = 'me';
	React.useEffect(() => {
    var timer = sessionStorage.getItem("Timer");
		var table = sessionStorage.getItem("Table");
		if (table == null)
    table = '#000000'
  if (timer == null) {
    timer = '1';
  }
  sessionStorage.setItem("Timer", timer);
		sessionStorage.setItem("Table", table);
	  }, [username]);
    
    let name: string = username ? username : "";
    const [userData, setUserData] = useState<MyUserData>({
      user_data: {
        id: 0,
        username: name,
        avatar: "",
        rating: 0,
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
      console.log('in Profile component', username);
			if (!isEqual(newData, userData)) {
				console.log("here");
				setUserData(newData);
			}
			console.log(response.data);
		})
      } catch (error) {
        console.error("Error fetching user data:");
      }


  }, [userData, username, profile.data]);


  const [MyuserData, setMyUserData] = useState<MyUserData>({
    user_data: {
      id: 0,
      username: 'me',
      avatar: "",
      rating: 0,
	  me: false,
      is_two_factor_auth_enabled: false,
	  state: ''
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

//   useEffect(() => {
// 	try {
// 	  const response =  axios.get(`http://${import.meta.env.VITE_API_URL}/profile/me`, { withCredentials: true })
// 	  .then ((response) => {
// 		const newData = response.data;
// 			if (!isEqual(newData, MyuserData)) {
// 				setMyUserData(newData);
// 			}
// 			console.log(response.data);
// 		})
// 	} catch (error) {
// 		console.error("Error fetching user data:");
// 	}
	
// }, [MyuserData, username]);


  return (
    <UserContext.Provider value={{ userData,setUserData}}>
    {/* <MyContext.Provider value={{ MyuserData,setMyUserData}}> */}


      <div>
        {/* <NavBar avatar={MyuserData?.user_data?.avatar} username={MyuserData?.user_data?.username}/> */}
        <HeadProfile
          profile={userData?.user_data?.avatar}
          name={userData?.user_data?.username}
          friendNum={userData?.friends?.length.toString()}
		  me={userData?.user_data?.me}
        />
        <div className="md:flex md:flex-row md:justify-center md:justify-around  md:w-full lg:pl-28">
          <div>
            <LastMatch
              date={userData?.user_data?.match_history ? userData?.user_data?.match_history.slice(-1).date : '01-10-2070'}
              name1={userData?.user_data?.username}
              profile1={userData?.user_data?.avatar}
              name2={userData?.user_data?.match_history ? userData?.user_data?.match_history.slice(-1).id : 'lex fridman'}
              profile2={userData?.user_data?.match_history ? userData?.user_data?.match_history.slice(-1).avatar : 'lex fridman'}
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
          />
        </div>
        <div className="xl:hidden">
          <States res1={userData?.wins?.toString()} res2={userData?.loses?.toString()} res3={userData?.draws?.toString()} res4={(userData?.wins + userData?.loses + userData?.draws).toString()} />
        </div>
        <div className="md:flex md:flex-row md:justify-around md:pt-10 md:w-full lg:pl-28 pt-10">
		<div className="md:w-6/12">
			<LatestMatches/>
		</div>
          <div className="md:w-6/12">
            <Achivement />
          </div>
        </div>
      </div>
    {/* </MyContext.Provider> */}
    </UserContext.Provider>
  );
}

