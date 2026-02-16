"use client";

import { useState } from "react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleGoogleRedirect = async () => {
    const googleAuthUrl =
    "https://accounts.google.com/o/oauth2/v2/auth" +
    "?response_type=code" +
    "&client_id=" + process.env.GOOGLE_CLIENT_ID +
    "&redirect_uri=" + encodeURIComponent(
      "http://localhost:5000/auth/google/callback"
    ) +
    "&scope=" + encodeURIComponent("openid email profile");

    router.push(googleAuthUrl);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.BACKEND_URL}/auth`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }
      setResponse(data);

      console.log("Signup success:", data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }

    // TODO: Call signup API
    console.log({ email, password });
  };
  console.log("---------------------------",process.env.BACKEND_URL);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {( loading? (<p> Loading... </p>) :
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Create an account
        </h1>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
          />

          <button
            type="submit"
            className="w-full bg-black text-black py-2 rounded hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Google Signup */}
        <button
          onClick={handleGoogleRedirect}
          className="w-full border py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-100 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5 text-black"
          />
          Sign up with Google
        </button>

        {/* Login link */}
        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-black font-medium underline">
            Login
          </Link>
        </p>
        <div>
          {error && <p style={{ color: "red" }}>{error}</p>}

        {response && (
        <pre style={{ marginTop: 20 }}>
          {JSON.stringify(response, null, 2)}
        </pre>
        )}
        </div>
      </div>
    )}
    </div>
  );
}
