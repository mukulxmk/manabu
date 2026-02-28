import React from "react";
import "../styles/home.css";

const HomePage = () => {
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
        <button className="cta">Get Started</button>
      </header>

      {/* FRAME FOR API DATA */}
      <section className="api-frame">
        <h2>Data from API</h2>
        <div className="frame-box">
          <p>Waiting for API response...</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 MyApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;