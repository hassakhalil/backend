import { BrowserRouter, Routes, Route } from "react-router-dom"
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

function App() {
	const [islogin, setIslogin] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
  
	useEffect(() => {
	  const checkAuthentication = async () => {
		try {
		  const response = await axios.get(`http://${import.meta.env.VITE_API_UR}/is-loggedin`, { withCredentials: true });
		  setIslogin(response.data === true);
		} catch (error) {
		  console.log(error);
		} finally {
		  setIsLoading(false);
		}
	  };
  
	  checkAuthentication();
	}, []);
  
	// if (isLoading) {
	//   // You might want to show a loading spinner or something while checking authentication
	//   return <div>Loading...</div>;
	// }
  
	return (
	  <BrowserRouter>
		<Routes>
		  {/* {islogin ? ( */}
			<>
			  <Route path="/set_username" element={<SetUsername />} />
			  <Route path={`/Profile/:username`} element={<Profile />} />
			  <Route path="/Game" element={<GameSetup />} />
			  <Route path="/2fa" element={<TwofaAuth/>}/>
			  <Route path="/Chat" element={<Chat />} />
			  <Route path="/error" element={<ForOFor />} />
			  <Route path="/" element={<SignIn />} />
			</>
		  {/* ) : (
			<div>Loading...</div>
		  )} */}
		</Routes>
	  </BrowserRouter>
	);
  }
  
  export default App;
  