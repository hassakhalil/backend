import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { ChatSocketContext } from '../../Chat/contexts/chatContext';
// import { Avatar } from '../../Home/NavBar/Avatar';


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
  

// const PersonalData: {
//   id: any;
//   username: any;
//   avatar: any;
//   rating: any;
//   intra_id: any;
//   is_two_factor_auth_enabled: any;
//   state: any;
// }

const stateContext = createContext<DataContextProps | undefined>(undefined);

// export const useDataContext = () => {
export const useDataContext = () => useContext(stateContext);

interface StateProviderProps {
  children: ReactNode;
}

export const StateProvider: React.FC<StateProviderProps> = ({ children }: StateProviderProps) => {
  const [data, setData] = useState<any>(null);
  // const chatContext = useContext(ChatSocketContext);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        // Replace the URL with your API endpoint
        const response = await axios.get('http://localhost:3000/profile/me', { withCredentials: true });

        // const result = await response.json();
        console.log('data = ', response.data.friends);
        let Mydata : friendsList;
        Mydata = {id: response.data.user_data.id, username: response.data.user_data.username, avatar: response.data.user_data.avatar, state : response.data.user_data.state}
        response.data.friends = [...response.data.friends, Mydata];
        setData(response.data.friends);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
// 
    };
    // chatContext?.emit('join-room', {roomId});
    fetchData();
  }, []);

    console.log('----------------------------------------------------------------new data arived', data);
  return (
    <stateContext.Provider value={{ data, setData }}>
      {children}
    </stateContext.Provider>
  );
};