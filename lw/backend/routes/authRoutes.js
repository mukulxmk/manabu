import express from 'express';
const router = express.Router();
import SignUp from '../controller/auth/signup.js';

router.post("/", SignUp);



export default router;