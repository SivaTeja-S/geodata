// pages/register.tsx
"use client";
import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/header';
// import Layout from '../components/Layout';
import { useRouter } from "next/navigation";

const Register = () => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const res = await fetch('https://backend-geodata.vercel.app/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const { msg } = await res.json();
        throw new Error(msg || 'Registration failed');
      }

      // Redirect or handle success as needed
      console.log('Registration successful');

      // Example: Redirect to login page
      const userData = { username: username }; // Example user data

      // Redirect or handle success as needed
      console.log("Registration successful:", userData);
      window.location.href = '/login';
    } catch (error) {
      
    // console.log(error)
    }
  };

  return (
    <div>
      <Header ></Header>
      <div className="flex flex-col items-center justify-center logincomponent">
      <div className="max-w-md w-full bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-black mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium text-black">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              className="block w-full px-4 py-2 border text-black rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-medium text-black">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block font-medium text-black">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit"className="block w-full bg-blue-700 text-white py-2 rounded-md">
            Register
          </button>
        </form>
        <p className="text-center text-black mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-black">
            Login here
          </Link>
        </p>
      </div>
      </div>

    </div>
     
    
  );
};

export default Register;
