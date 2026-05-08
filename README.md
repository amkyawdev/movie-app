# 🎬 Burme Movie App

> Myanmar Cinema at Your Fingertips — A Burmese movie streaming PWA

![Burme Movies](assets/icons/favicon.svg)

## ✨ Features

- 🎥 **Cinematic OLED Dark Theme** — Deep black UI optimized for OLED screens
- 📱 **Mobile-First PWA** — Install on any device, works offline
- 🔐 **Firebase Authentication** — Email/Password + Google Sign-In
- 💾 **Firestore Watchlist** — Save movies across devices
- 🎞️ **MEGA.nz Streaming** — Securely stream video via MEGA
- 🔍 **Smart Search** — Search by title, genre, year
- 🔔 **Push Notifications** — Get notified about new releases
- ⚡ **GPU-Accelerated Animations** — Smooth 60fps transitions

## 📁 Project Structure

```
burme-movie-app/
├── index.html                 # App shell + loading screen
├── auth/
│   ├── login.html             # Sign in
│   ├── register.html          # Create account
│   └── forgot-password.html   # Password reset
├── pages/                     # Deep-link redirectors
├── components/
│   ├── header.html
│   ├── mobile-bottom-nav.html
│   ├── desktop-sidebar.html
│   ├── movie-card.html
│   └── loader.html
├── css/main.css               # All styles (Cinematic OLED design)
├── js/
│   ├── app.js                 # Router + mock data + page renderers
│   ├── auth.js                # Firebase auth helpers
│   ├── animations.js          # Page transitions + effects
│   ├── responsive-menu.js     # Sidebar + hamburger
│   └── pwa.js                 # Service worker + install prompt
├── server/
│   ├── firebaseConfig.js      # Firebase setup (CONFIGURE THIS)
│   └── MEGA.js                # MEGA.nz streaming (ADD LINKS HERE)
├── assets/icons/favicon.svg   # App icon
├── manifest.json              # PWA manifest
├── sw.js                      # Service Worker
├── offline.html               # Offline fallback
└── tailwind.config.js         # Tailwind config
```

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/amkyawdev/movie-app.git
cd movie-app

# Install dev dependencies
npm install

# Start local server
npm run dev
```

Open `http://localhost:3000` in your browser.

## ⚙️ Configuration

### 1. Firebase Setup

Edit `server/firebaseConfig.js` and replace the placeholder values:

```javascript
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID",
};
```

**Firebase Console Setup:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create project → Add Web App
3. Enable **Authentication** → Email/Password + Google
4. Enable **Firestore Database** → Start in test mode
5. Copy config values above

### 2. Add Movies (MEGA.nz)

Edit `server/MEGA.js` and add your movie links:

```javascript
const MEGA_LINKS = {
  1: 'https://mega.nz/file/YOUR_FILE_ID#YOUR_KEY',
  2: 'https://mega.nz/file/YOUR_FILE_ID#YOUR_KEY',
};
```

### 3. Add Real Movie Data

Edit the `MOVIES` array in `js/app.js`:

```javascript
const MOVIES = [
  {
    id: 1,
    title: "Your Movie Title",
    titleMM: "မြန်မာ ရုပ်ရှင်",
    year: 2024,
    genre: ["Drama", "Romance"],
    rating: 8.5,
    duration: "1h 54m",
    poster: "https://your-image-url/poster.jpg",  // 2:3 ratio
    backdrop: "https://your-image-url/backdrop.jpg",  // 16:9 ratio
    description: "Movie synopsis...",
    isFeatured: true,
    isNew: true,
  },
  // ...more movies
];
```

## 📱 Navigation

| Platform | Navigation Style |
|----------|-----------------|
| **Mobile** (<768px) | Bottom tab bar (Home, Search, Watchlist, Profile) |
| **Desktop** (≥768px) | Left sidebar (collapses on mobile, hamburger to open) |

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#0a0a0a` | Page background |
| `--accent-gold` | `#FFB800` | Titles, ratings, active nav |
| `--accent-orange` | `#F97316` | CTA buttons, badges |
| `--accent-blue` | `#2563EB` | Links, interactive |
| `--font-heading` | Bebas Neue | Movie titles, section headers |
| `--font-body` | DM Sans | All body text, UI elements |

## 🔧 PWA Install

The app includes an install prompt that appears after the user visits 3+ times. You can also manually install:

- **Android Chrome**: Menu → Add to Home Screen
- **iOS Safari**: Share → Add to Home Screen  
- **Desktop**: Address bar install button

## 📦 Tech Stack

- **HTML5** + **CSS3** + **Vanilla JavaScript** (no frameworks)
- **Tailwind CSS** (CDN) for utility classes
- **Bootstrap Icons** for all icons
- **Firebase** — Auth + Firestore
- **MEGA.nz** — Video storage + streaming
- **Service Worker** — Offline support + caching

## 🌟 Roadmap

- [ ] Add real Firebase integration
- [ ] MEGA.nz streaming implementation
- [ ] Comments & ratings system
- [ ] Burmese language (Myanmar Unicode) support
- [ ] Download for offline viewing
- [ ] Admin panel for movie management

## 📄 License

MIT License — © 2025 amkyawdev

---

Made with ❤️ for Myanmar Cinema 🇲🇲
