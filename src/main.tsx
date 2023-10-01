import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Register from './pages/Register.tsx';
import Login from './pages/Login.tsx';
import Welcome from './pages/Welcome.tsx';
import Home from './components/Home.tsx';
import { UserProvider } from './components/UserContext.tsx';
import './css/general.css';
import Contacts from './pages/Contacts.tsx';
import Chat from './pages/Chat.tsx';
import SearchUsers from './pages/SearchUsers.tsx';
import Profile from './pages/Profile.tsx';
import Requests from './pages/Requests.tsx';
import { ThemeProvider } from './components/Theme.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home Comp={Welcome} />} />
            <Route path='/contacts' element={<Home Comp={Contacts} />} />
            <Route path='/register' element={<Home Comp={Register} />} />
            <Route path='/login' element={<Home Comp={Login} />} />
            <Route path='/chat/:friend' element={<Home Comp={Chat} />} />
            <Route path='/search' element={<SearchUsers />} />
            <Route path='/profile/:id' element={<Home Comp={Profile} />} />
            <Route path='/requests' element={<Home Comp={Requests} />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);
