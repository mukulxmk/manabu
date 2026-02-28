import jwt from "jsonwebtoken"
import GoogleUser  from "../../model/googleUser.js";

export const signUpWithGoogle = async (googleUser, res) => {

  // CHECK IF USER ALREADY EXISTS IN DB
  let user = await GoogleUser.findOne({ googleId: googleUser.id });
  if(user) return res.redirect(); 

  user = GoogleUser.create();

  user.googleId = googleUser.id;
  user.name = googleUser.name;
  user.email = googleUser.email;
  user.avatar = googleUser.avatar;

  // Create JWT token
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  user.refresh_token_jwt = token.userId;

  await user.save();

  // REDIRECT TO FRONTEND WITH TOKEN
  res.redirect(
    `http://localhost:3000/auth/success?token=${token}`
  );
};