import React from 'react';
import './App.css';
import TitleHeader from './TitleHeader';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import Footer from './Footer';
import ShowTodoList from './components/showTodoList';
import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import CreateTodo from './components/createTodo';

function App() {
  return (
    <div className="App">
      <TitleHeader />
      <Navbar />
      <Dashboard /> 
      <BrowserRouter>
                <Routes>   
                    <Route exact path="/" element={<ShowTodoList/>} />  
                    <Route path="/create-todo" element={<CreateTodo/>} /> 
                </Routes>
            </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

