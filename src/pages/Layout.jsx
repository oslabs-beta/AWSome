import { Outlet } from 'react-router';

//layout for navigation between pages
function Layout() {
  //REFACTOR TO ADD NAVBAR COMPONENTS HERE, to reduce repetition of code
  return (
    <>
      <div className='bg-white border-gray-200'>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
