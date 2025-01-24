import { Outlet } from 'react-router';
import './Layout.css'

function Layout() {
  return (
    <div style={{ backgroundColor: 'lightCoral' }}>
      <Outlet />
    </div>
  );
}

export default Layout;
