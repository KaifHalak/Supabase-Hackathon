const filePath = ""

export default function leaderboardPage(req, res, next) {
     // for development only
     return filePath ? res.sendFile(filePath) : res.send("leaderboard page")
}
