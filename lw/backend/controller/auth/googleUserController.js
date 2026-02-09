import jwt from "jsonwebtoken"
import GoogleUser  from "../../model/googleUser.js";

export const handleGoogleUserController = async (googleUser, res) => {
  // STEP 1: Find user
  let user = await GoogleUser.findOne({ googleId: googleUser.id });

  // STEP 2: Create user if not found
  if (!user) {
    user = await GoogleUser.create({
      googleId: googleUser.id,
      email: googleUser.email,
      name: googleUser.name,
      avatar: googleUser.picture,
    });
  }

  // STEP 3: Create JWT for YOUR app
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  // STEP 4: Redirect to frontend with token
  res.redirect(
    `http://localhost:3000/auth/success?token=${token}`
  );
};