import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { SignIn } from "./pages/SignIn"
// import { Home } from "./pages/Home"
import { Profile } from "./pages/Profile"
import { Game } from "./pages/Game"
import { Chat } from "./pages/Chat"
import "./style.css"
import React, { useEffect, useState } from "react"
import { SetUsername } from "./pages/SetUsername"
import { TwofaAuth } from "./pages/TwofaAuth"
import { ForOFor } from "./pages/ForOFor"
import { GameSetup } from "./components/Game/GameSetup"
import axios from "axios"
import { CheckProfile } from "./pages/CheckProfile"
function App() {
	const [islogin, setIslogin] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
  
	useEffect(() => {
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
	  };
  
	  checkAuthentication();
	}, []);
  
	if (isLoading) {
	  return <div>Loading...</div>;
	}
	console.log(islogin);
	
	return (
		<BrowserRouter>
		  <Routes>
			{islogin  ? (
			  <>
			
				<Route path={`/Profile/:username`} element={<CheckProfile />} />
				<Route path="/Game" element={<GameSetup />} />
				<Route path="/2fa" element={<TwofaAuth />} />
				<Route path="/Chat" element={<Chat />} />
				<Route path="/Chat/:id" element={<Chat />} />
				<Route path="/error" element={<ForOFor />} />
				<Route path="/" element={<Profile />} />
				<Route path="*" element={<ForOFor />} />
				{/* <Route path="chat/*" element={<ForOFor/>}/> */}
			  </>
			) : (
				<>
			<Route path="/set_username" element={<SetUsername />} />
			  <Route path="*" element={<SignIn />} />
				</>
			)}
		  </Routes>
		</BrowserRouter>
	  );	  
  }
  
  export default App;
  