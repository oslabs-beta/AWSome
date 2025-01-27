import { StrictMode } from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import Home from './pages/Home.jsx';
import Error from './pages/Error.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Layout from './pages/Layout.jsx';
import LineChartPage from './pages/components/LineChartPage.jsx';
import BarChart from './pages/components/Barchart.jsx';
import { BrowserRouter, Routes, Route } from 'react-router';

//polyfill for global
window.global = window;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
        </Route>
        <Route path='/Home' element={<Home />} />
        <Route path='/chart' element={<LineChartPage />} />
        <Route path='/barchart' element={<BarChart />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
