import { Outlet } from 'react-router';
import './Layout.css'



function Layout() {
  return (
    <><div className='flex w-full h-screen bg-gradient-to-br from-pink-600 via-pink-300 to-white'>
      <Outlet />
    </div>
    <div className='h-full bg-gray-200'>
        <div>hello</div>
      </div></>
    
  );
}

export default Layout;

