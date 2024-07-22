// src/components/Navbar.js
import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="#tasks">Tasks</a></li>
        <li><a href="#social">Social</a></li>
        <li><a href="#login">Login</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
