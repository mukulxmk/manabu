import GoogleUser from "../../model/googleUser.js";

export const authGoogleController = (req, res) => {

  try {
    const googleAuthUrl =
    "https://accounts.google.com/o/oauth2/v2/auth" +
    "?response_type=code" +
    "&client_id=" + process.env.GOOGLE_CLIENT_ID +
    "&redirect_uri=" + encodeURIComponent(
      "http://localhost:5000/auth/google/callback"
    ) +
    "&scope=" + encodeURIComponent("openid email profile");



  res.redirect(googleAuthUrl);
  } catch (error) {
    
  }

};