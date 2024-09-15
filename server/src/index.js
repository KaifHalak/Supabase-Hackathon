// index.js
import app from "../config/serverSettings.js";

import authUser from "./middleware/auth.js";

import authRouter from "./routes/auth.js";
import youtubeRouter from "./routes/youtube.js";

app.get("/", (req, res, next) => {
	res.send("Hello World");
});

app.use("/auth", authRouter);
app.use("/api/youtube", authUser, youtubeRouter);
