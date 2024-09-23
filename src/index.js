// index.js
import app from "../config/serverSettings.js";

import authUser from "./middleware/auth.js";

import authRouter from "./routes/auth.js";
import youtubeRouter from "./routes/youtube.js";
import statsRouter from "./routes/stats.js";

import { leaderboardPage, mainPage, leaderboardData, pageNotFound } from "./controllers/pages.js";

app.get("/", mainPage);
app.get("/leaderboard", leaderboardPage);
app.get("/leaderboard/data", leaderboardData);

app.use("/auth", authRouter);
app.use("/youtube", authUser, youtubeRouter);
app.use("/user", authUser, statsRouter);

app.get("*", pageNotFound)