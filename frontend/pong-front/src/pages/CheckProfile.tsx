import axios from "axios";

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Profile } from "./Profile";
import { ForOFor } from "./ForOFor";
import { ChatProfileContext } from "../components/Chat/contexts/chatProfileContext";
import { ChatSocketContext } from "../components/Chat/contexts/chatContext";
import { StateProvider, useDataContext } from "../components/Profile/States/stateContext";


interface friendsList{
	id:  '',
	username: '',
	avatar:    '',
	state:    '',
  }
  interface DataContextProps {
	  data: friendsList[];
	  setData: React.Dispatch<React.SetStateAction<any>>;
	}
export function CheckProfile ()  {
    // console.log("erkerljer");
    const [isProfile, setIsprofile] = useState(false);
    const { username } = useParams();
    const [isLoading, setLoading] = useState(true);
    console.log(username);
    // const [data, setData] = useState();
    const chatContext = useContext(ChatSocketContext)
    const state = useDataContext();
    // if (chatContext?.connected)
    // {
    //     console.log('connected >>>>>>>>>>>>>>>>>>	')
    // chatContext?.on('State', (friendState : friendsList)=>
    // {
    // console.log('on state --------------------------------------<>')
    // state?.setData((old) =>
    // old.map((item : friendsList) => (item.id === friendState.id ? { ...item, ...friendState } : item))
    // );})
    // }
    useEffect(() => {
        console.log(username);
        const fetchData = async () => {
            let response
          try {
            response = await axios.get(`http://${import.meta.env.VITE_API_URL}/check-user/${username}`, {        
                withCredentials: true,
            });
            // console.log('response ', response.data);
            console.log('boolean ', response.data.boolean);
            setIsprofile(response.data.boolean);
            console.log('res', response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        finally{
            setLoading(false);
        }
        };

        fetchData();
      }, [username]);
    
        // fetchData();
    //   }, [isProfile]);

        console.log(username);
	if (isLoading) {
        return <div>Loading...</div>;
      }
        console.log('user profile valid? ', username, isProfile);

        // isProfile === true;
        return (
            <>
            {(isProfile || username === 'me') ? <Profile/> : <ForOFor/> }
            </>
        //     <>
        //    { isProfile ? <Profile /> : <ForOFor />}

        //     </>
        )
}