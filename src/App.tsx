import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import MyBookingsPage from './pages/MyBookingsPage';
import Header from './components/Header';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [authData, setAuthData] = React.useState({ username: '', password: '' });

  const handleLogin = (username: string, password: string) => {
    setAuthData({ username, password });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setAuthData({ username: '', password: '' });
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="app">
        {isLoggedIn && <Header onLogout={handleLogout} />}
        <Routes>
          <Route 
            path="/login" 
            element={
              isLoggedIn ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/" 
            element={
              isLoggedIn ? <HomePage {...authData} /> : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/my-bookings" 
            element={
              isLoggedIn ? <MyBookingsPage {...authData} /> : <Navigate to="/login" />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;