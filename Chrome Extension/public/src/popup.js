const SERVER_PATH = "http://localhost:3000"
const LEADERBOARD_PAGE = SERVER_PATH + "/leaderboard"
const GOOGLE_AUTH = SERVER_PATH + "/auth/google"
const SIGN_OUT = SERVER_PATH + "/auth/sign-out"
// const USER_STATS = SERVER_PATH + "/api/user/stats"
const USER_STATS = SERVER_PATH + "/statsTest"

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
     const { points, leaderboardPosition } = userStats

     document.querySelector("#totalPointsValue").textContent = points
     document.querySelector("#leaderboardPosition").textContent =
          leaderboardPosition

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
