import React from 'react';
import type { AppProps } from 'next/app';
import Header from '../components/Header';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [authData, setAuthData] = React.useState({ username: '', password: '' });

  const handleLogin = (username: string, password: string) => {
    setAuthData({ username, password });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setAuthData({ username: '', password: '' });
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  return (
    <div className="app">
      {isLoggedIn && <Header onLogout={handleLogout} />}
      <Component 
        {...pageProps} 
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        authData={authData}
      />
    </div>
  );
}

export default MyApp;