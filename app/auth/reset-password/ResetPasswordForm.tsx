'use client';

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
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ResetPasswordForm() {
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [errors, setErrors] = useState<{ password?: string; retypePassword?: string }>({});
    const searchParams = useSearchParams();
    const router = useRouter();
    const { mutate: resetPassword, isPending } = useResetPassword();

    const token = searchParams.get("token");
    if (!token) {
        router.replace("/auth/forgot-password");
        return null;
    }

    const validateForm = () => {
        const newErrors: { password?: string; retypePassword?: string } = {};

        if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (password !== retypePassword) {
            newErrors.retypePassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        resetPassword({ token, password }, {
            onSuccess: () => {
                toast.success("Password reset successfully!");
                router.push("/auth/login");
            },
            onError: (error) => {
                toast.error("Failed to reset password. Please try again.");
                if (process.env.NODE_ENV === 'development') {
                    console.error(error);
                }
            }
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Reset Password</CardTitle>
                    <CardDescription>Please enter a new password.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (errors.password) {
                                        setErrors(prev => ({ ...prev, password: undefined }));
                                    }
                                }}
                                className={errors.password ? "border-red-500" : ""}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500">{errors.password}</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="retypePassword">Retype Password</Label>
                            <Input
                                id="retypePassword"
                                type="password"
                                placeholder="••••••••"
                                required
                                value={retypePassword}
                                onChange={(e) => {
                                    setRetypePassword(e.target.value);
                                    if (errors.retypePassword) {
                                        setErrors(prev => ({ ...prev, retypePassword: undefined }));
                                    }
                                }}
                                className={errors.retypePassword ? "border-red-500" : ""}
                            />
                            {errors.retypePassword && (
                                <p className="text-sm text-red-500">{errors.retypePassword}</p>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isPending}
                        >
                            {isPending ? "Resetting..." : "Reset Password"}
                        </Button>
                        <p className="text-sm text-center text-gray-500">
                            Remember your password?{" "}
                            <Link href="/auth/login" className="text-blue-500 hover:underline">
                                Login
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
