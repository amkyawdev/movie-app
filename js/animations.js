/* ===============================================
   BURME MOVIE APP — ANIMATIONS
   =============================================== */
'use strict';

// ---- PAGE TRANSITION ----
const Transitions = {
  duration: 300,

  slideRight(el) {
    el.style.cssText = 'opacity:0;transform:translateX(-40px)';
    requestAnimationFrame(() => {
      el.style.transition = `opacity ${this.duration}ms ease, transform ${this.duration}ms cubic-bezier(0.4,0,0.2,1)`;
      el.style.cssText += ';opacity:1;transform:translateX(0)';
    });
  },
  slideLeft(el) {
    el.style.cssText = 'opacity:0;transform:translateX(40px)';
    requestAnimationFrame(() => {
      el.style.transition = `opacity ${this.duration}ms ease, transform ${this.duration}ms cubic-bezier(0.4,0,0.2,1)`;
      el.style.cssText += ';opacity:1;transform:translateX(0)';
    });
  },
  fadeUp(el) {
    el.style.cssText = 'opacity:0;transform:translateY(16px)';
    requestAnimationFrame(() => {
      el.style.transition = `opacity ${this.duration}ms ease, transform ${this.duration}ms cubic-bezier(0.4,0,0.2,1)`;
      el.style.cssText += ';opacity:1;transform:translateY(0)';
    });
  },
  scaleIn(el) {
    el.style.cssText = 'opacity:0;transform:scale(0.95)';
    requestAnimationFrame(() => {
      el.style.transition = `opacity ${this.duration}ms ease, transform ${this.duration}ms cubic-bezier(0.4,0,0.2,1)`;
      el.style.cssText += ';opacity:1;transform:scale(1)';
    });
  },
  apply(el, type = 'fadeUp') {
    if (!el) return;
    const fn = this[type];
    if (fn) fn.call(this, el);
  }
};

// ---- STAGGERED CARD ANIMATION ----
function animateCards(selector, delay = 60) {
  const cards = document.querySelectorAll(selector);
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(12px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.4,0,0.2,1)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * delay);
  });
}

// ---- LOADING PROGRESS ----
function animateProgress(barId, percentId, onComplete) {
  const bar = document.getElementById(barId);
  const pct = document.getElementById(percentId);
  if (!bar) return;
  let current = 0;
  const intervals = [
    { target: 30, speed: 20 }, { target: 60, speed: 30 },
    { target: 85, speed: 15 }, { target: 95, speed: 60 }, { target: 100, speed: 10 }
  ];
  let phaseIndex = 0;

  function step() {
    const phase = intervals[phaseIndex];
    if (!phase) { if (onComplete) onComplete(); return; }
    if (current < phase.target) {
      current += 1;
      bar.style.width = current + '%';
      if (pct) pct.textContent = current + '%';
      setTimeout(step, phase.speed);
    } else {
      phaseIndex++;
      setTimeout(step, 100);
    }
  }
  step();
}

// ---- RIPPLE EFFECT ----
function addRipple(el) {
  el.addEventListener('click', function(e) {
    const rect = el.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position:absolute; border-radius:50%; background:rgba(255,255,255,0.2);
      width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top - size/2}px;
      transform:scale(0); pointer-events:none;
      transition:transform 0.4s ease, opacity 0.4s ease;
    `;
    el.style.position = 'relative';
    el.style.overflow = 'hidden';
    el.appendChild(ripple);
    requestAnimationFrame(() => { ripple.style.transform = 'scale(2)'; ripple.style.opacity = '0'; });
    setTimeout(() => ripple.remove(), 400);
  });
}

// ---- LAZY IMAGES ----
function lazyLoadImages() {
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) { img.src = img.dataset.src; delete img.dataset.src; }
          io.unobserve(img);
        }
      });
    }, { rootMargin: '100px' });
    document.querySelectorAll('img[data-src]').forEach(img => io.observe(img));
  }
}

// ---- SCROLL REVEAL ----
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
  lazyLoadImages();
  initScrollReveal();
  document.querySelectorAll('.btn').forEach(addRipple);
});
