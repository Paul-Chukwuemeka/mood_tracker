"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        window.location.href = "/";
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-dvh p-4 font-fredoka">
      <div className="w-full max-w-md">
        <div className="border-12 border-white rounded-[30px] bg-light-peach shadow-sky shadow-[-8px_8px_0px] p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-medium text-header mb-2">
              Welcome Back
            </h1>
            <p className="text-lg text-text-secondary">
              Log in to track your mood
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-lg font-medium text-text-primary"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full p-3 text-lg rounded-xl border-2 border-sky/50 bg-white outline-none focus:border-header transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-lg font-medium text-text-primary"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full p-3 text-lg rounded-xl border-2 border-sky/50 bg-white outline-none focus:border-header transition-colors"
              />
            </div>

            {error && (
              <p className="text-red-500 text-md text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 text-xl font-medium text-white bg-header rounded-xl hover:bg-header/90 disabled:opacity-50 transition-all mt-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center mt-6 text-text-secondary text-lg">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-header font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
