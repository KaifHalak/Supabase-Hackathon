let currentVideoId = null

const youtubeRegex = /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([^&]+)/

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
     if (tab.url && changeInfo.status === "complete") {
          const match = tab.url.match(youtubeRegex)

          if (match) {
               const videoId = match[1]

               if (videoId && videoId !== currentVideoId) {
                    currentVideoId = videoId
                    console.log("New YouTube video detected:", videoId)

                    // Comment this out for now for development purposes
                    // SendInfoToServer(videoId);

                    // chrome.scripting.executeScript does not have a callback function. You need to use .then()
                    chrome.scripting
                         .executeScript({
                              target: { tabId: tabId },
                              files: ["content.js"]
                         })
                         .then(() => {
                              chrome.tabs.sendMessage(tabId, {
                                   type: "NEW_VIDEO",
                                   videoId: videoId
                              })
                         })
               }
          }
     }
})

function SendInfoToServer(videoId, watchedPercentage = null) {
     const serverUrl = "https://your-server-url.com/api/video-info"

     const TrySendingRequest = (attemptsLeft = 3) => {
          fetch(serverUrl, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json"
               },
               body: JSON.stringify({
                    videoId: videoId,
                    watchedPercentage: watchedPercentage
               })
          })
               .then((response) => {
                    if (!response.ok) {
                         throw new Error("Server responded with an error")
                    }
                    return response.json()
               })
               .then((data) => {
                    console.log("Server response:", data)
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
          // Comment this out for now for development purposes
          // SendInfoToServer(request.videoId, request.percentage)

          console.log("Threshold Reached: ", request.percentage)
     }
})
