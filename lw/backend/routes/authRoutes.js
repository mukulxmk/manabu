import express from "express";
import  {googleLogin}  from "../controller/auth/loginWithGoogle.js";
import { authGoogleController } from "../controller/auth/authGoogleController.js";
import { googleCallbackController } from "../controller/auth/googleCallback.js";

const router = express.Router();

router.get("/google", authGoogleController);
router.post("/google-login", googleLogin);
router.get("/google/callback", googleCallbackController)

export default router;