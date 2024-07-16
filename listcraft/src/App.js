import React from 'react';
import './App.css';
import TitleHeader from './TitleHeader';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <TitleHeader />
      <Navbar />
      <Dashboard />
      <Footer />
    </div>
  );
}

export default App;
