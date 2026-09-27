import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "weighing-balance-bangalore-super-secret-key-2026";
export const COOKIE_NAME = "admin_session";

export function signAdminToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyAdminToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function getAdminSession(request) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}
