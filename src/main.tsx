import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes, HashRouter } from 'react-router-dom'
import Register from './components/Register.tsx'
import Login from './components/Login.tsx'
import Welcome from './components/Welcome.tsx'
import Home from './components/Home.tsx'
import { UserProvider } from './components/UserContext.tsx'
import './css/general.css'
import Contacts from './components/Contacts.tsx'
import Chat from './components/Chat.tsx'
import SearchUsers from './components/SearchUsers.tsx'
import Profile from './components/Profile.tsx'
import Requests from './components/Requests.tsx'
import { ThemeProvider } from './components/Theme.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <ThemeProvider>
        <HashRouter>
          <Routes>
            <Route path='/' Component={() => <Home Comp = {Welcome} />} />
            <Route path='/contacts' Component={() => <Home Comp={Contacts} />} />
            <Route path='/register' Component={() => <Home Comp={Register} />} />
            <Route path='/login' Component={() => <Home Comp={Login} />} />
            <Route path='/chat/:friend' Component={() => <Home Comp={Chat} />}/>
            <Route path='/search' Component={() => <SearchUsers />} />
            <Route path='/profile/:id' Component={() => <Home Comp={Profile} />} />
            <Route path='/requests' Component={() => <Home Comp={Requests}/>}/>
          </Routes>
        </HashRouter>
      </ThemeProvider>
    </UserProvider>
  </React.StrictMode>,
)
