/* ===============================================
   BURME MOVIE APP — PWA MANAGER
   =============================================== */
'use strict';

const PWA = {
  deferredPrompt: null,
  installBtn: null,

  init() {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(reg => {
        console.log('[PWA] Service Worker registered:', reg.scope);
      }).catch(err => console.warn('[PWA] SW registration failed:', err));
    }

    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallBanner();
    });

    // Track install
    window.addEventListener('appinstalled', () => {
      console.log('[PWA] App installed!');
      this.hideInstallBanner();
    });

    // Handle standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches) {
      document.body.classList.add('pwa-standalone');
    }
  },

  showInstallBanner() {
    const existing = document.getElementById('pwaBanner');
    if (existing || localStorage.getItem('pwa_dismissed') === '1') return;

    const banner = document.createElement('div');
    banner.id = 'pwaBanner';
    banner.style.cssText = `
      position:fixed; bottom:80px; left:16px; right:16px; z-index:8000;
      background:#181818; border:1px solid rgba(255,184,0,0.3);
      border-radius:16px; padding:14px 16px;
      display:flex; align-items:center; gap:12px;
      box-shadow:0 8px 32px rgba(0,0,0,0.6);
      animation:fadeIn 0.3s ease;
    `;
    banner.innerHTML = `
      <div style="width:40px;height:40px;border-radius:10px;background:var(--accent-gold);display:flex;align-items:center;justify-content:center;flex-shrink:0">
        <i class="bi bi-film" style="font-size:1.2rem;color:#0a0a0a"></i>
      </div>
      <div style="flex:1">
        <div style="font-weight:600;font-size:0.875rem">Install Burme App</div>
        <div style="font-size:0.72rem;color:#999">Watch anywhere, even offline</div>
      </div>
      <button id="pwaInstallBtn" style="background:var(--accent-orange);color:white;border:none;padding:8px 14px;border-radius:8px;font-size:0.8rem;font-weight:600;cursor:pointer">Install</button>
      <button onclick="PWA.dismissBanner()" style="background:none;border:none;color:#666;font-size:1rem;cursor:pointer;padding:4px"><i class="bi bi-x-lg"></i></button>
    `;
    document.body.appendChild(banner);

    document.getElementById('pwaInstallBtn').addEventListener('click', () => this.promptInstall());

    // Auto-hide after 8s
    setTimeout(() => this.hideInstallBanner(), 8000);
  },

  async promptInstall() {
    if (!this.deferredPrompt) return;
    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;
    console.log('[PWA] Install outcome:', outcome);
    this.deferredPrompt = null;
    this.hideInstallBanner();
  },

  dismissBanner() {
    localStorage.setItem('pwa_dismissed', '1');
    this.hideInstallBanner();
  },

  hideInstallBanner() {
    const banner = document.getElementById('pwaBanner');
    if (banner) banner.remove();
  }
};

document.addEventListener('DOMContentLoaded', () => PWA.init());
