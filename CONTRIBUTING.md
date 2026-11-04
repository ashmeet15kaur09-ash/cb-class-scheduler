# Contributing to Class Scheduler

Thank you for contributing to Codebreakers!

---

## Contribution Rules

1. **Claim First:** Comment on an open issue and wait for assignment before writing code.
2. **Branching:** Create a descriptive branch (e.g. `git switch -c add-search-feature`). Never commit directly to `main`.
3. **Vanilla Tech Stack:** Keep this 100% vanilla (no frameworks, no bundlers, no npm).
4. **Automated/bot PRs will be closed immediately.**

---

## How to Add Default Starter Classes

If your contribution adds default starter classes:
1. Open `js/data.js`.
2. Add your class object to `defaultClasses` following this structure:
   ```javascript
   {
     id: 6,
     course: "Course Name",
     instructor: "Instructor Name",
     day: "Monday | Tuesday | Wednesday | Thursday | Friday",
     startTime: "HH:MM",
     endTime: "HH:MM",
     room: "Room / Building Name"
   }

    Test locally in an Incognito window or clear browser localStorage.