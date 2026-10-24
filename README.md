# AIFitness — Fitness Tracker

A responsive front-end demo project for a gym/fitness business. Built with HTML, CSS, and vanilla JavaScript so it runs in VS Code without installing packages.

## Features
- Responsive dashboard for desktop, tablet, and mobile
- Member profile form (name, age, gender, height, weight, activity level, goal)
- Estimated BMI and daily maintenance calories
- Goal-oriented general guidance
- Browser `localStorage` saves profile data on the same device/browser
- Light/dark theme toggle
- No API keys, database, or paid services required

## Run in VS Code
1. Extract `AIFitness-Tracker.zip`.
2. Open the extracted `AIFitness-Tracker` folder in VS Code.
3. Open `index.html` in a browser, or install the free **Live Server** VS Code extension and click **Go Live**.
4. Fill in the profile form and press **Calculate my metrics**.

## Project structure
```
AIFitness-Tracker/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Important demo limitations
- This is a front-end prototype. It does **not** have real accounts, cloud sync, admin features, or a database.
- Profile information is saved only in browser local storage. Do not use sensitive personal data on a public/shared computer.
- BMI and calorie values are rough educational estimates, not medical advice or a diagnosis. Adult BMI categories are not appropriate for children and teens; this demo restricts the profile form to ages 13+ but does not calculate pediatric BMI percentiles.
- For a real gym deployment, add a secure backend, authentication, database, privacy notice, access controls, and professional review of health-related calculations.

## Suggested next upgrades
1. Member sign-in and secure profile storage.
2. Admin dashboard to manage members and plans.
3. Workout plans, attendance, progress history, and measurements.
4. Backend/API with Node.js and a database such as PostgreSQL or Firebase.
