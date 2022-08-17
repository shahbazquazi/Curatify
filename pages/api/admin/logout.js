import { serialize } from "cookie";
import Protected from "../../../middleware/Protected";

const logout = async (req, res) => {
  const { Token } = req.cookies;
  const { method } = req;

  try {
    if (method !== "GET") {
      return res.status(400).json({ error: "Only GET requests are allowed." });
    }
    if (!Token) {
      res.status(401).json({
        error: "Already Loggedout",
      });
    } else {
      const serialized = serialize("Token", null, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "DEVELOPMENT",
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
        path: "/",
      });
      res.setHeader("Set-Cookie", serialized);
      res.status(201).json({
        message: "Logged Out Successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default Protected(logout);
