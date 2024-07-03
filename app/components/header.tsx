// components/Header.tsx
"use client";
import Link from 'next/link';
// import { useState } from 'react';

const Header = () => {
    // const [isLoggedIn, setIsLoggedIn] = useState(!!username); // Check if user is logged in

    const handleLogout = () => {
      // Perform logout actions here, such as clearing session, state, or token
    //   setIsLoggedIn(false); // Example: Reset isLoggedIn state
      // Optionally, perform additional logout logic like clearing cookies, local storage, etc.
    };
  return (
    <header className="bg-gray-800 p-4 fixed w-full top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/">Home</Link>
        <div>
         
            <Link href="/login">Login</Link>
        
        </div>
      </nav>
    </header>
  );
};

export default Header;
