document.getElementById('signOutButton').addEventListener('click', () => {
    window.open(chrome.runtime.getURL('After-Log-Out.html'));
});

document.getElementById('leaderBoardButton').addEventListener('click', () => {
    window.open(chrome.runtime.getURL('LeaderBoard.html'));
});
