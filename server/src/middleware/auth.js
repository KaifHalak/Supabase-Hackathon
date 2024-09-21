export default async function authUser(req, res, next) {
	if (!(req.user && req.isAuthenticated())) {
		return res.status(401).json({});
	}
	return next();
}
