import express from "express";
import { getToken, verifyToken } from "../db";

export const authRouter = express.Router();

authRouter.post("/token", (req, res) => {
  // Logic to create a new todo
  const {username, password} = req.body
  if(!username || !password) return res.status(400).json("Missing username or password")
  
  const token = getToken(username, password)
  if(!token) return res.status(401).json("Invalid username or password")

  res.setHeader("Set-Cookie", [`accessToken=${token}; httponly; Max-Age=${60000 * 15};`])
  res.status(200).json({token: token});
});