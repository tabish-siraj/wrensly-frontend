// app/login/page.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLogin } from "@/hooks/user/useLogin";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const loginMutation = useLogin();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginMutation.mutate({ email, password });
    };
    return (
        <div className="flex min-h-screen items-center justify-center bg-black px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
                <h1 className="mb-6 text-3xl font-bold text-center text-gray-900">Log in to X</h1>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <Input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            className="mt-1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <Input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            className="mt-1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button type="submit" className="w-full">
                        Log In
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    <Link href="#" className="text-blue-600 hover:underline">
                        Forgot password?
                    </Link>
                </div>

                <div className="mt-4 text-center text-sm text-gray-600">
                    Don’t have an account?{" "}
                    <Link href="/auth/signup" className="font-medium text-blue-600 hover:underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    )
}
