import jwt from "jsonwebtoken";
import GoogleUser from "../../model/googleUser.js";
import { verifyGoogleToken } from "../../utils/googleAuth.js";

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const payload = await verifyGoogleToken(token);

    const { sub, email, name, picture } = payload;

    let user = await GoogleUser.findOne({ googleId: sub });

    if (!user) {
      user = await GoogleUser.create({
        googleId: sub,
        email,
        name
      });
    }

    const appToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: `Successfully LoggedIn with google : ${name}`,
      token: appToken,
      user
    });
  } catch (err) {
    res.status(401).json({ message: "Google authentication failed" });
  }
};