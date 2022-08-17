import { serialize } from "cookie";

export default async function sendToken(blogger, statusCode, res) {
  const token = blogger.getJWTToken();

  const serialized = serialize("Token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "DEVELOPMENT",
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    path: "/"
  });

  res.setHeader("Set-Cookie", serialized);
  res.status(statusCode).json({
    success: true,
    blogger,
    token,
  });
}
