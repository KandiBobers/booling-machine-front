import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const router = useRouter();

  const handleLogout = () => {
    onLogout();
    router.push('/login'); // Перенаправляем на страницу входа после выхода
  };

  return (
    <header className="header">
      <nav>
        <Link href="/" legacyBehavior>
          <a className={router.pathname === '/' ? 'active' : ''}>Главная</a>
        </Link>
        <Link href="/my-bookings" legacyBehavior>
          <a className={router.pathname === '/my-bookings' ? 'active' : ''}>Мои брони</a>
        </Link>
        <button onClick={handleLogout}>Выйти</button>
      </nav>
    </header>
  );
};

export default Header;