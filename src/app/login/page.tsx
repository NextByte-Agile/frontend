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
    <div className="flex items-center justify-center h-screen bg-zinc-100">
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
          className="w-full p-2 bg-blue-500 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
