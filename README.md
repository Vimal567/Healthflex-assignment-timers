# React JS Timer App

This is a React JS app that allows users to create, manage, and interact with customizable timers. The app includes features like timer creation, timer management, progress visualization, history tracking, and user feedback upon timer completion.

---

## Visuals

Here’s a screenshot of the Timer App:

![Home Page Screenshot](https://github.com/user-attachments/assets/d894a58d-68eb-4d3c-9225-60c0abafb8e9)
![History Page Screenshot](https://github.com/user-attachments/assets/a858ddfe-c163-4724-bc7d-93eef8ff46ee))

---


## Features

### Core Features:
1. **Add Timer**
   - Create a timer with name, duration (in seconds), and category.
   - Store timers locally using localStorage.
   
2. **Timer List with Grouping**
   - View timers grouped by category (e.g., "Workout", "Study").
   - Expand/collapse categories to view individual timers.
   
3. **Timer Management**
   - Start, pause, and reset timers.
   - Mark timers as completed once the countdown reaches zero.

4. **Progress Visualization**
   - A simple progress bar/percentage shows the remaining time relative to the timer's duration.

5. **Bulk Actions**
   - Bulk actions to start, pause, or reset all timers within a category.

6. **User Feedback**
   - Show snackbar with a congratulatory message when a timer completes.

### Enhanced Features:
1. **Timer History**
   - A log of completed timers including the timer's name and completion time.
   - View the log in the "History" screen.

2. **Customizable Alerts**
   - Set optional alerts at halfway through the timer duration.
   - Notify the user when the halfway point is reached.

---

## Technical Details

- **State Management**: `useState` and `useReducer` are used for managing the state of timers and categories.
- **Navigation**: React Router dom is used for navigation between the Home and History screens.
- **Persistence**: Timers and history logs are persisted using `Local Storage`.
- **Styling**: `StyleSheet` is used to create a responsive and clean layout.
- **Timers**: Timers are managed with `setInterval` for countdowns.

---

## Installation

### Prerequisites

  Node.js and npm installed (check with `node -v` and `npm -v`).

### Setup Instructions

1. Clone this repository:
    ```bash
    git clone https://github.com/Vimal567/Healthflex-assignment-timers.git
    cd Healthflex-assignment-timers
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Link dependencies (if required):
    ```bash
    npx react-native link
    ```

4. Start the app:
    ```bash
    npm start
    ```
---

## Usage

1. **Home Screen**: Add, view, and manage timers. Timers are grouped by category, and each can be started, paused, or reset.
2. **History Screen**: View completed timers with their name and completion time.
3. **Bulk Actions**: Start, pause, or reset all timers in a category with a single action.
---

## Assumptions

- **Data Persistence**: Timers are stored locally using localStorage, and timers will persist even after closing the app.
- **Timer Duration**: The user sets the timer in seconds, and the app handles countdown functionality.
- **Completion Alert**: When a timer reaches zero, an on-screen modal will show a congratulatory message.

---
