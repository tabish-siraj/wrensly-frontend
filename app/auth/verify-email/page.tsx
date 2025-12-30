"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useVerifyEmail } from "@/hooks/user/useVerifyEmail";
import { useResendVerifyEmail } from "@/hooks/user/useResendVerifyEmail";
import useUserStore from "@/src/stores/userStore";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function VerifyEmailComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const { user, setUser } = useUserStore();

  const {
    mutate: verifyEmail,
    isPending,
    isSuccess,
    isError,
  } = useVerifyEmail();

  const {
    mutate: resendEmail,
    isPending: isResending,
  } = useResendVerifyEmail();

  useEffect(() => {
    if (token) {
      verifyEmail({ token }, {
        onSuccess: (data) => {
          // Update user store with verified status
          if (user) {
            setUser({ ...user, is_email_verified: true });
          }
          toast.success("Email verified successfully!");
          // Redirect to feed after 2 seconds
          setTimeout(() => {
            router.push("/");
          }, 2000);
        },
        onError: (error) => {
          toast.error("Email verification failed");
        }
      });
    }
  }, [token, verifyEmail, user, setUser, router]);

  const handleResendEmail = () => {
    if (!user) {
      toast.error("User information not available");
      return;
    }

    resendEmail({
      username: user.username,
      email: user.email
    }, {
      onSuccess: () => {
        toast.success("Verification email sent successfully! Please check your inbox.");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to resend verification email");
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl border border-gray-200 text-center">
        <div className="flex flex-col items-center mb-6">
          <Link href="/" className="mb-6 block px-2">
            <span className="text-4xl font-extrabold text-black tracking-wide">W</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-gray-900">Verify Your Email</h1>
        </div>

        {isPending && (
          <div className="space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
            <p className="text-gray-600">Verifying your email, please wait...</p>
          </div>
        )}

        {isSuccess && (
          <div className="space-y-4">
            <div className="text-green-600 text-6xl mb-4">✓</div>
            <p className="text-green-600 font-semibold">Email verified successfully!</p>
            <p className="text-gray-600">Redirecting you to the feed...</p>
            <Button asChild className="bg-black hover:bg-neutral-800 text-white font-bold py-2 rounded-full transition-all">
              <Link href="/">Go to Feed Now</Link>
            </Button>
          </div>
        )}

        {isError && (
          <div className="space-y-4">
            <div className="text-red-600 text-6xl mb-4">✗</div>
            <p className="text-red-600 font-semibold">
              Failed to verify email
            </p>
            <p className="text-gray-600 text-sm">
              The verification link might be invalid or expired.
            </p>

            {user && (
              <div className="space-y-3">
                <Button
                  onClick={handleResendEmail}
                  disabled={isResending}
                  className="w-full bg-black hover:bg-neutral-800 text-white font-bold py-2 rounded-full transition-all"
                >
                  {isResending ? "Sending..." : "Resend Verification Email"}
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/">Continue to Feed</Link>
                </Button>
              </div>
            )}

            {!user && (
              <Button asChild className="bg-black hover:bg-neutral-800 text-white font-bold py-2 rounded-full transition-all">
                <Link href="/auth/login">Go to Login</Link>
              </Button>
            )}
          </div>
        )}

        {!token && !isPending && (
          <div className="space-y-4">
            <div className="text-yellow-600 text-6xl mb-4">⚠</div>
            <p className="text-gray-600 font-semibold">
              No verification token found
            </p>
            <p className="text-gray-600 text-sm">
              Please check the verification link in your email.
            </p>

            {user && (
              <div className="space-y-3">
                <Button
                  onClick={handleResendEmail}
                  disabled={isResending}
                  className="w-full bg-black hover:bg-neutral-800 text-white font-bold py-2 rounded-full transition-all"
                >
                  {isResending ? "Sending..." : "Resend Verification Email"}
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/">Continue to Feed</Link>
                </Button>
              </div>
            )}

            {!user && (
              <Button asChild className="bg-black hover:bg-neutral-800 text-white font-bold py-2 rounded-full transition-all">
                <Link href="/">Go to Homepage</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
      </div>
    }>
      <VerifyEmailComponent />
    </Suspense>
  )
}
