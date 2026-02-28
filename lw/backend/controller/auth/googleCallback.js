import { handleGoogleUserController } from "./signUpWIthGoogle.js";

export const googleCallbackController = async (req, res) => {
  const code = req.query.code;
console.log("CODE================================",code);

  if (!code) {
    return res.status(400).json({ message: "Missing authorization code" });
  }

  try {
    // STEP 1: Exchange code for access token
    const tokenResponse = await fetch(
      "https://oauth2.googleapis.com/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          code,
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: "http://localhost:5000/auth/google/callback",
          grant_type: "authorization_code",
        }),
      }
    );

    const tokenData = await tokenResponse.json();
console.log("TOKEN[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[",tokenData);

    const accessToken = tokenData.access_token;
    console.log("++++++++++++++++++++++++", accessToken);
    

    // STEP 2: Use access token to fetch user info
    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const googleUser = await userResponse.json();
    console.log("Google user-------------------------------------------------------------------",googleUser);

    await handleGoogleUserController(googleUser, res);

    console.log(googleUser);

    // We STOP here for now
    res.json({ googleUser: googleUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Google authentication failed" });
  }
};