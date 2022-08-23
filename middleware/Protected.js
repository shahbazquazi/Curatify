import jwt from "jsonwebtoken";
import Blogger from "../models/bloggerModel";

export default function Protected(handler) {
  return async (req, res) => {
    try {
      const { Token } = req.cookies;

      if (!Token) {
        return res.status(401).json({ error: "Please login to get access" });
      }

      // if we have token then
      const verifyToken = jwt.verify(Token, process.env.JWT_SECRET);

      const currentUser = await Blogger.findById(verifyToken.id);

      if (!currentUser) {
        return res.status(401).json({ error: "Token is invalid" });
      }

      req.user = currentUser;

      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: "Please login to get access" });
    }
  };
}
