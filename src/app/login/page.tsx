"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    router.push("/vehiculos");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover bg-[url('/images/background.jpg')]">
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div className="relative mx-auto">
        <div className="w-96 p-8 bg-white text-black shadow-md rounded-md">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border mb-4 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border mb-4 rounded"
          />
          <button
            onClick={handleLogin}
            className="w-full p-2 bg-gray-800 text-white hover:bg-gray-600 rounded"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
