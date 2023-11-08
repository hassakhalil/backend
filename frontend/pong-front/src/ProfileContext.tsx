


import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { ChatSocketContext } from './components/Chat/contexts/chatContext';

interface MyUserData {
	user_data: {
		id: 0,
		username: '',
		avatar: ''
		me: false,
		is_two_factor_auth_enabled: false,
		state: ''
	  },
	  friends: friendsList[],
	  blocks: [],
	  match_history: [],
	pending_requests: [],
	  achievements: [],
	  wins: 0,
	  loses: 0,
	  draws: 0,
}

  
  interface friendsList{
    id:  '',
    username: '',
    avatar:    '',
    state:    '',
  }


  interface DataContextProps {
      data: MyUserData;
      setData: React.Dispatch<React.SetStateAction<any>>;
  }

  
  const ProfileContext = createContext<DataContextProps | undefined>(undefined);

  export const useProfilecontext = () => useContext(ProfileContext);
  
  interface StateProviderProps {
    children: ReactNode;
  }
  
  export const ProfileProvider: React.FC<StateProviderProps> = ({ children }: StateProviderProps) => {
    const [data, setData] = useState<any>(null);
    // const chatContext = useContext(ChatSocketContext);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://${import.meta.env.VITE_API_URL}/profile/me`, { withCredentials: true });
  
          let Mydata : MyUserData;
          Mydata = response.data;
          setData(Mydata);
        } catch (error) {
        }
      };
      fetchData();
    }, []);

    return (
      <ProfileContext.Provider value={{ data, setData }}>
        {children}
      </ProfileContext.Provider>
    );
  };