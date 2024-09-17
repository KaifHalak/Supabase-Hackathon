let CurrentVideoId = null
let WatchedPercentage = 0
let ThresholdReached = false
const THRESHOLD = 33

function updateWatchedPercentage() {
     const video = document.querySelector("video")
     if (video && video.duration) {
          WatchedPercentage = (video.currentTime / video.duration) * 100

          console.log(WatchedPercentage)

          if (WatchedPercentage >= THRESHOLD && !ThresholdReached) {
               ThresholdReached = true
               chrome.runtime.sendMessage({
                    type: "WATCHED_THRESHOLD",
                    VideoId: CurrentVideoId,
                    percentage: Math.round(WatchedPercentage)
               })
          }
     }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
     if (request.type === "NEW_VIDEO") {
          CurrentVideoId = request.VideoId
          WatchedPercentage = 0
          ThresholdReached = false

          const video = document.querySelector("video")
          if (video) {
               video.addEventListener("timeupdate", updateWatchedPercentage)
          }
     }
})
