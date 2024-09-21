// index.js
import app from "../config/serverSettings.js";

import authUser from "./middleware/auth.js";

import authRouter from "./routes/auth.js";
import youtubeRouter from "./routes/youtube.js";
import statsRouter from "./routes/stats.js";

import { leaderboardPage, mainPage, leaderboardData } from "./controllers/pages.js";

app.get("/", mainPage);
app.get("/leaderboard", leaderboardPage);
app.get("/leaderboard/data", leaderboardData);

app.get("/statsTest", (req, res) => {
	res.json({
		dailyGoal: 100,
		points: 80,
		leaderboardPosition: 2,
		currentLevel: 7,
		pointsToAdvance: 200,
	});
	//  console.log(req.user)
	//  if (req.user) {
	//       return res.json({ status: "success" })
	//  } else {
	//       return res.json({})
	//  }
});

app.use("/auth", authRouter);
app.use("/youtube", authUser, youtubeRouter);
app.use("/user", authUser, statsRouter);
