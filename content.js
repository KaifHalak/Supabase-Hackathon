let watchedTime = 0;
let thresholdReached = false;
let lastUpdateTime = null;
const THRESHOLD_PERCENTAGE = 33;
const UPDATE_INTERVAL = 1000; // Send update every 1 second

function updateWatchedTime() {
  const video = document.querySelector("video");
  if (video && video.duration) {
    const currentTime = video.currentTime;

    // here is the fix
    if (lastUpdateTime !== null) {
      const timeDiff = currentTime - lastUpdateTime;
      if (timeDiff > 0 && timeDiff < 1) {
        watchedTime += timeDiff;
      }
    }

    lastUpdateTime = currentTime;

    const watchedPercentage = (watchedTime / video.duration) * 100;

    console.log(
      `Watched time: ${watchedTime.toFixed(
        2
      )}s, Percentage: ${watchedPercentage.toFixed(2)}%`
    );

    chrome.runtime.sendMessage({
      type: "WATCH_UPDATE",
      videoId: currentVideoId,
      watchedTime: watchedTime,
      percentage: watchedPercentage,
    });

    if (watchedPercentage >= THRESHOLD_PERCENTAGE && !thresholdReached) {
      thresholdReached = true;
      chrome.runtime.sendMessage({
        type: "WATCHED_THRESHOLD",
        videoId: currentVideoId,
        percentage: Math.round(watchedPercentage),
      });
    }
  }
}

function handleVideoEvents() {
  const video = document.querySelector("video");
  if (video) {
    video.addEventListener("play", () => {
      lastUpdateTime = video.currentTime;
    });
    video.addEventListener("pause", () => {
      lastUpdateTime = null;
    });
    video.addEventListener("seeking", () => {
      lastUpdateTime = null;
    });
    video.addEventListener("timeupdate", updateWatchedTime);
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "NEW_VIDEO") {
    currentVideoId = request.videoId;
    watchedTime = 0;
    lastUpdateTime = null;
    thresholdReached = false;
    handleVideoEvents();
  }
});
