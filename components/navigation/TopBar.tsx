"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import useUserStore from "@/src/stores/userStore";
import { useResendVerifyEmail } from "@/hooks/user/useResendVerifyEmail";
import { toast } from "sonner";

export const TopBar = () => {
    const { user } = useUserStore();
    const { mutate, isPending } = useResendVerifyEmail();

    const handleResendEmail = () => {
        if (!user) return;
        mutate({ username: user.username, email: user.email }, {
            onSuccess: () => {
                toast.success("Verification email sent successfully!");
            },
            onError: (error) => {
                toast.error(error.message);
            }
        });
    };

    if (!user || user.is_email_verified) {
        return null;
    }

    return (
        <div className="py-2 text-right">
            <Button onClick={handleResendEmail} disabled={isPending} className="mr-4">
                {isPending ? "Sending..." : "Resend verification email"}
            </Button>
        </div>
    );
};