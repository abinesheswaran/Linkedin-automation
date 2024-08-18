# LinkedIn Automation

This repository automates sending connection requests to specific targeted individuals on LinkedIn. The script efficiently handles bulk connection requests while minimizing the need for manual intervention. The primary goal is to streamline outreach efforts with minimal effort.

## Features
- Automated connection requests to targeted profiles
- Handles bulk requests seamlessly
- Skips profiles where connections have already been sent

## Technologies Used
- JavaScript

## How to Run This Code?

1. Copy the code from the `index.js` file.
2. Open your browser console (shortcut: `Ctrl + Shift + I` or `Cmd + Option + I`).
3. Paste the code you copied into the console and hit `Enter`.
4. Type `fn(50)` and hit `Enter`. (Here, `50` is the number of connection requests the script will attempt to send.)

## How It Works

1. The script identifies the DOM elements containing the "Connect" button.
2. It automatically triggers a click event on these buttons to send connection requests.
3. If no more "Connect" buttons are found, the script navigates to the next page and continues the process.

![Automation Visual](https://accountgram-production.sfo2.cdn.digitaloceanspaces.com/nubelaco_ghost/2024/01/TLC_Linkedin_AutomationArtboard_1.png)
