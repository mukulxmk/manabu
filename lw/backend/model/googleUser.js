import mongoose from "mongoose";

const googleUserSchema = new mongoose.Schema({
  email: String,
  name: String,
  googleId: String,
  provider: {
    type: String,
    default: "google"
  },
  avatar: String
});

const GoogleUser = mongoose.model("GoogleUser", googleUserSchema);

export default GoogleUser;