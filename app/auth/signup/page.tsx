"use client";

import { useRouter } from "next/navigation";
import { useSignup } from "@/hooks/user/useSignup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";

const formSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export default function SignupPage() {
  const router = useRouter();
  const signupMutation = useSignup();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    signupMutation.mutate(values, {
      onSuccess: () => {
        toast.success("Account created successfully! Redirecting to log in...");
        router.push("/auth/login");
      },
      onError: (error) => {
        toast.error("Failed to create your account. Please try again.");
        console.error("Signup error:", error);
      }
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg border border-gray-200">
        <div className="flex flex-col items-center mb-6">
          <Link href="/" className="mb-6 block px-2">
            <span className="text-4xl font-extrabold text-black tracking-wide">W</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-gray-900">Create Your Account</h1>
          <p className="text-sm text-gray-600 mt-1">Join Wrensly and start sharing</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Your chirp name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="you@email.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-900 text-white font-bold py-2 rounded-full"
            >
              Create Account
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-semibold text-black hover:underline">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}
