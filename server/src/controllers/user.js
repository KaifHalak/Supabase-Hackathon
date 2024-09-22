import { supabase } from "../services/supabase.js"
const DAILY_GOAL = 800

export async function getUserStats(req, res) {
     try {
          const { data: userArr, error: uError } = await supabase
               .from("Users")
               .select("*")
               .eq("email", req.user.email)
               .eq("username", req.user.name)

          if (uError) {
               console.error("Error fetching users:", uError)
               throw uError
          }

          const user = userArr[0]

          let { data: leaderboard, error: lError } = await supabase
               .from("Users")
               .select("userId, total_points")
               .order("total_points", { ascending: false })

          if (lError) {
               console.error("Error fetching users:", lError)
               throw lError
          }

          const userRank =
               leaderboard.findIndex((u) => u.userId === user.userId) + 1

          console.log(
               `User with ID ${user.userId} is in position ${userRank + 1}`
          )

          const currentPoints = user.total_points
          const nextLevel = user.level + 1

          const pointsToLevelUp = 100 * Math.pow(1.3, nextLevel)

          const pointsToAdvance = Math.floor(pointsToLevelUp - currentPoints)

          console.log("User Stats Sent")
          console.log({
               dailyGoal: DAILY_GOAL,
               leaderboardPosition: userRank,
               points: currentPoints,
               currentLevel: user.level,
               pointsToAdvance
          })

          return res.status(200).json({
               dailyGoal: DAILY_GOAL,
               leaderboardPosition: userRank,
               points: currentPoints,
               currentLevel: user.level,
               pointsToAdvance
          })
     } catch (err) {
          console.error(err)
          return res.status(500).json({ msg: "Unexpected error occured." })
     }
}

export async function insertUserToDB({ sub, name, picture, email }) {
     const exists = await supabase
          .from("Users")
          .select()
          .eq("email", email)
          .eq("username", name)

     if (exists.data.length > 0) {
          const auth = exists.data[0].auth_token === sub

          if (auth) return true
          else return false
     }

     const insertUser = await supabase
          .from("Users")
          .insert({ username: name, email, picture, auth_token: sub })
          .select()

     if (insertUser.data?.length <= 0) return false

     return true
}
