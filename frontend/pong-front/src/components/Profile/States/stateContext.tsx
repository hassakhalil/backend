import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { ChatSocketContext } from '../../Chat/contexts/chatContext';
// import { Avatar } from '../../Home/NavBar/Avatar';
import { useProfilecontext } from '../../../ProfileContext';
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://${import.meta.env.VITE_API_URL}/profile/me`, { withCredentials: true });

        let Mydata : friendsList;
        Mydata = {id: response.data.user_data.id, username: response.data.user_data.username, avatar: response.data.user_data.avatar, state : response.data.user_data.state}
        response.data.friends = [...response.data.friends, Mydata];
        setData(response.data.friends);
      } catch (error) {
      }
    };
    fetchData();
  }, []);

  return (
    <stateContext.Provider value={{ data, setData }}>
      {children}
    </stateContext.Provider>
  );
};