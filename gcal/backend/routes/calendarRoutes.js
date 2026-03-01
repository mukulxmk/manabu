import express from "express";
import {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} from "../controller/calendarController.js";

const router = express.Router();

// CRUD API
router.get("/events", getEvents);
router.post("/create", createEvent);
router.patch("/update", updateEvent);
router.delete("/delete/:eventId", deleteEvent);

export default router;