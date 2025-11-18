import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => (
  <div className="app-shell">
    <Header />
    <main>
      <Outlet />
    </main>
  </div>
);

export default Layout;

