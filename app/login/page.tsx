// pages/login.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
// import Layout from "../components/Layout";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://backend-geodata.vercel.app/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const { msg } = await res.json();
        throw new Error(msg || "Login failed");
      }

      // Redirect or handle success as needed
      console.log("Login successful");

      // Example: Redirect to home page
      window.location.href = "/";
    } catch (error) {
    //   setError(error.message);
    console.log(error)
    }
  };

  return (
      <div className="max-w-md mx-auto bg-white p-8 mt-12 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="block w-full bg-blue-500 text-white py-2 rounded-md">
            Login
          </button>
        </form>
        <p className="text-center text-blue-600 mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/register">
            Register here
          </Link>
        </p>
      </div>
  );
};

export default Login;




