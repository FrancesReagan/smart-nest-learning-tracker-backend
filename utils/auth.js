// JWT authentication functions//
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
// making it expire in 3 weeks time for ease of Live Demo, etc will change back to 24h//
const expiration ="504h";

export function authMiddleware(req, res, next) {
  let token = req.body?.token || req.query?.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }








  
}
