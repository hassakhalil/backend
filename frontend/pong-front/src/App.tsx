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
import { GameRoute } from "./components/Game/GameRoute"
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

	const App: React.FC = ()=> {

		return (
			<>
				<>

				<BrowserRouter>
				  <NavBar/>
				  <ProfileProvider>
					<Routes>
					  <Route path={`/Profile/:username`} element={<CheckProfile />} />
				  		<Route path="/game" element={<GameSetup />} />
					  <Route path="/Chat" element={<Chat />} />
					  <Route path="/Chat/:id" element={<Chat />} />
					  <Route path="/error" element={<ForOFor />} />
					  <Route path="/" element={<Profile />} />
					  <Route path="*" element={<ForOFor />} />
					</Routes>
					  </ProfileProvider>
				  </BrowserRouter>
				  </>
			</>
		  );
		  
	}
	
	export default App;
	