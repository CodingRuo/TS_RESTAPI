import { Request, Response } from "express";
import { createSession, findSessions, updateSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.util";
import config from 'config'

export async function createUserSessionHandler(req: Request, res: Response) {

  // Validate the users password
  const user = await validatePassword(req.body)
  if (!user) return res.status(401).send('Invalid email or password')

  // create a session
  const session = await createSession(user._id, req.get("user-agent") || "")

  // create an access token
  const accessToken = signJwt({
    ...user, session: session._id,
  }, {
    expiresIn: config.get('accessTokenTtl')
  })

  // create an refresh token
  const refreshToken = signJwt({
    ...user, session: session._id,
  }, {
    expiresIn: config.get('refreshTokenTtl')
  })

  // return access & refresh tokens
  return res.send({ accessToken, refreshToken })
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id

  const sessions = await findSessions({ user: userId, valid: true })

  res.send(sessions)
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionID = res.locals.user.session

  await updateSession({ _id: sessionID }, { valid: false })

  return res.send({
    accessToken: null,
    refreshToken: null
  })
}