import { google } from "googleapis";
import { oauth2Client } from "../utils/googleClient.js";

// SET REFRESH TOKEN FOR USER (normally from DB)
export const setUserCredentials = (refreshToken) => {
  oauth2Client.setCredentials({ refresh_token: refreshToken });
};

// -------------------------
// CREATE EVENT
// -------------------------
export const createEvent = async (req, res) => {
  try {
    const { summary, description, startDateTime, endDateTime } = req.body;

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const event = {
      summary,
      description,
      start: { dateTime: startDateTime, timeZone: "Asia/Kolkata" },
      end: { dateTime: endDateTime, timeZone: "Asia/Kolkata" },
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -------------------------
// READ EVENTS
// -------------------------
export const getEvents = async (req, res) => {
  try {
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const events = await calendar.events.list({
      calendarId: "primary",
      singleEvents: true,
      orderBy: "startTime",
      timeMin: new Date().toISOString(),
    });
console.log("GET EVEENYSSSSS",events);

    res.json(events.data.items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -------------------------
// UPDATE EVENT
// -------------------------
export const updateEvent = async (req, res) => {
  try {
    const { eventId, summary, description, startDateTime, endDateTime } =
      req.body;

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const response = await calendar.events.patch({
      calendarId: "primary",
      eventId,
      resource: {
        summary,
        description,
        start: { dateTime: startDateTime, timeZone: "Asia/Kolkata" },
        end: { dateTime: endDateTime, timeZone: "Asia/Kolkata" },
      },
    });

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -------------------------
// DELETE EVENT
// -------------------------
export const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    await calendar.events.delete({
      calendarId: "primary",
      eventId,
    });

    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};