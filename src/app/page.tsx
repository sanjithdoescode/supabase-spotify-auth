"use client";
import { supabase } from "../utils/supabaseClient";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        router.replace("/dashboard");
      }
    };
    checkSession();
  }, [router]);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: "spotify" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">Login with Spotify</h1>
        <button
          onClick={handleLogin}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition-colors w-full flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <circle cx="12" cy="12" r="10" fill="#1DB954" />
            <path stroke="#fff" strokeWidth="2" d="M8 15s1.5-2 4-2 4 2 4 2" />
          </svg>
          Continue with Spotify
        </button>
      </div>
    </div>
  );
}
