import { NextResponse } from "next/server";

export async function GET() {
  const params = new URLSearchParams({
    engine: "google_events",
    q: "Events in Sydney",
    hl: "en",
    gl: "au",
    api_key: process.env.SERP_API_KEY!,
  });

  const res = await fetch(
    `https://serpapi.com/search.json?${params.toString()}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  console.log(data);
  
  return NextResponse.json({
    events: data.events_results || [],
  });
}
