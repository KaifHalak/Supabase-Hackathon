import { supabase } from "../services/supabase.js"

import { fileURLToPath } from "url"
import path, { dirname } from "path"
const __dirname = dirname(fileURLToPath(import.meta.url))

const PAGES_PATH = path.join(__dirname, "../../../", "public")

export function leaderboardPage(req, res, next) {
     res.sendFile(path.join(PAGES_PATH, "leaderboard.html"))
}

export async function leaderboardData(req, res, next) {
     const { data: userArr, error: uError } = await supabase
          .from("Users")
          .select("username, total_points, level")
          .order("total_points", { ascending: false });

     return res.json(userArr)
}

export function mainPage(req, res, next) {
     console.log(req.user)
     res.sendFile(path.join(PAGES_PATH, "main.html"))
}
