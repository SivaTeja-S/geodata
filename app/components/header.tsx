"use client";
import Link from 'next/link';
import { useAuth } from '../contexts/auth';

function Header() {
    const { user, logout } = useAuth();

  return (
    <header className="bg-gray-800 p-4 fixed w-full top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/">
        Home
        </Link>
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-white">Welcome, {user.username}!</span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
