import passport from "passport";
import { googleStrategy } from "../utils/authStrategies.js";

passport.use(googleStrategy);

const authRouter = Router();

// UI endpoint to intiate google oAuth
authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google call back
authRouter.get("/google/callback", passport.authenticate("google", { failureRedirect: "/auth/login", successRedirect: "/", keepSessionInfo: true }));

authRouter.get("/sign-out", (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next();
		}
		res.redirect("/");
	});
});

export default authRouter;
