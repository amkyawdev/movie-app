# BURME MOVIES — Myanmar Cinema Streaming PWA

> Watch the best Burmese cinema, anywhere, anytime.

## Tech Stack
- **HTML5 + CSS3 + Vanilla JS** (no frameworks)
- **Tailwind CSS** (CDN)
- **Bootstrap Icons** CDN
- **Firebase Auth** (Email/Password + Google) — Project: `amk-apk`
- **Firebase Firestore** — Watchlist sync
- **Firebase Realtime Database** — Watch history
- **MEGA.nz** — Video streaming
- **PWA** — Offline support, installable

## Project Structure
```
burme-movie-app/
├── index.html                  # App shell + SPA router
├── auth/
│   ├── login.html
│   ├── register.html
│   └── forgot-password.html
├── pages/                      # Deep-link redirectors
├── components/                 # HTML component templates
├── css/main.css                # Cinematic OLED design system
├── js/
│   ├── app.js                  # Router + movie data + page renderers
│   ├── firebase-auth.js        # Firebase auth helpers (v9.22.0)
│   ├── auth.js                 # Additional auth utilities
│   ├── animations.js           # Page transitions + effects
│   ├── responsive-menu.js      # Hamburger + sidebar
│   └── pwa.js                  # Service worker + install prompt
├── server/
│   ├── firebaseConfig.js       # Firebase config (amk-apk project)
│   └── MEGA.js                 # MEGA.nz streaming helper
├── assets/icons/favicon.svg
├── manifest.json
├── sw.js                       # Service Worker
└── offline.html
```

## Quick Start
```bash
git clone https://github.com/amkyawdev/movie-app.git
cd movie-app
npx live-server . --port=3000
```

## Add Movies
Edit the `MOVIES` array in `js/app.js`:
```js
{ id: 1, title: "Movie Title", titleMM: "ရုပ်ရှင်", year: 2024,
  genre: ["Drama"], rating: 8.5, duration: "1h 54m",
  poster: "https://...", backdrop: "https://...",
  description: "...", isFeatured: true, isNew: true }
```

## Add MEGA Streams
Edit `server/MEGA.js`:
```js
const MEGA_LINKS = {
  1: 'https://mega.nz/file/YOUR_ID#YOUR_KEY',
};
```

## Firebase Security Rules
In Firebase Console → Firestore → Rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /watchlists/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---
Made with for Myanmar Cinema
