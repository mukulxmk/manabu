import Navbar from "@/components/navbar/Navbar";
import EventGrid from "@/components/card/EventGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#5c623b] text-black p-6">
      <Navbar></Navbar>

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

      {/* BIG DARK BOX */}
      <div className="bg-[#3a3a3a] w-full h-[500px] rounded-md mt-2 border border-black grid-gap">
        {/* <Card title= startDateTime={} > </Card> */}
        <EventGrid ></EventGrid>
      </div>
    </div>
  );
}
