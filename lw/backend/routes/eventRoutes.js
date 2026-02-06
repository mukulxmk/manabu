import express from 'express';
const router = express.Router();
import getEvent from '../controller/eventController/getEvent.js';
import createEvents from '../controller/eventController/createEvents.js';

router.get("/read", getEvent);
router.post("/create", createEvents);


export default router;