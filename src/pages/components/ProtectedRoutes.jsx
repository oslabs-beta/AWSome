import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { userSession } = useAuth();

  //checks user session, if not active, redirect to Login
  if (!userSession) return <Navigate to='/' replace />;

  return <Outlet />;
};

export default ProtectedRoute;
