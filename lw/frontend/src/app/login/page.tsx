'use client';

import Link from "next/link"

export default function Login(){
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
          onClick={() => { window.location.href = `http://localhost:5000/auth/google` }}

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
        </div>
        </div>
    )

}