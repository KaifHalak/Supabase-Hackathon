import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import env from "./env.js";

// Google
const GOOGLE_CLIENT_ID = env("GOOGLE_CLIENT_ID");
const GOOGLE_CLIENT_SECRET = env("GOOGLE_CLIENT_SECRET");
const GOOGLE_CALLBACK_URL = "/auth/google/callback";

export const googleStrategy = new GoogleStrategy(
	{
		clientID: GOOGLE_CLIENT_ID,
		clientSecret: GOOGLE_CLIENT_SECRET,
		callbackURL: GOOGLE_CALLBACK_URL,
	},
	async (accessToken, refreshToken, profile, done) => {
		console.log(profile);

		let { userId, email, email_verified: emailVerified, name: username, picture: pictureURL } = profile._json;

		let userData = { userId, username, pictureURL };

		done(null, userData);
	}
);
