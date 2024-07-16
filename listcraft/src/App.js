// src/App.js
import React from 'react';
import './App.css';
import TitleHeader from './components/TitleHeader';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <TitleHeader />
      <Dashboard />
    </div>
  );
}

export default App;
