import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ProfileProvider } from './ProfileContext.tsx';
import { BrowserRouter, Routes, Route} from "react-router-dom"
import { ChatProfileContext } from './components/Chat/contexts/chatProfileContext.tsx';
import { ChatSocketContext, ChatSocketProvider } from './components/Chat/contexts/chatContext.tsx';
import { useProfilecontext } from './ProfileContext.tsx';
import { useContext , useState} from 'react';
import { TwofaAuth } from './pages/TwofaAuth.tsx';
import { SignIn } from './pages/SignIn.tsx';
import { SetUsername } from './pages/SetUsername.tsx';
import axios from 'axios'
import { ForOFor } from './pages/ForOFor.tsx';
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

  const [islogin, setIslogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const Profile_data = useProfilecontext();
  

  React.useEffect(() => {
    
  const checkAuthentication = async () => {
    try {
    const response = await axios.get(`http://${import.meta.env.VITE_API_URL}/is-loggedin`, { withCredentials: true });
    console.log('here')
    setIslogin(response.data === true);
    } catch (error) {	
      (error);
      setIslogin(false)
      setIsLoading(false);
    } finally {
      console.log('soemthing')
    setIsLoading(false);
    }
  }

  checkAuthentication();
}, []);

    
  if (isLoading) {
  return <div>Loading....</div>;
  }
  return (
  <>
  {(islogin) ? (
    <>
      <ChatSocketProvider>
      <ProfileProvider>
            <Loading/>
      </ProfileProvider>
        </ChatSocketProvider>
        </>
    ) : (
    		<BrowserRouter>
				  <Routes>
					<Route path="/2fa" element={<TwofaAuth setLogin={() => setIslogin(true)}/>} />
					<Route path="/set_username" element={<SetUsername setLogin={() => setIslogin(true)}/>} />
					<Route path="*" element={<SignIn />} />
				  </Routes>
				</BrowserRouter>)
  };
  </>)
}

  ReactDOM.createRoot(document.getElementById('root')!).render(

    <Root />

)

