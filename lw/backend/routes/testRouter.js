import express from 'express';
const router = express.Router();
import TestController from '../controller/TEST/test.js';

router.get("/", TestController);

export default router;