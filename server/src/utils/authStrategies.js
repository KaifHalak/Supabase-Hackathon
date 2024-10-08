import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { insertUserToDB } from "../controllers/user.js"

import env from "./env.js"

// Google
const GOOGLE_CLIENT_ID = env("GOOGLE_CLIENT_ID")
const GOOGLE_CLIENT_SECRET = env("GOOGLE_CLIENT_SECRET")
const GOOGLE_CALLBACK_URL = "/auth/google/callback"

export const googleStrategy = new GoogleStrategy(
     {
          clientID: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
          callbackURL: GOOGLE_CALLBACK_URL
     },
     async (accessToken, refreshToken, profile, done) => {
          let { sub, name, picture, email } = profile._json

          let userData = { sub, name, picture, email }

          const userId = await insertUserToDB(userData)

          if (userId) {
               userData["userId"] = userId
               return done(null, userData)
          }

          return done(null, undefined)
     }
)
