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

const Start = () =>
{
//   const profile = useProfilecontext()
// 	const chatContext = useContext(ChatSocketContext);
// 	let state : DataContextProps | undefined;
// 		state = useDataContext();
// 	    chatContext?.on('State', (friendState : friendsList)=>
//       {
//       console.log('on state -------', friendState);
//       state?.setData((old) =>
//       old.map((item : friendsList) => (item.id === friendState.id ? { ...item, ...friendState } : item))
// 	  )
//         return () =>{
//           chatContext?.off('State');}
//   }, [])
//   console.log('user_data li f navbar', profile?.data?.user_data.avatar);


  return (<>
  {/* <App/> */}
  </>)
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
	<Start/>
	<App/>
</StateProvider>
	</>)
}
const Root: React.FC = () => {

		// console.log(islogin);
    return (
        <ChatSocketProvider>
      <ProfileProvider>

          {/* <StateProvider> */}
            <Loading/>
          {/* </StateProvider> */}
      </ProfileProvider>
        </ChatSocketProvider>
    );
  };
  
//   ReactDOM.render(<Root />, document.getElementById('root'));


  ReactDOM.createRoot(document.getElementById('root')!).render(

    <Root />

)

