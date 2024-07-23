import React from 'react';
import './Navbar.css';
import { signOut } from 'firebase/auth';
import { auth } from './Firebase';
import { useNavigate, Link } from 'react-router-dom';

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
        <li><Link to="/dashboard">Dashboard</Link></li>
        {/*<li><Link to="/social">Social</Link></li>*/}
       {/* <li><Link to="/friends">Friends</Link></li> */}{/* New Friends Tab */}
        <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;
