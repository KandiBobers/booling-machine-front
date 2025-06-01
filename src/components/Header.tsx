import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="header">
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/my-bookings">Мои брони</Link>
        <button onClick={onLogout}>Выйти</button>
      </nav>
    </header>
  );
};

export default Header;