import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY!;
interface ProtectedRequest extends Request {
  user?: any;
}

export const authenticate = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = decoded as JwtPayload & { userId: number; role: string };
    next();
  });
};

export const authorize = (roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (req.user) {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: "Forbidden" });
      }
    }
    next();
  };
};
