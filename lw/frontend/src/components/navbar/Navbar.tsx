import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4 border-b bg-[#171717]">
      <span className="font-bold">Event Finder </span>

      <div className="flex items-center gap-3">
          <button className="px-4 py-1 bg-[#bcd3e7] text-red-600 rounded-md font-bold italic">
            <Link
            href="/login"
            className=""
            >
                Login
            </Link>
          </button>
          <button className="px-4 py-1 bg-[#bcd3e7] text-red-600 font-bold rounded-md italic">
            <Link
            href="/signup"
            className=""
            >
            SignUp
            </Link>
          </button>
        </div>

 
    </nav>
  );
}
