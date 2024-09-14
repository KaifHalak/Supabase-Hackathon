const loginScreen = document.getElementById('loginScreen');
const statsScreen = document.getElementById('statsScreen');
const afterLogoutScreen = document.getElementById('After-Log-Out');
const loginButton = document.getElementById('loginButton');
const logoutButton = document.getElementById('logoutButton');
const leaderboardButton = document.getElementById('leaderboardButton');

// Show login screen initially
loginScreen.style.display = 'flex';
statsScreen.style.display = 'none';
afterLogoutScreen.style.display = 'none'; // Initially hide the After-Log-Out section

// Simulate login event
loginButton.addEventListener('click', () => {
  loginScreen.style.display = 'none';
  statsScreen.style.display = 'block';
});

// Simulate logout event
logoutButton.addEventListener('click', () => {
  statsScreen.style.display = 'none';
  afterLogoutScreen.style.display = 'block'; // Show the After-Log-Out section
});

// Redirect to external leaderboard
leaderboardButton.addEventListener('click', () => {
  window.location.href = 'https://your-leaderboard-site.com';
});
