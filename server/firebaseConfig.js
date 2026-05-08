/* ===============================================
   BURME MOVIE APP — FIREBASE CONFIGURATION
   ===============================================
   
   SETUP INSTRUCTIONS:
   1. Go to https://console.firebase.google.com
   2. Create a new project (or use existing)
   3. Add a Web App in Project Settings
   4. Copy the firebaseConfig object below
   5. Enable Authentication → Email/Password + Google
   6. Enable Firestore Database
   
   =============================================== */

const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID",
  measurementId:     "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase (only if not already initialized)
if (typeof firebase !== 'undefined') {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  window.db = firebase.firestore();
}

// ---- FIRESTORE HELPERS ----

// Save to watchlist in Firestore
async function firestoreAddToWatchlist(userId, movieId) {
  if (!window.db) return;
  try {
    await window.db.collection('watchlists').doc(userId).set({
      movies: firebase.firestore.FieldValue.arrayUnion(movieId),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  } catch (e) { console.warn('Firestore error:', e); }
}

// Remove from watchlist in Firestore
async function firestoreRemoveFromWatchlist(userId, movieId) {
  if (!window.db) return;
  try {
    await window.db.collection('watchlists').doc(userId).update({
      movies: firebase.firestore.FieldValue.arrayRemove(movieId)
    });
  } catch (e) { console.warn('Firestore error:', e); }
}

// Get watchlist from Firestore
async function firestoreGetWatchlist(userId) {
  if (!window.db) return [];
  try {
    const doc = await window.db.collection('watchlists').doc(userId).get();
    return doc.exists ? (doc.data().movies || []) : [];
  } catch (e) { console.warn('Firestore error:', e); return []; }
}

// Save watch history
async function firestoreSaveHistory(userId, movieId) {
  if (!window.db) return;
  try {
    await window.db.collection('history').doc(userId).set({
      movies: firebase.firestore.FieldValue.arrayUnion({
        id: movieId, watchedAt: new Date().toISOString()
      })
    }, { merge: true });
  } catch (e) { console.warn('Firestore error:', e); }
}
