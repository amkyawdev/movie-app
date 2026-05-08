/* ===============================================
   BURME MOVIE APP — FIREBASE AUTH (v9.22.0 compat)
   Handles: Email/Password, Google, Forgot Password,
            Session persistence, Auth state changes
   =============================================== */
'use strict';

window._authUser = null;

// ---- AUTH STATE LISTENER ----
function initFirebaseAuth() {
  if (typeof firebase === 'undefined' || !firebase.auth) {
    console.warn('[Auth] Firebase not loaded');
    return;
  }

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

  firebase.auth().onAuthStateChanged(async (user) => {
    window._authUser = user;

    if (user) {
      console.log('[Auth] Signed in:', user.displayName || user.email);
      // Sync Firestore watchlist when user logs in
      if (typeof firestoreSyncWatchlist === 'function') {
        await firestoreSyncWatchlist();
      }
    } else {
      console.log('[Auth] Not signed in');
    }
  });
}

// ---- EMAIL / PASSWORD ----
async function loginWithEmail(email, password) {
  try {
    const result = await firebase.auth().signInWithEmailAndPassword(email, password);
    return { user: result.user };
  } catch (e) {
    return { error: getAuthErrorMessage(e.code) };
  }
}

async function registerWithEmail(email, password, displayName) {
  try {
    const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
    if (displayName) {
      await result.user.updateProfile({ displayName });
    }
    // Create user doc in Firestore
    if (window.db) {
      await window.db.collection('users').doc(result.user.uid).set({
        displayName, email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        watchlist: []
      }, { merge: true });
    }
    return { user: result.user };
  } catch (e) {
    return { error: getAuthErrorMessage(e.code) };
  }
}

// ---- GOOGLE SIGN-IN ----
async function loginWithGoogle() {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    const result = await firebase.auth().signInWithPopup(provider);
    return { user: result.user };
  } catch (e) {
    return { error: getAuthErrorMessage(e.code) };
  }
}

// ---- PASSWORD RESET ----
async function sendPasswordReset(email) {
  try {
    await firebase.auth().sendPasswordResetEmail(email, {
      url: window.location.origin + '/auth/login.html'
    });
    return { success: true };
  } catch (e) {
    return { error: getAuthErrorMessage(e.code) };
  }
}

// ---- SIGN OUT ----
async function signOutUser() {
  try {
    if (typeof firebase !== 'undefined') await firebase.auth().signOut();
    window._authUser = null;
    localStorage.removeItem('burme_watchlist');
    window.location.href = window.location.pathname.includes('/auth/')
      ? 'login.html'
      : 'auth/login.html';
  } catch (e) {
    console.error('[Auth] Sign out error:', e);
  }
}
window.firebaseSignOut = signOutUser;

// ---- ERROR MESSAGES ----
function getAuthErrorMessage(code) {
  const map = {
    'auth/invalid-email':          'Invalid email address.',
    'auth/user-disabled':          'This account has been disabled.',
    'auth/user-not-found':         'No account found with this email.',
    'auth/wrong-password':         'Incorrect password.',
    'auth/email-already-in-use':   'Email is already registered. Sign in instead.',
    'auth/weak-password':          'Password must be at least 6 characters.',
    'auth/popup-closed-by-user':   'Sign-in was cancelled.',
    'auth/network-request-failed': 'Network error. Check your connection.',
    'auth/too-many-requests':      'Too many attempts. Try again later.',
    'auth/invalid-credential':     'Invalid email or password.',
    'auth/operation-not-allowed':  'This sign-in method is not enabled.',
  };
  return map[code] || 'Authentication failed. Please try again.';
}

// ---- FORM HELPERS ----
function showError(elementId, message) {
  const el = document.getElementById(elementId);
  if (el) { el.textContent = message; el.classList.add('show'); }
}
function hideError(elementId) {
  const el = document.getElementById(elementId);
  if (el) el.classList.remove('show');
}
function setLoading(btnId, isLoading) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  if (isLoading) {
    btn.dataset.originalHtml = btn.innerHTML;
    btn.innerHTML = `<span style="display:inline-flex;gap:6px;align-items:center">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 0.8s linear infinite">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>Loading...
    </span>`;
    btn.disabled = true;
  } else {
    btn.innerHTML = btn.dataset.originalHtml || btn.innerHTML;
    btn.disabled = false;
  }
}
function togglePasswordVisibility(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon  = document.getElementById(iconId);
  if (!input || !icon) return;
  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';
  icon.className = `bi bi-eye${isPassword ? '-slash' : ''} form-input-icon`;
}

// Auto-init when Firebase is ready
if (typeof firebase !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFirebaseAuth);
  } else {
    initFirebaseAuth();
  }
}

// CSS for loading spinner
const spinStyle = document.createElement('style');
spinStyle.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
document.head.appendChild(spinStyle);
