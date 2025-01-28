import { Outlet } from 'react-router';




function Layout() {
  return (
    <><div className='bg-gray-400 border-gray-200'>
      <Outlet />
    </div>
    <div className='hidden h-full bg-gray-200'>
        <div>hello</div>
      </div></>
    
  );
}

export default Layout;

