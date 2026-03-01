import express from "express";
import dotenv from "dotenv";
import calendarRoutes from "./routes/calendarRoutes.js";
import { oauth2Client, SCOPES } from "./utils/googleClient.js";
import connectDB from "./utils/connectDB.js";

dotenv.config();
const app = express();
app.use(express.json());

connectDB();

// STEP 1 - generate google login URL
app.get("/auth/google/url", (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: SCOPES,
  });

  res.json({ url });
});

// STEP 2 - google callback
app.get("/auth/google/callback", async (req, res) => {
  try {
    const code = req.query.code;

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // ❗ save tokens.refresh_token in DB for the logged user
    res.json({ message: "Google connected", tokens });
  } catch (err) {
    res.status(500).json({ error: "OAuth failed" });
  }
});

// CRUD calendar routes
app.use("/calendar", calendarRoutes);

app.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);