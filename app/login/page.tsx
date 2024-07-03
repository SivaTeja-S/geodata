

// pages/login.tsx
"use client";
import Header from "../components/header";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import Layout from "../layout";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  // const[user,setuser]=useState("")
  // const { setUser } = useAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://backend-geodata.vercel.app/api/users/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password })
              });
        
              if (!res.ok) {
                const { msg } = await res.json();
                throw new Error(msg || "Login failed");
              }
      const data = await res.json();
      console.log("Login successful:", data);
      router.push("/");

    } catch (error) {
      // setError(error.message);
    }
  };

  return (
    // <Layout>

      
      <div>
        <Header></Header>
<div className="flex flex-col items-center justify-center logincomponent">
        <div className="max-w-md w-full bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center text-black mb-4">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block font-medium text-black">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="block w-full bg-blue-700 text-black py-2 rounded-md">
              Login
            </button>

          </form>
          <p className="text-center text-black mt-4">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-black">
            Register here
          </Link>
        </p>
        </div>
      </div>
      </div>
    // </Layout>
  );
};

export default Login;
