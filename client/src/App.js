// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import TitleHeader from './TitleHeader';
import Dashboard from './Dashboard';
import Landing from './Landing';
import Login from './Login';
import Signup from './SignUp';
import { AuthProvider, useAuth } from './AuthContext';
import Layout from './Layout';
import PasswordReset from './PasswordReset';
import SocialDashboard from './SocialDashboard';
import Friends from './Friends';

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
              <Route path="/reset-password" element={<PasswordReset />} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/social" element={<PrivateRoute><SocialDashboard /></PrivateRoute>} />
              <Route path="/friends" element={<PrivateRoute><Friends /></PrivateRoute>} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
