import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

function Layout({ children }) {
  const location = useLocation();
  const hideNavbar = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div>
      {!hideNavbar && <Navbar />}
      {children}
    </div>
  );
}

export default Layout;
