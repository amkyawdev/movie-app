/* ===============================================
   BURME MOVIE APP — RESPONSIVE MENU (Fixed)
   =============================================== */
'use strict';

const ResponsiveMenu = {
  sidebar: null,
  overlay: null,
  hamburger: null,
  isOpen: false,
  _initialized: false,   // ← Guard against double-init

  init() {
    // Prevent duplicate event listeners if called multiple times
    if (this._initialized) return;

    this.sidebar   = document.getElementById('sidebar');
    this.overlay   = document.getElementById('sidebarOverlay');
    this.hamburger = document.getElementById('hamburgerBtn');

    if (!this.sidebar || !this.hamburger) {
      console.warn('[ResponsiveMenu] Elements not found — check IDs in HTML');
      return;
    }

    this._initialized = true;

    // Hamburger toggle
    this.hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });

    // Close when clicking overlay
    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.close());
    }

    // Close on desktop resize (sidebar always visible ≥768px)
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) this.close(false);
    });

    // Close when a sidebar nav link is clicked (mobile only)
    this.sidebar.querySelectorAll('[data-page], a').forEach(a => {
      a.addEventListener('click', () => {
        if (window.innerWidth < 768) this.close();
      });
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.close();
    });

    console.log('[ResponsiveMenu] Initialized');
  },

  open() {
    this.isOpen = true;
    if (this.sidebar)   this.sidebar.classList.add('open');
    if (this.overlay)   this.overlay.classList.add('visible');
    if (this.hamburger) this.hamburger.innerHTML = '<i class="bi bi-x-lg"></i>';
    document.body.style.overflow = 'hidden';
  },

  close(animate = true) {
    this.isOpen = false;
    if (this.sidebar)   this.sidebar.classList.remove('open');
    if (this.overlay)   this.overlay.classList.remove('visible');
    if (this.hamburger) this.hamburger.innerHTML = '<i class="bi bi-list"></i>';
    document.body.style.overflow = '';
  },

  toggle() {
    this.isOpen ? this.close() : this.open();
  }
};

// Auto-init on DOMContentLoaded
// NOTE: showApp() in index.html also calls init() — the guard above prevents double listeners
document.addEventListener('DOMContentLoaded', () => {
  // Small delay to ensure appShell is rendered
  requestAnimationFrame(() => ResponsiveMenu.init());
});
