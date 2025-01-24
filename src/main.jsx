import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import Home from './pages/Home.jsx';
import Error from './pages/Error.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Layout from './pages/Layout.jsx';
import Forgot from './pages/Forgot.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
        </Route>
        <Route path='/Home' element={<Home />} />
        <Route path='*' element={<Error />} />
        <Route path='/Forgot' element={<Forgot />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
