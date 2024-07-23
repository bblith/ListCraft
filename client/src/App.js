import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import TitleHeader from './TitleHeader';
import Dashboard from './Dashboard';
import Footer from './Footer';

import Landing from './Landing';
import Login from './Login';
import Signup from './SignUp';
import { AuthProvider, useAuth } from './AuthContext'; // Import useAuth
import Layout from './Layout';

import ShowTodoList from './components/showTodoList';
// import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import CreateTodo from './components/createTodo';

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <TitleHeader />
          <Layout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="*" element={<Navigate to="/" />} />
                
                 <Route exact path="/" element={<ShowTodoList/>} />  
                    <Route path="/create-todo" element={<CreateTodo/>} />
            </Routes>
          </Layout>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

