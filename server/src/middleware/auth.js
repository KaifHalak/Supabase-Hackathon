export default async function authUser(req, res, next) {
     req.user = {
          sub: "108224617154390927768",
          name: "Muhammad Usman",
          picture: "https://lh3.googleusercontent.com/a/ACg8ocKjoW4g_U0B0F7XSVuB-PER5GCDxsMLMmcN8JaGPeM97NOM3fh3=s96-c",
          email: "usman12k2@gmail.com"
     }

     // req.user = {
     //      sub: "105564880413100801039",
     //      name: "Muhammad Usman",
     //      picture: "https://lh3.googleusercontent.com/a/ACg8ocICY7u78hYZ_p42Yjzrj8VkeIZWVE577onI3FRvezd-dLuQ3Q=s96-c",
     //      email: "m.usmanvv@gmail.com"
     // }

     // if (!(req.user && req.isAuthenticated())) {
     //      return res.status(401).json({})
     // }
     return next()
}
