'use client';

import Link from "next/link"

export default function Login(){

    const handleGoogleLogin = async (email: string, password: string) => {
        const res = await fetch(`${process.env.BACKEND_URL}/auth/google-login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        });
        const data = res.json();
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6">
            {/* Inputs */}
            <div className="space-y-4">
            <input
                type="email"
                placeholder="Email"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 
                        focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />

            <input
                type="password"
                placeholder="Password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 
                        focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center justify-between">
            <button
                onClick={handleGoogleLogin(email, password)}
                className="rounded-lg bg-red-500 px-5 py-2 text-white font-medium
                        hover:bg-red-600 transition"
            >
            <Link href="/events" >  
                Login
            </Link>
            </button>

            <a
                href="/signup"
                className="text-sm text-red-500 hover:underline"
            >
                Sign Up
            </a>
            </div>
            {/* Google Login */}
            <button
            onClick={() => { window.location.href = `http://localhost:5000/auth/google-login` }}
            className="w-full border py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-100 transition mt-10"
            >
            <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5 text-black"
            />
            Login with Google
            </button>

        </div>
        </div>
    )

}