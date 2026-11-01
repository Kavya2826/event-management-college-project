# Eventra — MCA Project Report

## 1. Introduction
Eventra is a React-based single-page event management application. It provides a simple interface for discovering events, viewing event details, registering participants, and managing registrations within the browser.

## 2. Objectives
- Display a list of upcoming events.
- Allow users to search, filter, and sort events.
- Present detailed information about a selected event.
- Collect participant registration details through a form.
- Allow users to view and cancel their registrations.

## 3. Main modules
1. **Event discovery:** Event cards, category filters, search, and sorting.
2. **Event details:** Dialog showing event date, time, venue, description, price, and remaining seats.
3. **Participant registration:** Form for participant name and email; phone is optional.
4. **Registration management:** List of saved registrations and cancellation action.
5. **Browser persistence:** LocalStorage keeps registration data after a page refresh in the same browser.

## 4. React concepts used
- Functional React component.
- `useState` for UI and form state.
- `useEffect` to synchronize registrations with LocalStorage.
- `useMemo` to derive filtered and sorted event lists.
- Conditional rendering for dialogs, empty states, and confirmation.
- `map()` for rendering event and registration lists.
- Controlled form inputs and event handlers.

## 5. Technology stack
React 19, JavaScript, Vite, HTML5, CSS3, and browser LocalStorage.

## 6. Data and limitations
The event catalogue is sample data defined in the frontend. Participant registrations are stored only in LocalStorage. There is no server or shared database, so registrations and seat counts are not synchronized across browsers or devices. This implementation is a frontend academic demonstration, not a production booking service.

## 7. How to run
From the repository root:

```powershell
cd "event management"
npm install
npm run dev
```

For a production build:

```powershell
npm run build
```

## 8. Possible future scope
A backend API, database, authentication, admin event management, server-side booking validation, and automated tests can be added in a future version.
