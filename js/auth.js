/* ===============================================
   BURME MOVIE APP — AUTHENTICATION
   =============================================== */
'use strict';

// Auth state management
window._authUser = null;

// ---- FIREBASE AUTH HELPERS ----
// These will be used after Firebase is initialized
function initAuth() {
  if (!window.firebase || !firebase.auth) return;
  firebase.auth().onAuthStateChanged(user => {
    window._authUser = user;
    const path = window.location.pathname;
    const isAuthPage = path.includes('/auth/');
    if (user && isAuthPage) { window.location.href = '../index.html'; }
    else if (!user && !isAuthPage && !path.includes('index.html') && path !== '/') {
      window.location.href = '../auth/login.html';
    }
  });
}

// Email/Password Login
async function loginWithEmail(email, password) {
  if (!window.firebase) return { error: 'Firebase not configured' };
  try {
    const result = await firebase.auth().signInWithEmailAndPassword(email, password);
    return { user: result.user };
  } catch (e) { return { error: getAuthError(e.code) }; }
}

// Email/Password Register
async function registerWithEmail(email, password, displayName) {
  if (!window.firebase) return { error: 'Firebase not configured' };
  try {
    const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
    if (displayName) await result.user.updateProfile({ displayName });
    return { user: result.user };
  } catch (e) { return { error: getAuthError(e.code) }; }
}

// Google Sign-In
async function loginWithGoogle() {
  if (!window.firebase) return { error: 'Firebase not configured' };
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await firebase.auth().signInWithPopup(provider);
    return { user: result.user };
  } catch (e) { return { error: getAuthError(e.code) }; }
}

// Forgot Password
async function sendPasswordReset(email) {
  if (!window.firebase) return { error: 'Firebase not configured' };
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    return { success: true };
  } catch (e) { return { error: getAuthError(e.code) }; }
}

// Sign Out
async function signOutUser() {
  if (window.firebase && firebase.auth) {
    await firebase.auth().signOut();
  }
  window._authUser = null;
  window.location.href = 'auth/login.html';
}
window.firebaseSignOut = signOutUser;

// Error messages
function getAuthError(code) {
  const errors = {
    'auth/invalid-email': 'Invalid email address.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/popup-closed-by-user': 'Sign-in popup was closed.',
    'auth/network-request-failed': 'Network error. Check your connection.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
  };
  return errors[code] || 'Authentication failed. Please try again.';
}

// ---- FORM HELPERS ----
function showError(formId, message) {
  const el = document.getElementById(formId);
  if (el) { el.textContent = message; el.classList.add('show'); }
}
function hideError(formId) {
  const el = document.getElementById(formId);
  if (el) el.classList.remove('show');
}
function setLoading(btnId, loading) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  if (loading) {
    btn.dataset.originalText = btn.innerHTML;
    btn.innerHTML = '<span class="spinner"></span> Loading...';
    btn.disabled = true;
  } else {
    btn.innerHTML = btn.dataset.originalText || btn.innerHTML;
    btn.disabled = false;
  }
}

// Password visibility toggle
function togglePasswordVisibility(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  if (!input || !icon) return;
  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'bi bi-eye-slash form-input-icon';
  } else {
    input.type = 'password';
    icon.className = 'bi bi-eye form-input-icon';
  }
}
