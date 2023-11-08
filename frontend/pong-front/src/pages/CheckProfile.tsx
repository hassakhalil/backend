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
    const [isProfile, setIsprofile] = useState(false);
    const { username } = useParams();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            let response
          try {
            response = await axios.get(`http://${import.meta.env.VITE_API_URL}/check-user/${username}`, {        
                withCredentials: true,
            });

            setIsprofile(response.data.boolean);
        } catch (error) {
        }
        finally{
            setLoading(false);
        }
        };

        fetchData();
      }, [username]);
    
	if (isLoading) {
        return <div>Loading...</div>;
      }

        return (
            <>
            {(isProfile || username === 'me') ? <Profile/> : <ForOFor/> }
            </>
        )
}