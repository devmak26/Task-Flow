"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const body: Record<string, string> = {
      email: fd.get("email") as string,
      password: fd.get("password") as string,
    };
    if (mode === "signup") body.name = fd.get("name") as string;

    const res = await fetch(`/api/auth?action=${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "Something went wrong");
    }
  }

  return (
    <main className="max-w-sm mx-auto p-8 mt-16">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {mode === "login" ? "Sign in to TaskFlow Pro" : "Create an account"}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {mode === "signup" && (
          <input
            name="name"
            type="text"
            placeholder="Your name"
            required
            className="border p-2 rounded bg-transparent"
          />
        )}
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="border p-2 rounded bg-transparent"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={8}
          className="border p-2 rounded bg-transparent"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Please wait…" : mode === "login" ? "Sign in" : "Sign up"}
        </button>
      </form>

      <p className="text-center mt-4 text-sm">
        {mode === "login" ? (
          <>
            No account?{" "}
            <button
              onClick={() => { setMode("signup"); setError(""); }}
              className="text-blue-500 underline"
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              onClick={() => { setMode("login"); setError(""); }}
              className="text-blue-500 underline"
            >
              Sign in
            </button>
          </>
        )}
      </p>
    </main>
  );
}