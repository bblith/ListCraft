import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { signOut } from 'firebase/auth';
import { auth } from './Firebase';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
        console.log('Signed out successfully');
      })
      .catch((error) => {
        console.error('Sign out error', error);
      });
  };

  return (
    <nav className="navbar">
      <ul>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/analytics">Analytics</NavLink></li>
        <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;
