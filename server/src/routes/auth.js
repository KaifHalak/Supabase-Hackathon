import express from "express";
import passport from "passport";
import { Router } from "express";
import { googleStrategy } from "../utils/authStrategies.js";
passport.use(googleStrategy);

const authRouter = express.Router();

// UI endpoint to intiate google oAuth
authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google call back
authRouter.get("/google/callback", passport.authenticate("google", { failureRedirect: "/auth/login", successRedirect: "/", keepSessionInfo: true }));

authRouter.get("/sign-out", (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next();
		}
          req.session.destroy(function (err) {
               if (err) {
                    console.log("error: ", err)
               }

               return res.clearCookie("productivityAppSession123").redirect("/")
          })
	});
});

export default authRouter;
