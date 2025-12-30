"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import useUserStore from "@/src/stores/userStore";
import { useResendVerifyEmail } from "@/hooks/user/useResendVerifyEmail";
import { toast } from "sonner";
import { Mail, X } from "lucide-react";

export const TopBar = () => {
    const { user } = useUserStore();
    const { mutate, isPending } = useResendVerifyEmail();
    const [isVisible, setIsVisible] = React.useState(true);

    const handleResendEmail = () => {
        if (!user) return;
        mutate({ username: user.username, email: user.email }, {
            onSuccess: () => {
                toast.success("Verification email sent successfully! Please check your inbox.");
            },
            onError: (error) => {
                toast.error(error.message || "Failed to resend verification email");
            }
        });
    };

    if (!user || user.is_email_verified || !isVisible) {
        return null;
    }

    return (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-yellow-600" />
                    <div className="flex-1">
                        <p className="text-sm font-medium text-yellow-800">
                            Please verify your email address
                        </p>
                        <p className="text-xs text-yellow-700">
                            We sent a verification email to <span className="font-medium">{user.email}</span>
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        onClick={handleResendEmail}
                        disabled={isPending}
                        size="sm"
                        className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs px-3 py-1"
                    >
                        {isPending ? "Sending..." : "Resend Email"}
                    </Button>
                    <Button
                        onClick={() => setIsVisible(false)}
                        variant="ghost"
                        size="sm"
                        className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-100 p-1"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};