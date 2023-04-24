import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../db';

export const withAuthRequired = (req: Request, res: Response, next: NextFunction) => {
  const {authorization} = req.headers
  if(!authorization) return res.status(401).json("Authorization header missing");
  const token = authorization.split(' ')[1];
  const decodedToken = verifyToken(token)
  if(!decodedToken) return res.status(401).json("Invalid token")
  next()
}