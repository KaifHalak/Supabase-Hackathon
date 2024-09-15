document.getElementById('signOutButton').addEventListener('click', () => {
    
    window.location.href = chrome.runtime.getURL('After-Log-Out.html');
});


document.getElementById('leaderBoardButton').addEventListener('click', () => {
    
    window.location.href = chrome.runtime.getURL('LeaderBoard.html');
});
