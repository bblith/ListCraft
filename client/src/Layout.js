import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

function Layout({ children }) {
  const location = useLocation();
  const hideNavbar = ['/','/login', '/signup', '/reset-password'].includes(location.pathname); // Include /reset-password

  return (
    <div>
      {!hideNavbar && <Navbar />}
      {children}
    </div>
  );
}

export default Layout;
