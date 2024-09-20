document.addEventListener("DOMContentLoaded", () => {
    const loginScreen = document.getElementById("loginScreen");
    const statsScreen = document.getElementById("statsScreen");
    const loginButton = document.getElementById("loginButton");
    const signOutButton = document.getElementById("signOutButton");
    const leaderBoardButton = document.getElementById("leaderBoardButton");
  
    if (loginScreen && statsScreen) {
      loginScreen.style.display = "flex";
      statsScreen.style.display = "none";
    }
  
    if (loginButton) {
      loginButton.addEventListener("click", () => {
        if (loginScreen && statsScreen) {
          loginScreen.style.display = "none";
          statsScreen.style.display = "block";
        }
      });
    }
  
    if (signOutButton) {
      signOutButton.addEventListener("click", () => {
        // Handle sign out logic here
        if (loginScreen && statsScreen) {
          statsScreen.style.display = "none";
          loginScreen.style.display = "flex";
        }
      });
    }
  
    if (leaderBoardButton) {
      leaderBoardButton.addEventListener("click", () => {
        chrome.tabs.create({ url: "LeaderBoard.html" });
      });
    }
  });