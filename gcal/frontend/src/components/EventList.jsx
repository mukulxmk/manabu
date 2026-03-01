// import axios from "axios";
import { useEffect, useState } from "react";

export default function EventsList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/calendar/events")
     .then(res => {
      setEvents(res.data)
      console.log(res);
      
    })
    .catch((err) => console.log(err))
  }, []);

  return (
    <div>
        {
            events ? 
            <p>Loading...</p> :
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
                // {   events.map(e => (
                //     <div key={e.id}>{e.summary}</div>
                // ))
                // }
        }
    </div>
  );
}