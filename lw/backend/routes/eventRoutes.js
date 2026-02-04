import express from 'express';
const router = express.Router();
import getEvent from '../controller/eventController/getEvent.js';

router.get("/", getEvent);

export default router;