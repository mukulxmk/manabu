export default function Home() {
  return (
    <div className="min-h-screen bg-[#5c623b] text-white p-6">
      {/* TOP BAR */}
      <div className="flex items-center justify-between w-full px-4">
        {/* Search Bar Label */}
        <span className="px-3 py-1 bg-gray-700 rounded-md text-sm">
          Search Bar
        </span>

        {/* Login Buttons */}
        <div className="flex items-center gap-3">
          <button className="px-4 py-1 bg-[#bcd3e7] text-black rounded-md">
            Login
          </button>
          <button className="px-4 py-1 bg-[#bcd3e7] text-red-600 font-bold rounded-md italic">
            LOGIN
          </button>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="w-full flex justify-center mt-4">
        <div className="flex items-center bg-[#333] w-[70%] h-12 rounded-full px-4">
          {/* Icon */}
          <div className="text-xl">🔍</div>

          {/* Input */}
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent flex-1 outline-none px-4 text-white"
          />

          {/* Toggle */}
          <div className="w-10 h-6 bg-[#76eb63] rounded-full cursor-pointer"></div>
        </div>
      </div>

      {/* SECTION LABEL */}
      <div className="mt-6">
        <span className="px-3 py-1 bg-gray-700 rounded-md text-sm">
          Section 4
        </span>
      </div>

      {/* BIG DARK BOX */}
      <div className="bg-[#3a3a3a] w-full h-[500px] rounded-md mt-2 border border-black"></div>
    </div>
  );
}
