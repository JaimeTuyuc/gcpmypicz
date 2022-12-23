import './App.css';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRutes from './components/pages/private/ProtectedRoutes';
import Login from '../src/components/pages/public/Login';
import HomePage from './components/pages/private/home/HomePage';
import Albums from './components/pages/private/Albums/Albums';
import Images from './components/pages/private/Images/Images';
import PublicRoutes from './components/pages/public/PublicRoutes';
import Register from './components/pages/public/Register';
import ForgotPassword from './components/pages/public/ForgotPassword';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { refreshSessionToken } from './services/userService';
import Profile from './components/pages/private/User/Profile';
import AlbumImages from './components/pages/private/Albums/AlbumImages';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('$token');
    if (token) {
      dispatch(refreshSessionToken(token));
      // TODO change to when making real request
    }
  },[])

  return (
    <>
      <div>
        <Routes>
          { /* Protected Routes*/}
          <Route path='/app' element={<ProtectedRutes />} >
            <Route index path='/app' element={<HomePage />} />
            <Route path='album/:id' element={<AlbumImages />} />
            <Route path='images' element={<Images />} />
            <Route path='profile' element={<Profile />} />
          </Route>
          { /* Public Routes*/}
          <Route path='/' element={<PublicRoutes />} >
            <Route index path='/' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
          </Route>
        </Routes>

        <Toaster
          toastOptions={{
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </div>
    </>
  )
}

export default App;
