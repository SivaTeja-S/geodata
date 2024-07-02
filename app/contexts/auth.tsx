"use client";
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext(null);

export const AuthProvider = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

//   const login = (username) => {
//     setUser({ username });
//     localStorage.setItem('user', JSON.stringify({ username }));
//     router.push('/');
//   };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    // <AuthContext.Provider>
      {/* {children} */}
    // </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
