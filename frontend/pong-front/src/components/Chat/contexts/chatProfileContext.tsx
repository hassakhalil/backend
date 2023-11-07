import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface MyUserData {
  user_data: {
    id: number;
    username: string;
    me: boolean;
    is_two_factor_auth_enabled: boolean;
  };
  friends: any[]; // Replace with the actual type
  blocks: any[]; // Replace with the actual type
  match_history: any[]; // Replace with the actual type
  achievements: any[]; // Replace with the actual type
  wins: number;
  loses: number;
  draws: number;
}

interface ChatProviderProps {
  children: ReactNode;
}



export const ChatProfileContext = createContext<{
	userData: MyUserData;
	setUserData: React.Dispatch<React.SetStateAction<MyUserData>>;
  } | undefined>(undefined);

export const ChatProfileProvider = ({ children }: ChatProviderProps) => {

  const [userData, setUserData] = useState<MyUserData>({
    user_data: {
      id: 0,
      username: '',
      me: false,
      is_two_factor_auth_enabled: false,
    },
    friends: [],
    blocks: [],
    match_history: [],
    achievements: [],
    wins: 0,
    loses: 0,
    draws: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataResponse = await axios.get('your_user_data_api_endpoint');
        setUserData(userDataResponse.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ChatProfileContext.Provider value={{ userData, setUserData }}>
      {children}
    </ChatProfileContext.Provider>
  );
};
