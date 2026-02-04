"use client";

import { useEffect, useState } from "react";

type Event = {
  title: string;
  date?: { when?: string };
  venue?: { name?: string };
  address?: string[];
};

const EventGrid = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events");
        if (!res.ok) throw new Error("Failed to fetch events");

        const data = await res.json();
        setEvents(data.events || data.events_results || []);
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {events.map((event, i) => (
        <div key={i} className="border p-4 rounded">
          <h3 className="font-semibold">{event.title}</h3>
          <p>{event.date?.when}</p>
          <p>{event.venue?.name}</p>
          <p className="text-sm text-gray-500">
            {event.address?.join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default EventGrid;
