import { fileURLToPath } from "url"
import path, { dirname } from "path"
const __dirname = dirname(fileURLToPath(import.meta.url))

const PAGES_PATH = path.join(__dirname, "../../../", "public")

export function leaderboardPage(req, res, next) {
     res.sendFile(path.join(PAGES_PATH, "leaderboard.html"))
}

export function mainPage(req, res, next) {
     res.sendFile(path.join(PAGES_PATH, "main.html"))
}
