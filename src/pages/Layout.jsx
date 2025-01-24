import { Outlet } from 'react-router';



function Layout() {
  return (
    <div >
      <Outlet />
    </div>
  );
}

export default Layout;

// class='grid grid cols-1 grid-rows- gap-4