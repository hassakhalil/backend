	import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
	import { SignIn } from "./pages/SignIn"
	// import { Home } from "./pages/Home"
	import { Profile } from "./pages/Profile"
	import { Game } from "./pages/Game"
	import { Chat } from "./pages/Chat"
	import "./style.css"
	import React, { useContext, useEffect, useState } from "react"
	import { SetUsername } from "./pages/SetUsername"
	import { TwofaAuth } from "./pages/TwofaAuth"
	import { ForOFor } from "./pages/ForOFor"
	import { GameSetup } from "./components/Game/GameSetup"
	import axios from "axios"
	import { CheckProfile } from "./pages/CheckProfile"
	import { ProfileProvider,useProfilecontext } from "./ProfileContext"
	import { StateProvider, useDataContext, } from "./components/Profile/States/stateContext"
import { ChatSocketContext, ChatSocketProvider } from "./components/Chat/contexts/chatContext"
import { NavBar } from "./components/Home/NavBar/NavBar"
// import { ProfileProvider } from "./ProfileContext"



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
	// interface StateDto {
	// 	state: string;
	// }
	// @IsIn(['online', 'offline', 'ingame'])
	const App: React.FC = ()=> {
		const [islogin, setIslogin] = useState(false);
		const [isLoading, setIsLoading] = useState(true);
		let state : DataContextProps | undefined;
		state = useDataContext();
		// const chatContext = useContext(ChatSocketContext);
		const Profile_data = useProfilecontext();
		
		// state?.setData('new data');
		useEffect(() => {
			// chatContext?.emit('join-room', {})
			

		const checkAuthentication = async () => {
			try {
			const response = await axios.get(`http://${import.meta.env.VITE_API_URL}/is-loggedin`, { withCredentials: true });
			setIslogin(response.data === true);
			} catch (error) {
				
				console.log(error);
				setIslogin(false)
				setIsLoading(false);
			} finally {
			setIsLoading(false);
			}
		}
	
		checkAuthentication();
}, []);
	
			
		if (isLoading) {
		return <div>Loading...</div>;
		}
		console.log(islogin);
		

		return (
			<>
			  {(islogin && Profile_data) ? (
				<ChatSocketProvider>
				<ProfileProvider>
				<StateProvider>

				  <BrowserRouter>
						<NavBar/>
					<Routes>
					  {/* Your logged-in routes go here */}
					  <Route path={`/Profile/:username`} element={<CheckProfile />} />
					  {/* <Route path={`/set_username`} element={<CheckProfile/>} /> */}
					  <Route path="/Game" element={<GameSetup />} />
					  <Route path="/2fa" element={<TwofaAuth />} />
					  <Route path="/Chat" element={<Chat />} />
					  <Route path="/Chat/:id" element={<Chat />} />
					  <Route path="/error" element={<ForOFor />} />
					  <Route path="/" element={<Profile />} />
					  <Route path="*" element={<ForOFor />} />
				{/* </NavBar> */}
					  {/* <Route path="chat/*" element={<ForOFor/>}/> */}
					</Routes>
				  </BrowserRouter>
				</StateProvider>
				</ProfileProvider>
				</ChatSocketProvider>
			  ) : (
				// Your not-logged-in routes go here
				<BrowserRouter>
				  <Routes>
					<Route path="/set_username" element={<SetUsername setLogin={() => setIslogin(true)}/>} />
					<Route path="*" element={<SignIn />} />
				  </Routes>
				</BrowserRouter>
			  )}
			</>
		  );
		  
	}
	
	export default App;
	