export default async function authUser(req, res, next) {
	console.log(req.user);
	if (!(req.user && req.isAuthenticated())) {
		return res.status(401).json({});
	}
	return next();
}
