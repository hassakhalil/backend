


import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
// import { ChatSocketContext } from '../../Chat/contexts/chatContext';
// import { Avatar } from '../../Home/NavBar/Avatar';
// const [MyuserData, setMyUserData] = useState<MyUserData>({
//     user_data: {
//       id: 0,
//       username: 'me',
//       avatar: "",
//       rating: 0,
// 	  me: false,
//       is_two_factor_auth_enabled: false,
// 	  state: ''
//     },
//     friends: [],
// 	blocks: [],
//     match_history: [],
// 	pending_requests: [],
//     achievements: [],
//     wins: 0,
//     loses: 0,
//     draws: 0,
//   });


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
  
  // export const useDataContext = () => {
  export const useProfilecontext = () => useContext(ProfileContext);
  
  interface StateProviderProps {
    children: ReactNode;
  }
  
  export const ProfileProvider: React.FC<StateProviderProps> = ({ children }: StateProviderProps) => {
    const [data, setData] = useState<any>(null);
    // const chatContext = useContext(ChatSocketContext);
  
    useEffect(() => {
      // Fetch data when the component mounts
      const fetchData = async () => {
        try {
          // Replace the URL with your API endpoint
          const response = await axios.get(`http://${import.meta.env.VITE_API_URL}/profile/me`, { withCredentials: true });
  
          // const result = await response.json();
          console.log('data = ', response.data);
          let Mydata : MyUserData;
          Mydata = response.data;
          setData(Mydata);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
  // 
      };
      fetchData();
    }, []);
  
      console.log('----------------------------------------------------------------new data arived', data);
    return (
      <ProfileContext.Provider value={{ data, setData }}>
        {children}
      </ProfileContext.Provider>
    );
  };