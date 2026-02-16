"use client";

import { useState } from "react";
import Image from "next/image";

interface GoogleUser {
  name: string;
  email: string;
  picture?: string;
}

export default function CompleteSignupPage() {
  // In real app → get this from query params or context
  const [user] = useState<GoogleUser>({
    name: "Mukul Agarwal",
    email: "mukul@example.com",
    picture: "",
  });

  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    setLoading(true);

    await fetch("/api/auth/complete-signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    window.location.href = "/dashboard";
  };

  const handleCancel = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-6">
        
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Complete Your Signup
        </h1>

        {/* User Info */}
        <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg">
          {user.picture && (
            <Image
              src={user.picture}
              alt={user.name}
              width={50}
              height={50}
              className="rounded-full"
            />
          )}
          <div>
            <p className="font-medium text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* Consent Text */}
        <div className="text-sm text-gray-600 space-y-2">
          <p>
            We couldn’t find an existing account with this email.
          </p>
          <p>
            By continuing, you agree to create a new account using your
            Google information.
          </p>
          <p>
            We will store your name and email securely.
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleContinue}
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            {loading ? "Creating Account..." : "Continue & Create Account"}
          </button>

          <button
            onClick={handleCancel}
            className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}