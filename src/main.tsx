import React from 'react'
import ReactDOM from 'react-dom/client'
import '../public/css/index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/Register.tsx'
import Login from './components/Login.tsx'
import Welcome from './components/Welcome.tsx'
import Home from './components/Home.tsx'
import { UserProvider } from './components/UserContext.tsx'
import './css/general.css'
import Contacts from './components/Contacts.tsx'
import Chat from './components/Chat.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={() => <Home Comp = {Welcome} />} />
          <Route path='/contacts' Component={() => <Home Comp={Contacts} />} />
          <Route path='/register' Component={() => <Home Comp={Register} />} />
          <Route path='/login' Component={() => <Home Comp={Login} />} />
          <Route path='/chat/:friend' Component={() => <Home Comp={Chat} />}/>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>,
)
