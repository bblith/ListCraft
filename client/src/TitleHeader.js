import React from 'react';
import './TitleHeader.css';
import ListCraftLogo from './Assets/ListCraftLogo.png'; // Adjust the path as necessary

function TitleHeader() {
  return (
    <header className="title-header">
      <img src={ListCraftLogo} alt="List Craft Logo" className="logo" />
    </header>
  );
}

export default TitleHeader;
