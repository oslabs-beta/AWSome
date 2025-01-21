import { Outlet } from 'react-router';

function Layout() {

    return (
        <div style={{ backgroundColor: 'green'}}>
        <Outlet />
      </div>
    )
  }
  
  export default Layout
  