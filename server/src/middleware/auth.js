export default async function authUser(req, res, next) {
	if (!(req.user && req.isAuthenticated())) {
		return res.redirect("/");
	}
	return next();
}
