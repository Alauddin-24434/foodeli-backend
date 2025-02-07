import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload; // or whatever type you're using for user data
    }
  }
}
