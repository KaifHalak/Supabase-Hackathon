const SERVER_PATH = "http://localhost:3000"
const LEADERBOARD_PAGE = SERVER_PATH + "/leaderboard"
const GOOGLE_AUTH = SERVER_PATH + "/auth/google"

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
          loginScreen.style.display = "none"
          statsScreen.style.display = "block"
     }

     loginButton.addEventListener("click", () => {
          chrome.tabs.create({
               url: GOOGLE_AUTH
          })
     })

     signOutButton.addEventListener("click", () => {
          statsScreen.style.display = "none"
          loginScreen.style.display = "flex"
     })

     leaderBoardButton.addEventListener("click", () => {
          chrome.tabs.create({ url: LEADERBOARD_PAGE })
     })
})
