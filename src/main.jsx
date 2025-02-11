import { StrictMode } from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import Error from './pages/Error.jsx';
import Login from './pages/login/Login.jsx';
import Signup from './pages/login/Signup.jsx';
import Layout from './pages/Layout.jsx';
import Forgot from './pages/login/Forgot.jsx';
import BarChart from './pages/components/Barchart.jsx';
import { BrowserRouter, Routes, Route } from 'react-router';
import LineChart from './pages/components/Linechart.jsx';
import { AuthProvider } from './pages/context/AuthContext.jsx';
import ProtectedRoute from './pages/components/ProtectedRoutes.jsx';
import NewUser from './pages/newUserProfile.jsx';
import Dashboard from './pages/dashboard.jsx';

//polyfill for global
window.global = window;

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/Home' element={<Dashboard />} />
          <Route path='/newUserProfile' element={<NewUser />} />
        </Route>
        <Route path='/Forgot' element={<Forgot />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
// removed strict mode
