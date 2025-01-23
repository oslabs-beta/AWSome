import { Outlet } from 'react-router';

function Layout() {
  return (
    <div style={{ backgroundColor: 'lightCoral' }}>
      <Outlet />
    </div>
  );
}

export default Layout;
