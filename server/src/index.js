// index.js
import app from "../config/serverSettings.js";

import authUser from "./middleware/auth.js";

import authRouter from "./routes/auth.js";
import youtubeRouter from "./routes/youtube.js";
import statsRouter from "./routes/stats.js";

import leaderboardPage from "./controllers/leaderboardPage.js"

app.get("/", (req, res, next) => {
	res.send("Hello World");
});

app.use("/api/auth", authRouter);
app.use("/api", /* authUser,*/ youtubeRouter);
app.use("/api", /* authUser,*/ statsRouter);
app.get("/api/leaderboard", leaderboardPage)
