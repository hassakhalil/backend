import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ProfileProvider } from './ProfileContext.tsx';
import { BrowserRouter, Routes, Route} from "react-router-dom"
// import { ChatSocketContext, ChatSocketProvider } from "./components/Chat/contexts/chatContext"
// import { StateProvider } from './components/Profile/States/stateContext.tsx'
// ReactDOM.createRoot(document.getElementById('root')!).render(

//     <App />

// )


const Root: React.FC = () => {
    return (
      <ProfileProvider>
        {/* <BrowserRouter> */}
          {/* <Routes> */}
            <App />
          {/* </Routes> */}
        {/* </BrowserRouter> */}
      </ProfileProvider>
    );
  };
  
//   ReactDOM.render(<Root />, document.getElementById('root'));


  ReactDOM.createRoot(document.getElementById('root')!).render(

    <Root />

)

