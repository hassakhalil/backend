import axios from "axios";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Profile } from "./Profile";
import { ForOFor } from "./ForOFor";

export function CheckProfile ()  {
    // console.log("erkerljer");
    const [isProfile, setIsprofile] = useState(false);
    const { username } = useParams();
    const [isLoading, setLoading] = useState(true);
    console.log(username);


    useEffect(() => {
        console.log(username);
        const fetchData = async () => {
            let response
          try {
            response = await axios.get(`http://localhost:3000/check-user/${username}`, {        
                withCredentials: true,
            });
            // console.log('response ', response.data);
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