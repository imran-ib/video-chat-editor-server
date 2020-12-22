import { verify } from 'jsonwebtoken'
import { Context } from './types'
import { Response } from 'express'

export const APP_SECRET = process.env.APP_SECRET

interface Token {
  userId: string
}

export function getUserId(context: Context) {
  const Authorization = context.req.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const verifiedToken = verify(token, APP_SECRET) as Token
    return verifiedToken && verifiedToken.userId
  }
}

// 🔻 https://alligator.io/nodejs/express-cookies/

// sentTokenCookie creates a cookie which expires after one day
export const sendUserIdCookie = (token: string, res: Response) => {
  // Our token expires after one day
  const oneDayToSeconds = 1000 * 24 * 60 * 60
  res.cookie('token', token, {
    maxAge: oneDayToSeconds,
    sameSite: true,
    path: '/',
    // You can't access these tokens in the client's javascript
    httpOnly: true,
    // Forces to use https in production
    secure: process.env.NODE_ENV === 'production' ? true : false,
  })
}
