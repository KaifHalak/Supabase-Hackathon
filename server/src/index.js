// index.js
import app from "../config/serverSettings.js";

import authRouter from "./routes/auth.js";

import youtubeRouter from "./routes/youtube.js";

import leaderboardPage from "./controllers/leaderboardPage.js"

app.get("/", (req, res, next) => {
	res.send("Hello World");
});

app.use("/auth", authRouter);
app.use("/api/youtube", youtubeRouter);

app.get("/leaderboard", leaderboardPage)
