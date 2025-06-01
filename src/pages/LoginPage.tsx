import React, { useState } from 'react';
import { login } from '../api/auth';

interface LoginPageProps {
  onLogin: (username: string, password: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login(username, password);
    if (success) {
      onLogin(username, password);
    } else {
      setError('Неверный логин или пароль');
    }
  };

  const openTelegram = () => {
    window.open('https://t.me/booling_machine_bot', '_blank');
  };

  return (
    <div className="login-container">
      <h1>Вход в аккаунт</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Логин:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Пароль:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Войти</button>
      </form>
      <button className="telegram-button" onClick={openTelegram}>
        Получить логин и пароль в Telegram
      </button>
    </div>
  );
};

export default LoginPage;