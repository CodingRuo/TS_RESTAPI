import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";

export async function createUserSessionHandler(req: Request, res: Response) {

  // Validate the users password
  const user = await validatePassword(req.body)
  if (!user) return res.status(401).send('Invalid email or password')

  // create a session

  // create an access token

  // create an refresh token

  // return access & refresh tokens
}