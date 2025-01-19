import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Layout from './pages/Layout.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<Layout />}>
        <Route path='/Login' element={<Login />} />
        </Route>
        <Route path='/Signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
