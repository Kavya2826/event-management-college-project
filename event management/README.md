# Eventra — Event Management Application

A single-page event management application built with **React.js** and **Vite** for an MCA Frontend Development project.

Eventra allows visitors to discover upcoming events, view event information, register as participants, and manage their registrations.

## Features

- **Event discovery:** Browse six sample events across Technology, Music, Workshop, Business, and Community categories.
- **Search and filters:** Search by event title, venue, or category and filter by event category.
- **Sorting:** Sort events by soonest date, latest date, or name (A–Z).
- **Event details:** Open a details dialog with the event description, date, venue, price, and remaining seats.
- **Participant registration:** Register with a name and email address; phone number is optional.
- **Registration management:** View registrations and cancel a registration.
- **Duplicate prevention:** The same email cannot register twice for the same event in the current browser.
- **Seat tracking:** Remaining seats are calculated from registrations saved in the current browser.
- **Local persistence:** Registration data is saved in browser LocalStorage.
- **Responsive interface:** Dark-themed layout with mobile navigation and responsive event cards.

## Tech stack

- React 19
- JavaScript (ES modules)
- Vite
- HTML5
- CSS3
- Browser LocalStorage

## Project structure

```text
event-management-college-project/
└── event management/
    ├── public/
    ├── src/
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── package.json
    ├── package-lock.json
    └── vite.config.js
```

## Run locally

Open a terminal at the repository root, then run:

```powershell
cd "event management"
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173/`).

## Available scripts

Run these commands from the `event management` directory:

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## How registration storage works

This is a **frontend-only academic project**. Registrations are stored in the browser's LocalStorage under the key `eventra-registrations`.

Consequences and limitations:

- Registrations are available only in the same browser and browser profile.
- Data is not shared between different users or devices.
- Clearing browser site data removes saved registrations.
- Seat counts and duplicate checks are local to that browser; they are not globally enforced.
- There is no backend, database, authentication, payment gateway, or admin dashboard.

Do not use this demo to collect real personal information or process real event bookings.

## Academic scope

The project demonstrates React functional components, state management with `useState`, side effects with `useEffect`, memoized filtering with `useMemo`, conditional rendering, list rendering, controlled form inputs, event handling, and browser storage.

## Future enhancements

- Connect a backend API and database for shared registrations.
- Add user authentication and an admin event-management area.
- Add server-side seat availability and booking validation.
- Add automated component and end-to-end tests.
- Split the current application into smaller reusable React components.
