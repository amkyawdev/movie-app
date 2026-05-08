/* ===============================================
   BURME MOVIE APP — FIREBASE CONFIGURATION
   Project: amk-apk
   =============================================== */

const firebaseConfig = {
  apiKey:            "AIzaSyCcw0_7Pc4tIAapg-Hyvk4UtiQfo1USjU8",
  authDomain:        "amk-apk.firebaseapp.com",
  databaseURL:       "https://amk-apk-default-rtdb.firebaseio.com",
  projectId:         "amk-apk",
  storageBucket:     "amk-apk.firebasestorage.app",
  messagingSenderId: "267632318274",
  appId:             "1:267632318274:android:441e4b8cb66da60d04dadb",
  measurementId:     "G-E2658JJ29R"
};

// Initialize Firebase (safe to call multiple times)
if (typeof firebase !== 'undefined') {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  // Firestore
  window.db = firebase.firestore();
  // Realtime Database
  if (firebase.database) {
    window.rtdb = firebase.database();
  }
}

// ---- FIRESTORE HELPERS ----

async function firestoreAddToWatchlist(userId, movieId) {
  if (!window.db) return;
  try {
    await window.db.collection('watchlists').doc(userId).set({
      movies: firebase.firestore.FieldValue.arrayUnion(movieId),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  } catch (e) { console.warn('[Firestore] watchlist add error:', e.message); }
}

async function firestoreRemoveFromWatchlist(userId, movieId) {
  if (!window.db) return;
  try {
    await window.db.collection('watchlists').doc(userId).update({
      movies: firebase.firestore.FieldValue.arrayRemove(movieId)
    });
  } catch (e) { console.warn('[Firestore] watchlist remove error:', e.message); }
}

async function firestoreGetWatchlist(userId) {
  if (!window.db) return [];
  try {
    const doc = await window.db.collection('watchlists').doc(userId).get();
    return doc.exists ? (doc.data().movies || []) : [];
  } catch (e) { console.warn('[Firestore] get watchlist error:', e.message); return []; }
}

async function firestoreSyncWatchlist() {
  const user = window._authUser;
  if (!user || !window.db) return;
  try {
    const cloudList = await firestoreGetWatchlist(user.uid);
    if (cloudList.length > 0) {
      window.AppState.watchlist = cloudList;
      localStorage.setItem('burme_watchlist', JSON.stringify(cloudList));
    }
  } catch (e) { console.warn('[Firestore] sync error:', e.message); }
}
