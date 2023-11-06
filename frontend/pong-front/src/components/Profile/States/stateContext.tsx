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
  // const chatContext = useContext(ChatSocketContext);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        // Replace the URL with your API endpoint
        const response = await axios.get(`http://${import.meta.env.VITE_API_URL}/profile/me`, { withCredentials: true });

        // const result = await response.json();
        console.log('data = ', response.data.friends);
        let Mydata : friendsList;
        Mydata = {id: response.data.user_data.id, username: response.data.user_data.username, avatar: response.data.user_data.avatar, state : response.data.user_data.state}
        response.data.friends = [...response.data.friends, Mydata];
        setData(response.data.friends);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
// 
    };
    // chatContext?.emit('join-room', {roomId});
    fetchData();
  }, []);

  // const profile = useProfilecontext()
	// const chatContext = useContext(ChatSocketContext);
	// // let state : DataContextProps | undefined;
	// 	// state = useDataContext();
  //   useEffect(() =>{
	//     chatContext?.on('State', (friendState : friendsList)=>
  //     {
  //     console.log('on state -------', friendState);


  //     // start
  //     // profile.setData((prevData) => {
  //     //   if (prevData) {
  //     //     return {
  //     //       ...prevData,
  //     //       user_data: {
  //     //         ...prevData.user_data,
  //     //         state: friendState.state,
  //     //       },
  //     //     };
  //         ///end 
  //         console.log("state changed", data)
  //         if (data)
  //     setData((old) =>
  //     old.map((item : friendsList) => (item.id === friendState.id ? { ...item, ...friendState } : item)))
  //     console.log('data mn bead', data);
  //       // }})
  //       // return null;
  //     });
  //     // return (chatContext?.off('State'))
  //     }, [chatContext])
        // return () =>{
          // chatContext?.off('State');}
  // }, [])
  // console.log('user_data li f navbar', profile?.data?.user_data.avatar);

    console.log('----------------------------------------------------------------new data arived', data);
  return (
    <stateContext.Provider value={{ data, setData }}>
      {children}
    </stateContext.Provider>
  );
};