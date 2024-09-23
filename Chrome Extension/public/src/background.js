const SERVER_PATH = "http://localhost:3000/"
const serverUrl = "http://localhost:3000/"
const COOKIE_NAME = "productivityAppSession123"

let currentVideoId = null

const youtubeRegex = /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([^&]+)/

chrome.runtime.onInstalled.addListener(OnInstalled)

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
     if (tab.url && changeInfo.status === "complete") {
          const match = tab.url.match(youtubeRegex)

          if (match) {
               const videoId = match[1]

               if (videoId && videoId !== currentVideoId) {
                    currentVideoId = videoId
     
                    let isContentScriptInjected =
                         await sendMessageToContentScript(tab.id, {
                              type: "CONTENT_SCRIPT_STATUS"
                         })


                    if (isContentScriptInjected) {
                         if (isContentScriptInjected?.status === "active") {
                              return
                         }
                    }

                    chrome.scripting.executeScript({
                         target: { tabId: tabId },
                         files: ["src/content.js"]
                    })
               }
          }
     }
})

function sendMessageToContentScript(tabId, message) {
     return new Promise((resolve, reject) => {
          chrome.tabs.sendMessage(tabId, message, (response) => {
               if (chrome.runtime.lastError) {
                    resolve(null)
               } else {
                    resolve(response)
               }
          })
     })
}

async function SendInfoToServer(videoId) {
     userSignedIn = await getCookie()
     if (!userSignedIn) {
          return
     }

     const TrySendingRequest = (attemptsLeft = 3) => {
          fetch(serverUrl + videoId, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json"
               },
               body: JSON.stringify({})
          })
               .then((response) => {
                    if (!response.ok) {
                         throw new Error("Server responded with an error")
                    }
                    return response.json()
               })
               .then((data) => {
                    const { pointsEarned } = data
                    CreateNotification(pointsEarned)
               })
               .catch((error) => {
                    console.error("Failed to send video info to server:", error)

                    if (attemptsLeft > 0) {
                         console.log(
                              `Retrying... (${attemptsLeft} attempts left)`
                         )
                         setTimeout(
                              () => TrySendingRequest(attemptsLeft - 1),
                              1000
                         )
                    }
               })
     }

     TrySendingRequest()
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
     if (request.type === "WATCHED_THRESHOLD") {
          SendInfoToServer(request.videoId)
     }
})

async function OnInstalled({ reason }) {
     switch (reason) {
          case "install":
               chrome.storage.sync.set({
                    prevTotalPoints: 0,
                    todayDailyGoalPoints: 0,
                    dailyGoalCurrentDate: new Date().toDateString()
               })
               break
          case "update":
               break
          default:
               break
     }
}

function CreateNotification(pointsEarned) {
     chrome.notifications.clear("points-earned").then((wasCleared) => {
          chrome.notifications.create("points-earned", {
               type: "basic",
               iconUrl: "../assets/icon.png",
               title: "Points Earned!",
               message: `You just scored ${pointsEarned} points! Keep it up!`,
               silent: true,
               priority: 2
          })
     })
}

function getCookie() {
     return new Promise((resolve, reject) => {
          chrome.cookies.get(
               { url: SERVER_PATH, name: COOKIE_NAME },
               function (cookie) {
                    if (chrome.runtime.lastError) {
                         resolve(null)
                    } else {
                         resolve(cookie ? cookie.value : null)
                    }
               }
          )
     })
}
