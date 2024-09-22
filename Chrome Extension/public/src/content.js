let watchedTime = 0
let thresholdReached = false
let lastUpdateTime = null
const THRESHOLD_PERCENTAGE = 5

const youtubeRegex = /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([^&]+)/

const video = document.querySelector("video")

main()

function updateWatchedTime() {
     const currentTime = video.currentTime

     if (lastUpdateTime !== null) {
          const timeDiff = Math.abs(currentTime - lastUpdateTime)
          watchedTime += timeDiff
     }

     lastUpdateTime = currentTime

     const watchedPercentage = (watchedTime / video.duration) * 100

     console.log(
          `Watched time: ${watchedTime.toFixed(
               2
          )}s, Percentage: ${watchedPercentage.toFixed(2)}%`
     )

     if (watchedPercentage >= THRESHOLD_PERCENTAGE && !thresholdReached) {
          thresholdReached = true
          chrome.runtime.sendMessage({
               type: "WATCHED_THRESHOLD",
               videoId: currentVideoId,
               percentage: Math.round(watchedPercentage)
          })
     }
}

function handleVideoEvents() {
     video.addEventListener("play", () => {
          lastUpdateTime = video.currentTime
     })
     video.addEventListener("pause", () => {
          lastUpdateTime = null
     })
     video.addEventListener("seeking", () => {
          lastUpdateTime = null
     })
     video.addEventListener("timeupdate", updateWatchedTime)
}

function main() {
     currentVideoId = window.location.href.match(youtubeRegex)[1]
     lastUpdateTime = null
     thresholdReached = false
     handleVideoEvents()
}
