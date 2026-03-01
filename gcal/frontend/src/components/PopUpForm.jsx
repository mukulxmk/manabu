import React, { useState, useEffect } from "react";
import "../styles/popup.css";

export default function PopUpForm({ onClose, onSubmit, editData }) {
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

  // If editing → pre-fill data
  useEffect(() => {
    if (editData) {
      setSummary(editData.summary);
      setDescription(editData.description);
      setStartDateTime(editData.start?.dateTime);
      setEndDateTime(editData.end?.dateTime);
    }
  }, [editData]);

  const handleSubmit =async () => {
    const payload = {
      summary,
      description,
      startDateTime,
      endDateTime,
      eventId: editData?.id, // only for update
    };

    onSubmit(payload);
      await fetch("http://localhost:5000/calendar/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  }
  

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <h2>{editData ? "Update Event" : "Create Event"}</h2>

        <input
          type="text"
          placeholder="Title"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Start Date & Time</label>
        <input
          type="datetime-local"
          value={startDateTime}
          onChange={(e) => setStartDateTime(e.target.value)}
        />

        <label>End Date & Time</label>
        <input
          type="datetime-local"
          value={endDateTime}
          onChange={(e) => setEndDateTime(e.target.value)}
        />

        <div className="btn-row">
          <button className="btn cancel" onClick={onClose}>Cancel</button>
          <button className="btn save" onClick={handleSubmit}>
            {editData ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}