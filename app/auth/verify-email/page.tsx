"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useVerifyEmail } from "@/hooks/user/useVerifyEmail";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function VerifyEmailComponent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const verifyEmailMutation = useVerifyEmail();

  useEffect(() => {
    if (token) {
      verifyEmailMutation.mutate({ token });
    }
  }, [token, verifyEmailMutation]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl border border-gray-200 text-center">
        <div className="flex flex-col items-center mb-6">
          <Link href="/" className="mb-6 block px-2">
            <span className="text-4xl font-extrabold text-black tracking-wide">W</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-gray-900">Verify Your Email</h1>
        </div>

        {verifyEmailMutation.isPending && (
          <p className="text-gray-600">Verifying your email, please wait...</p>
        )}

        {verifyEmailMutation.isSuccess && (
          <div>
            <p className="text-green-600">Email verified successfully!</p>
            <Link href="/">Click Here</Link> to go to the homepage.
          </div>
        )}

        {verifyEmailMutation.isError && (
          <div>
            <p className="text-red-600">
              Failed to verify email. The token might be invalid or expired.
            </p>
            <Button asChild className="mt-4 bg-black hover:bg-neutral-800 text-white font-bold py-2 rounded-full transition-all">
              <Link href="/auth/signup">Go to Signup</Link>
            </Button>
          </div>
        )}

        {!token && !verifyEmailMutation.isPending && (
          <div>
            <p className="text-gray-600">
              No verification token found. Please check the link in your email.
            </p>
            <Button asChild className="mt-4 bg-black hover:bg-neutral-800 text-white font-bold py-2 rounded-full transition-all">
              <Link href="/">Go to Homepage</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailComponent />
    </Suspense>
  )
}
