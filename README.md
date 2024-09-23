# Productivity Grounds - YouTube Productivity Extension

## Overview

**Productivity Grounds** is a Chrome extension that gamifies YouTube usage by distinguishing between productive (educational) and unproductive (entertainment) videos. Using the **Llama 3.1 AI model** via the **Groq API**, this extension helps users stay on track by notifying them when they are watching productive content. It also introduces **global leaderboards**, levels, and daily goals to motivate users to consume more educational content.

### Key Features:

- **AI-Powered Video Analysis**: Automatically determines whether a YouTube video is productive using AI.
- **Gamified Productivity**: Earn points for watching educational content, track your progress, and compete on a global leaderboard.
- **Notifications**: Get notified when you're watching productive content to stay on track.
- **Leaderboard & Levels**: Monitor your points, levels, and ranking globally while hitting preset daily goals.

## Contributors

- **Usman**
- **Awab**
- **Radowan**
- **Hasan**

## Installation Guide

### Prerequisites:

- **Google Chrome**: Since this is a Chrome extension, ensure you have Google Chrome installed.

### Step 1: Download the Source Code

1. Clone the repository from GitHub:
   ```bash
   git clone https://github.com/KaifHalak/Supabase-Hackathon.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Supabase-Hackathon
   ```

### Step 2: Load the Extension into Chrome

1. Navigate to `chrome://extensions/` in your Chrome browser.
2. Enable **Developer Mode** (toggle in the top right corner).
3. Click on **Load unpacked** and select the `public` folder located inside the `Chrome Extension` folder:
   ```
   Supabase-Hackathon/Chrome Extension/public
   ```
4. The extension will now be loaded into Chrome.

### Step 3: Start Using the Extension

1. Click on the **Productivity Grounds** extension icon in the Chrome toolbar.
2. **Sign in with Google** to begin.
3. You're now set! The extension will start analyzing YouTube videos as you browse.

## Usage Instructions

### Automatic Video Analysis

- Open any YouTube video in a new tab. The extension will automatically analyze the video transcript and, if it determines the video is productive, you'll receive a notification informing you of your productive behavior.

### Checking Your Progress

- Click on the **Productivity Grounds** icon to view:
  - **Total Points**: This shows the total points you have accumulated so far.
  - **Most Recent Points**: This shows the total points you've gained since the last time you viewed the popup.
  - **Leaderboard Position**: Your current ranking on the global leaderboard.
  - **Daily Goal**: The daily goal you need to hit to level up.
  - **Current Level**: Your current level based on the points you have accumulated.

### Leaderboard

- Click the **Leaderboard** button in the popup to view the global rankings of all users. This adds a competitive edge to your productivity journey.

## Maximizing Productivity:

- **Hit Daily Goals**: The system gives you daily goals. Stay focused and hit these goals to level up.
- **Track Your Progress**: Regularly check the popup to see how many points you've earned since your last check.
- **Compete Globally**: View the leaderboard to see where you stand globally and push yourself to rise in the rankings.
- **Educational Focus**: To maximize points, focus on watching educational content such as tutorials, courses, and other self-improvement videos.

## Technologies Used

- **HTML, Tailwind CSS, JavaScript**: Frontend development.
- **Node.js**: Backend server (already hosted).
- **Llama 3.1 AI Model (via Groq API)**: AI for analyzing YouTube video content.
- **Supabase**: For storing user data and leaderboard functionality.
- **Passport.js (Google OAuth)**: For authentication via Google.

## Conclusion

**Productivity Grounds** makes it easier and more enjoyable to stay productive while watching YouTube. By integrating AI-based video analysis and a global leaderboard, the extension not only helps you make more informed decisions but also makes the process of learning fun and competitive. Install the extension, start earning points, and watch yourself climb the leaderboard while improving your productivity!

---

**Happy Learning and Competing!**
