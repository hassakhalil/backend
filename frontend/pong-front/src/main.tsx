import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ProfileProvider } from './ProfileContext.tsx';
import { BrowserRouter, Routes, Route} from "react-router-dom"
import { ChatProfileContext } from './components/Chat/contexts/chatProfileContext.tsx';
import { ChatSocketContext, ChatSocketProvider } from './components/Chat/contexts/chatContext.tsx';
import { useProfilecontext } from './ProfileContext.tsx';
import { useContext , useState} from 'react';
// import { ProfileProvider,useProfilecontext } from "./ProfileContext"
import { StateProvider, useDataContext, } from "./components/Profile/States/stateContext"
import { NavBar } from './components/Home/NavBar/NavBar.tsx';
// import { States } from './components/Profile/States/States.tsx';
// import { ChatSocketContext, ChatSocketProvider } from "./components/Chat/contexts/chatContext"
// import { ChatSocketContext, ChatSocketProvider } from "./components/Chat/contexts/chatContext"
// import { StateProvider } from './components/Profile/States/stateContext.tsx'
// ReactDOM.createRoot(document.getElementById('root')!).render(

//     <App />

// )

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


const Loading = () =>
{
  const [isLoading, setIsLoading] = useState(true);
  const chatContext = useContext(ChatSocketContext );
        chatContext?.on('connect', ()=>
        {
          setIsLoading(false);
        })
  if (isLoading) {
    return <div>Loading...</div>;
    }
    return (
		<>
	<StateProvider>
	<App/>
</StateProvider>
	</>)
}
const Root: React.FC = () => {

		// (islogin);
    return (
        <ChatSocketProvider>
      <ProfileProvider>
            <Loading/>
      </ProfileProvider>
        </ChatSocketProvider>
    );
  };
  

  ReactDOM.createRoot(document.getElementById('root')!).render(

    <Root />

)

