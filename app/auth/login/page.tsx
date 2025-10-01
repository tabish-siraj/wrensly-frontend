"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLogin } from "@/hooks/user/useLogin";
// import { Bird } from "lucide-react"; // ⛔ Replaced with 'W'

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl border border-gray-200">

        {/* === Branding Header === */}
        <div className="flex flex-col items-center mb-6">
          {/* ⛔ Previous Bird Icon
          <div className="bg-[#1d9bf0] p-3 rounded-full mb-2 shadow-md">
            <Bird className="h-8 w-8 text-white" />
          </div> */}

          {/* ✅ Replaced with W inside a circle (like Twitter "X") */}
          {/* <div className="bg-[#1d9bf0] p-3 rounded-full mb-2 shadow-md">
            <span className="text-white text-2xl font-bold">W</span>
          </div> */}
          <Link href="/" className="mb-6 block px-2">
            <span className="text-4xl font-extrabold text-black tracking-wide">W</span>
          </Link>

          <h1 className="text-2xl font-extrabold text-gray-900">Log in to Wrensly</h1>
          <p className="text-sm text-gray-600 mt-1">Join the flock. Sp</p>
        </div>

        {/* === Login Form === */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-800">
              Email
            </label>
            <Input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="mt-1 bg-[#f1f5f9] border border-gray-400 text-gray-900 placeholder-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-800">
              Password
            </label>
            <Input
              type="password"
              id="password"
              placeholder="••••••••"
              className="mt-1 bg-[#f1f5f9] border border-gray-400 text-gray-900 placeholder-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-black hover:bg-neutral-800 text-white font-bold py-2 rounded-full transition-all"
          >
            Enter Your Nest
          </Button>
        </form>

        {/* === Links Section === */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <Link href="#" className="text-black hover:underline">
            Forgot your flight path?
          </Link>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          Don’t have a Nest yet?{" "}
          <Link href="/auth/signup" className="font-semibold text-black hover:underline">
            Hatch your account
          </Link>
        </div>
      </div>
    </div>
  );
}
