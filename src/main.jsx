import { StrictMode } from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import Home from './pages/Home.jsx';
import Error from './pages/Error.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Layout from './pages/Layout.jsx';
import LineChartPage from './pages/components/LineChartPage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
        </Route>
        <Route path='/chart' element={<LineChartPage />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
