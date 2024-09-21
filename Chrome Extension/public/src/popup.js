const SERVER_PATH = "http://localhost:3000"
const LEADERBOARD_PAGE = SERVER_PATH + "/leaderboard"
const GOOGLE_AUTH = SERVER_PATH + "/auth/google"
const SIGN_OUT = SERVER_PATH + "/auth/sign-out"
const USER_STATS = SERVER_PATH + "/user/stats"
// const USER_STATS = SERVER_PATH + "/statsTest"

const COOKIE_NAME = "productivityAppSession123"

let userSignedIn

function getCookie() {
     return new Promise((resolve, reject) => {
          chrome.cookies.get(
               { url: SERVER_PATH, name: COOKIE_NAME },
               function (cookie) {
                    if (chrome.runtime.lastError) {
                         reject(chrome.runtime.lastError)
                    } else {
                         resolve(cookie ? cookie.value : null)
                    }
               }
          )
     })
}

async function PopulateUserValues() {
     let response = await fetch(USER_STATS)
     const userStats = await response.json()

     if (Object.keys(userStats).length === 0) {
          return false
     }

     // Populate the values
     const {
          dailyGoal,
          points,
          leaderboardPosition,
          currentLevel,
          pointsToAdvance
     } = userStats

     let { prevTotalPoints, todayDailyGoalPoints, dailyGoalCurrentDate } =
          await chrome.storage.sync.get(null)

     // Reset Daily goal everyday

     const storedDate = new Date(dailyGoalCurrentDate)
     const today = new Date()

     storedDate.setHours(0, 0, 0, 0)
     today.setHours(0, 0, 0, 0)

     if (today > storedDate) {
          todayDailyGoalPoints = 0
          dailyGoalCurrentDate = today
          console.log("reset daily points")
     }

     let newPointsEarned = 0

     if (prevTotalPoints !== 0) {
          newPointsEarned = points - prevTotalPoints
     }

     todayDailyGoalPoints += newPointsEarned

     chrome.storage.sync.set({
          prevTotalPoints: points,
          todayDailyGoalPoints,
          dailyGoalCurrentDate
     })

     document.querySelector(
          "#dailyGoalValue"
     ).textContent = `Daily Goal: ${dailyGoal} Points`

     document.querySelector("#totalPointsValue").textContent = points

     document.querySelector("#newPointsEarnedValue").textContent =
          "+" + newPointsEarned

     document.querySelector("#leaderboardPosition").textContent =
          leaderboardPosition

     // Daily Goal progress

     let dailyProgress = Math.round((todayDailyGoalPoints / dailyGoal) * 100)
     if (dailyProgress > 100) {
          dailyProgress = 100
     }

     document.querySelector("#dailyGoalProgressBar").style.width =
          dailyProgress + "%"
     document.querySelector("#dailyGoalProgressValue").textContent =
          dailyProgress + "%"

     // Level progress

     let levelProgress = Math.round((points / (pointsToAdvance + points)) * 100)
     document.querySelector("#currentLevelValue").textContent =
          "Level " + currentLevel
     document.querySelector("#currentLevelProgressBar").style.width =
          levelProgress + "%"
     document.querySelector("#currentLevelProgressValue").textContent =
          levelProgress + "%"

     return true
}

document.addEventListener("DOMContentLoaded", async () => {
     userSignedIn = await getCookie()

     const loginScreen = document.getElementById("loginScreen")
     const statsScreen = document.getElementById("statsScreen")
     const loginButton = document.getElementById("loginButton")
     const signOutButton = document.getElementById("signOutButton")
     const leaderBoardButton = document.getElementById("leaderBoardButton")

     if (!userSignedIn) {
          loginScreen.style.display = "flex"
          statsScreen.style.display = "none"
     } else {
          let flag = await PopulateUserValues()
          if (!flag) {
               userSignedIn = null
               loginScreen.style.display = "flex"
               statsScreen.style.display = "none"
          } else {
               loginScreen.style.display = "none"
               statsScreen.style.display = "block"
          }
     }

     loginButton.addEventListener("click", () => {
          chrome.tabs.create({
               url: GOOGLE_AUTH
          })
     })

     signOutButton.addEventListener("click", () => {
          statsScreen.style.display = "none"
          loginScreen.style.display = "flex"

          chrome.tabs.create({
               url: SIGN_OUT
          })
     })

     leaderBoardButton.addEventListener("click", () => {
          chrome.tabs.create({ url: LEADERBOARD_PAGE })
     })
})
