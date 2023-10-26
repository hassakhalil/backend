import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChatSocketContext, ChatSocketProvider } from "./components/Chat/contexts/chatContext"
import { StateProvider } from './components/Profile/States/stateContext.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(

    <App />

)
