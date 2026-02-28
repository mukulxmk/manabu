import mongoose from "mongoose";

const googleUserSchema = new mongoose.Schema({
  email: String,
  name: String,
  googleId: String,
  provider: {
    type: String,
    default: "google"
  },
  avatar: String,
  refresh_token_jwt: String
});

const GoogleUser = mongoose.model("GoogleUser", googleUserSchema);

export default GoogleUser;