import React ,{useEffect, useState}from "react";
import "../styles/home.css";
import CalendarEmbed from "./CalendarEmbed.jsx";
import EventsList from "./EventList.jsx";
import PopUpForm from "./PopUpForm.jsx";


const HomePage = () => {
  const [editData, setEditData] = useState(null);
  const [reload, setReload] = useState(false);
  const [data, setData] = useState([])
  const [popupOpen, setPopupOpen] = useState(false);

  const loadEvents = async () => {
    const res = fetch("http://localhost:5000/calendar/events")
     .then((res) => console.log("Data fetched success from backend."))
     .catch((err) => console.log(err));
    setData(res.json());
  }

  useEffect(() => {
    loadEvents();
    const fetchAt2Min = setInterval(() => {
      loadEvents();
    }, 120000)

    return () => {
      clearInterval(fetchAt2Min)
    }

  }, []);

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
  
  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">MyApp</h2>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Login</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <h1>Welcome to My App</h1>
        <p>Your one-stop platform for discovering amazing things.</p>
        <button className="cta">Get Started</button>  const [editData, setEditData] = useState(null);

      </header>

      <div>
        <EventsList/>
      </div>
      {/* FRAME FOR API DATA */}
      <section className="api-frame">
        <h2>Data from API</h2>
        <div className="frame-box">
          <CalendarEmbed/>
        </div>
        <div className="crud">
          <p>EVENTS</p>
          <button onClick={() => setPopupOpen(true)}>+ Add Event</button>
          <button>Edit</button>
          <button>Update</button>
          <button>Delete</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 MyApp. All rights reserved.</p>
      </footer>

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
};

export default HomePage;