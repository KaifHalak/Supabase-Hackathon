import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
// import helmet from "helmet";
import passport from "passport";
import expressSession from "express-session";

import env from "../src/utils/env.js";

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

const PAGES_PATH = path.join(__dirname, "../../", "public")

const app = express();
const server = http.createServer(app);

app.use(
	expressSession({
		cookie: {
			maxAge: 24 * 60 * 60 * 1000,
			sameSite: false,
		},
		secret: [env("SESSION_SECRET")],
		name: "speedTyperSession",
		resave: true,
		saveUninitialized: false,
		store: new expressSession.MemoryStore(),
	})
);

app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use(function (request, response, next) {
	if (request.session && !request.session.regenerate) {
		request.session.regenerate = (cb) => {
			cb();
		};
	}
	if (request.session && !request.session.save) {
		request.session.save = (cb) => {
			cb();
		};
	}
	next();
});

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static(PAGES_PATH))
// app.use(helmet())

let PORT = env("SERVER_PORT") || 3000;

server.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});

export default app;
