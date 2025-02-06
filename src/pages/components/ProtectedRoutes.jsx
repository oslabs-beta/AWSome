import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { userSession } = useAuth();

  //checks user session, if not active, redirect to Login; replace here esssentially replaces the current route/page with new route, 
  // therefore user cannot simply hit back button to go back to this page.
  if (!userSession) return <Navigate to='/' replace />;

  //placeholder for any child routes that will load if user session exists
  return <Outlet />;
};

export default ProtectedRoute;
