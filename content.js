let currentVideoId = null;
let watchedTime = 0;
let thresholdReached = false;
let lastUpdateTime = 0;
const THRESHOLD_PERCENTAGE = 33;
const UPDATE_INTERVAL = 1000; // Send update every 1 second

function updateWatchedTime() {
    const video = document.querySelector('video');
    if (video && video.duration) {
        const currentTime = video.currentTime;
        
        
        if (currentTime > lastUpdateTime) {
            watchedTime += currentTime - lastUpdateTime;
        } else if (currentTime < lastUpdateTime) {
            
            watchedTime = Math.max(0, watchedTime - (lastUpdateTime - currentTime));
        }
        
        lastUpdateTime = currentTime;
        const watchedPercentage = (watchedTime / video.duration) * 100;
        
        console.log(`Watched time: ${watchedTime.toFixed(2)}s, Percentage: ${watchedPercentage.toFixed(2)}%`);
        

        chrome.runtime.sendMessage({
            type: 'WATCH_UPDATE',
            videoId: currentVideoId,
            watchedTime: watchedTime,
            percentage: watchedPercentage
        });
        
        
        if (watchedPercentage >= THRESHOLD_PERCENTAGE && !thresholdReached) {
            thresholdReached = true;
            chrome.runtime.sendMessage({
                type: 'WATCHED_THRESHOLD',
                videoId: currentVideoId,
                percentage: Math.round(watchedPercentage)
            });
        }
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'NEW_VIDEO') {
        currentVideoId = request.videoId;
        watchedTime = 0;
        lastUpdateTime = 0;
        thresholdReached = false;
        const video = document.querySelector('video');
        if (video) {
            video.removeEventListener('timeupdate', updateWatchedTime); 
            video.addEventListener('timeupdate', updateWatchedTime);
        }
    }
});