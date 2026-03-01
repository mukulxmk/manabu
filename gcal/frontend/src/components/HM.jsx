import React, { useEffect, useState } from "react";
import PopUpForm from "./PopUpForm.jsx";
import CalendarEmbed from "./CalendarEmbed.jsx";

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // -------------------------
  // Fetch all events
  // -------------------------
  const loadEvents = async () => {
    const res = await fetch("http://localhost:5000/calendar/events");
    const data = await res.json();
    setEvents(data);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // -------------------------
  // Create or Update Event
  // -------------------------
  const handleSubmit = async (payload) => {
    if (payload.eventId) {
      // UPDATE route
      await fetch("http://localhost:5000/calendar/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      // CREATE route
      await fetch("http://localhost:5000/calendar/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    setPopupOpen(false);
    setEditData(null);
    loadEvents();
  };

  // -------------------------
  // Delete Event
  // -------------------------
  const deleteEvent = async (eventId) => {
    await fetch(`http://localhost:5000/calendar/delete/${eventId}`, {
      method: "DELETE",
    });

    loadEvents();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Google Calendar</h1>

      {/* Buttons */}
      <button onClick={() => setPopupOpen(true)}>+ Add Event</button>

      {/* Events List */}
      <div style={{ marginTop: "20px" }}>
        <h2>Upcoming Events</h2>
        {events.map((e) => (
          <div key={e.id} style={{ marginBottom: "10px" }}>
            <strong>{e.summary}</strong>

            <button
              style={{ marginLeft: "10px" }}
              onClick={() => {
                setEditData(e);
                setPopupOpen(true);
              }}
            >
              Update
            </button>

            <button
              style={{ marginLeft: "10px", color: "red" }}
              onClick={() => deleteEvent(e.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Embedded Google Calendar */}
      <div style={{ marginTop: "30px" }}>
        <CalendarEmbed />
      </div>

      {/* Popup form */}
      {popupOpen && (
        <PopUpForm
          onClose={() => {
            setPopupOpen(false);
            setEditData(null);
          }}
          onSubmit={handleSubmit}
          editData={editData}
        />
      )}
    </div>
  );
}