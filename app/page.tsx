"use client";
import useUserStore from "@/src/stores/userStore";

export default function Home() {
  const { user, isAuthenticated } = useUserStore((state) => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
  }));

  return (
    <>
      <h1>{JSON.stringify(user)}</h1>
      <h1>{isAuthenticated.toString()}</h1>
    </>
  );
}