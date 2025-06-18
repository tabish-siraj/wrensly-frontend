"use client";
import { useState } from "react";
import useUserStore from "@/src/stores/userStore";

export default function Home() {
  const { user, isAuthenticated } = useUserStore(
    (state: any) => ({
      user: state.user,
      isAuthenticated: state.isAuthenticated,
    })
  );
  return (
    <h1>{user}</h1>
  );
}
