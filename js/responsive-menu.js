/* ===============================================
   BURME MOVIE APP — RESPONSIVE MENU
   =============================================== */
'use strict';

const ResponsiveMenu = {
  sidebar: null, overlay: null, hamburger: null, isOpen: false,

  init() {
    this.sidebar = document.getElementById('sidebar');
    this.overlay = document.getElementById('sidebarOverlay');
    this.hamburger = document.getElementById('hamburgerBtn');
    if (!this.sidebar) return;
    if (this.hamburger) this.hamburger.addEventListener('click', () => this.toggle());
    if (this.overlay) this.overlay.addEventListener('click', () => this.close());
    // Close on desktop resize
    window.addEventListener('resize', () => { if (window.innerWidth >= 768) this.close(false); });
    // Close on nav link click (mobile)
    this.sidebar.querySelectorAll('a[data-page]').forEach(a => {
      a.addEventListener('click', () => { if (window.innerWidth < 768) this.close(); });
    });
  },

  open() {
    this.isOpen = true;
    if (this.sidebar) this.sidebar.classList.add('open');
    if (this.overlay) this.overlay.classList.add('visible');
    if (this.hamburger) this.hamburger.innerHTML = '<i class="bi bi-x-lg"></i>';
    document.body.style.overflow = 'hidden';
  },

  close(animate = true) {
    this.isOpen = false;
    if (this.sidebar) this.sidebar.classList.remove('open');
    if (this.overlay) this.overlay.classList.remove('visible');
    if (this.hamburger) this.hamburger.innerHTML = '<i class="bi bi-list"></i>';
    document.body.style.overflow = '';
  },

  toggle() { this.isOpen ? this.close() : this.open(); }
};

document.addEventListener('DOMContentLoaded', () => ResponsiveMenu.init());
