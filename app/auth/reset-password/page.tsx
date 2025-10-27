
"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useResetPassword } from "@/hooks/user/useResetPassword";
import { useParams } from "next/navigation";
import Router from "next/router";

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const params = useParams();
    const router = Router;
    const { mutate: resetPassword } = useResetPassword();

    const token = params.token as string;
    if (!token) {
        router.replace("/auth/forgot-password");
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== retypePassword) {
            alert("Passwords do not match");
            return;
        }

        resetPassword({ token, password });
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Reset Password</CardTitle>
                    <CardDescription>
                        Please enter password.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="retypePassword">Retype Password</Label>
                        <Input
                            id="retypePassword"
                            type="retypePassword"
                            placeholder="••••••••"
                            required
                            value={retypePassword}
                            onChange={(e) => setRetypePassword(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full" onClick={handleSubmit}>Reset Password</Button>
                    <p className="text-sm text-center text-gray-500">
                        Remember your password?{" "}
                        <Link href="/auth/login" className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
