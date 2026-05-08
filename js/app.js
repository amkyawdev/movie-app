/* ===============================================
   BURME MOVIE APP — CORE APP (Router + Mock Data)
   =============================================== */

'use strict';

// ---- MOCK MOVIE DATA ----
const MOVIES = [
  { id: 1, title: "Shwe Thar", titleMM: "ရွှေသာ",  year: 2023, genre: ["Romance", "Drama"],
    rating: 8.5, duration: "1h 54m", poster: "https://picsum.photos/seed/movie1/300/450",
    backdrop: "https://picsum.photos/seed/movie1b/1280/720",
    description: "A heartfelt romance story set in the golden plains of Myanmar, where two souls find each other against all odds.", isFeatured: true, isNew: true },
  { id: 2, title: "Kyauk Tae Yone", titleMM: "ကျောက်တဲ့ရုံ", year: 2023, genre: ["Action", "Thriller"],
    rating: 7.9, duration: "2h 08m", poster: "https://picsum.photos/seed/movie2/300/450",
    backdrop: "https://picsum.photos/seed/movie2b/1280/720",
    description: "A pulse-pounding action thriller following an elite soldier uncovering a vast conspiracy.", isFeatured: false, isNew: true },
  { id: 3, title: "Ngar Yar Thu", titleMM: "ငါရာသူ", year: 2022, genre: ["Comedy", "Romance"],
    rating: 7.5, duration: "1h 42m", poster: "https://picsum.photos/seed/movie3/300/450",
    backdrop: "https://picsum.photos/seed/movie3b/1280/720",
    description: "A hilarious and sweet story of mistaken identity and unexpected love.", isFeatured: false, isNew: false },
  { id: 4, title: "Mya Nanda", titleMM: "မြနန္ဒာ", year: 2023, genre: ["Drama", "Family"],
    rating: 8.1, duration: "2h 00m", poster: "https://picsum.photos/seed/movie4/300/450",
    backdrop: "https://picsum.photos/seed/movie4b/1280/720",
    description: "An emotional journey of a daughter searching for her roots across Myanmar.", isFeatured: false, isNew: false },
  { id: 5, title: "Lay Pyar Tal", titleMM: "လေပြာတော်", year: 2022, genre: ["Action", "Adventure"],
    rating: 7.7, duration: "1h 58m", poster: "https://picsum.photos/seed/movie5/300/450",
    backdrop: "https://picsum.photos/seed/movie5b/1280/720",
    description: "Sky pirates and hidden treasure — an epic adventure above the clouds of Bagan.", isFeatured: false, isNew: false },
  { id: 6, title: "Min Thit Lay", titleMM: "မင်းသိသလေ", year: 2023, genre: ["Romance"],
    rating: 8.3, duration: "1h 50m", poster: "https://picsum.photos/seed/movie6/300/450",
    backdrop: "https://picsum.photos/seed/movie6b/1280/720",
    description: "A bittersweet tale of love across two cities and one unforgettable summer.", isFeatured: false, isNew: true },
  { id: 7, title: "Taung Gyi Express", titleMM: "တောင်ကြီးExpress", year: 2022, genre: ["Comedy", "Adventure"],
    rating: 7.4, duration: "1h 38m", poster: "https://picsum.photos/seed/movie7/300/450",
    backdrop: "https://picsum.photos/seed/movie7b/1280/720",
    description: "Three friends, one broken-down bus, and the wildest road trip through the Shan Hills.", isFeatured: false, isNew: false },
  { id: 8, title: "Yadana Sar", titleMM: "ရတနာဆာ", year: 2023, genre: ["Horror", "Mystery"],
    rating: 7.8, duration: "1h 45m", poster: "https://picsum.photos/seed/movie8/300/450",
    backdrop: "https://picsum.photos/seed/movie8b/1280/720",
    description: "Secrets buried in an old colonial mansion resurface when a journalist investigates a cold case.", isFeatured: false, isNew: true },
  { id: 9, title: "Inle Lay Pa", titleMM: "အင်းလေးလေပြာ", year: 2022, genre: ["Drama", "Romance"],
    rating: 8.0, duration: "2h 05m", poster: "https://picsum.photos/seed/movie9/300/450",
    backdrop: "https://picsum.photos/seed/movie9b/1280/720",
    description: "A fisherman and an artist find love on the serene waters of Inle Lake.", isFeatured: false, isNew: false },
  { id: 10, title: "Ka Ba Ma", titleMM: "ကဗမ", year: 2023, genre: ["Sci-Fi", "Action"],
    rating: 7.6, duration: "2h 15m", poster: "https://picsum.photos/seed/movie10/300/450",
    backdrop: "https://picsum.photos/seed/movie10b/1280/720",
    description: "In 2050, a data analyst discovers that Myanmar's entire history has been rewritten.", isFeatured: false, isNew: true },
  { id: 11, title: "Pwint Phyu", titleMM: "ပွင့်ဖြူ", year: 2022, genre: ["Drama"],
    rating: 7.9, duration: "1h 52m", poster: "https://picsum.photos/seed/movie11/300/450",
    backdrop: "https://picsum.photos/seed/movie11b/1280/720",
    description: "A nurse's extraordinary devotion during a public health crisis in rural Myanmar.", isFeatured: false, isNew: false },
  { id: 12, title: "Nat Khaung Lay", titleMM: "နတ်ကြောင်လေး", year: 2023, genre: ["Comedy", "Horror"],
    rating: 7.2, duration: "1h 40m", poster: "https://picsum.photos/seed/movie12/300/450",
    backdrop: "https://picsum.photos/seed/movie12b/1280/720",
    description: "When spirit mediums get the wrong address, chaos — and comedy — ensues.", isFeatured: false, isNew: false }
];

const CATEGORIES = ["All", "Romance", "Action", "Drama", "Comedy", "Horror", "Sci-Fi", "Adventure", "Family", "Thriller"];

// ---- STATE ----
window.AppState = {
  currentPage: null,
  watchlist: JSON.parse(localStorage.getItem('burme_watchlist') || '[]'),
  searchQuery: '',
  currentMovieId: null,
};

// ---- UTILS ----
function getMovieById(id) { return MOVIES.find(m => m.id === parseInt(id)); }
function getFeaturedMovie() { return MOVIES.find(m => m.isFeatured) || MOVIES[0]; }
function getNewMovies() { return MOVIES.filter(m => m.isNew); }
function getMoviesByGenre(genre) {
  if (!genre || genre === 'All') return MOVIES;
  return MOVIES.filter(m => m.genre.includes(genre));
}
function searchMovies(q) {
  const query = q.toLowerCase();
  return MOVIES.filter(m => m.title.toLowerCase().includes(query) || m.titleMM.includes(query) || m.genre.some(g => g.toLowerCase().includes(query)));
}
function isInWatchlist(id) { return AppState.watchlist.includes(parseInt(id)); }
function toggleWatchlist(id) {
  id = parseInt(id);
  if (isInWatchlist(id)) {
    AppState.watchlist = AppState.watchlist.filter(i => i !== id);
    showToast('Removed from watchlist', 'bi-bookmark-dash');
  } else {
    AppState.watchlist.push(id);
    showToast('Added to watchlist', 'bi-bookmark-check-fill');
  }
  localStorage.setItem('burme_watchlist', JSON.stringify(AppState.watchlist));
  document.querySelectorAll(`.movie-card-watchlist-btn[data-id="${id}"]`).forEach(btn => {
    btn.classList.toggle('saved', isInWatchlist(id));
    btn.innerHTML = `<i class="bi bi-bookmark${isInWatchlist(id) ? '-fill' : ''}"></i>`;
  });
}

// ---- TOAST ----
function showToast(message, icon = 'bi-info-circle') {
  let toast = document.getElementById('app-toast');
  if (!toast) { toast = document.createElement('div'); toast.id = 'app-toast'; toast.className = 'toast'; document.body.appendChild(toast); }
  toast.innerHTML = `<i class="bi ${icon}"></i> ${message}`;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ---- MOVIE CARD COMPONENT ----
function createMovieCard(movie, compact = false) {
  const saved = isInWatchlist(movie.id);
  return `
  <div class="movie-card fade-in" onclick="navigateTo('movie-detail', {id: ${movie.id}})" data-movie-id="${movie.id}">
    <img class="movie-card-poster" src="${movie.poster}" alt="${movie.title}" loading="lazy"
         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
    <div class="movie-card-poster-placeholder" style="display:none">
      <i class="bi bi-film"></i>
    </div>
    ${movie.isNew ? '<span class="movie-card-badge">New</span>' : ''}
    <button class="movie-card-watchlist-btn ${saved ? 'saved' : ''}" data-id="${movie.id}"
      onclick="event.stopPropagation(); toggleWatchlist(${movie.id})">
      <i class="bi bi-bookmark${saved ? '-fill' : ''}"></i>
    </button>
    <div class="movie-card-overlay">
      <div class="movie-card-title">${movie.title}</div>
      <div class="movie-card-meta">
        <span class="movie-card-rating"><i class="bi bi-star-fill"></i> ${movie.rating}</span>
        <span class="text-muted">•</span>
        <span>${movie.year}</span>
      </div>
    </div>
  </div>`;
}

// ---- PAGE RENDERER ----
function setActiveNav(page) {
  document.querySelectorAll('.bottom-nav-item, .sidebar-nav a').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });
}

// ---- NAVIGATION ----
function navigateTo(page, params = {}) {
  if (AppState.currentPage === page && !params.id) return;
  AppState.currentPage = page;
  AppState.currentMovieId = params.id || null;
  history.pushState({ page, params }, '', `#${page}${params.id ? '/' + params.id : ''}`);
  renderPage(page, params);
  setActiveNav(page);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handlePopState(e) {
  const hash = location.hash.replace('#', '') || 'home';
  const [page, id] = hash.split('/');
  renderPage(page, id ? { id: parseInt(id) } : {});
  setActiveNav(page);
}
window.addEventListener('popstate', handlePopState);

// ---- PAGE RENDERERS ----
const pageRenderers = {};

pageRenderers['home'] = function() {
  const featured = getFeaturedMovie();
  const newMovies = getNewMovies();
  return `
  <div class="page-wrapper">
    <!-- Hero Banner -->
    <div class="hero-banner">
      <img src="${featured.backdrop}" alt="${featured.title}" loading="lazy">
      <div class="hero-banner-overlay"></div>
      <div class="hero-banner-content">
        <span class="hero-badge"><i class="bi bi-trophy-fill"></i> Featured</span>
        <div class="hero-title">${featured.title}</div>
        <div class="hero-meta">
          <span class="hero-rating"><i class="bi bi-star-fill"></i> ${featured.rating}</span>
          <span class="dot">•</span><span>${featured.year}</span>
          <span class="dot">•</span><span>${featured.duration}</span>
          <span class="dot">•</span><span>${featured.genre.join(', ')}</span>
        </div>
        <div class="hero-actions">
          <button class="btn btn-primary" onclick="navigateTo('movie-detail', {id: ${featured.id}})">
            <i class="bi bi-play-fill"></i> Watch Now
          </button>
          <button class="btn btn-secondary" onclick="toggleWatchlist(${featured.id})">
            <i class="bi bi-bookmark-plus"></i> Watchlist
          </button>
        </div>
      </div>
    </div>

    <!-- Categories -->
    <div class="section-header">
      <span class="section-title">Browse</span>
    </div>
    <div class="category-row" id="categoryRow">
      ${CATEGORIES.map(c => `<button class="category-pill ${c === 'All' ? 'active' : ''}" onclick="filterByCategory('${c}', this)">${c}</button>`).join('')}
    </div>

    <!-- New Releases -->
    <div class="section-header">
      <span class="section-title">New Releases</span>
      <a class="section-link" onclick="navigateTo('search')">See All</a>
    </div>
    <div class="scroll-row">
      ${newMovies.map(m => createMovieCard(m)).join('')}
    </div>

    <!-- All Movies Grid -->
    <div class="section-header">
      <span class="section-title" id="gridTitle">All Movies</span>
    </div>
    <div class="movie-grid" id="movieGrid">
      ${MOVIES.map(m => createMovieCard(m)).join('')}
    </div>
    <div style="height:24px"></div>
  </div>`;
};

pageRenderers['search'] = function(params) {
  return `
  <div class="page-wrapper">
    <div class="header">
      <span class="header-title">Search</span>
    </div>
    <div class="search-header">
      <div class="search-input-wrap">
        <i class="bi bi-search search-icon"></i>
        <input type="search" class="search-input" id="searchInput"
          placeholder="Search movies, genres..." autocomplete="off"
          value="${AppState.searchQuery}" oninput="handleSearch(this.value)">
        <button class="search-clear ${AppState.searchQuery ? 'visible' : ''}" id="searchClear"
          onclick="clearSearch()"><i class="bi bi-x-circle-fill"></i></button>
      </div>
    </div>

    <!-- Popular searches -->
    <div id="searchSuggestions" style="${AppState.searchQuery ? 'display:none' : ''}">
      <div class="section-header"><span class="section-title">Popular Genres</span></div>
      <div class="category-row" style="padding: 0 16px 16px">
        ${CATEGORIES.filter(c=>c!=='All').map(c =>
          `<button class="category-pill" onclick="handleSearch('${c}')">${c}</button>`
        ).join('')}
      </div>
      <div class="section-header"><span class="section-title">All Movies</span></div>
      <div class="movie-grid" style="padding: 0 16px">
        ${MOVIES.slice(0,8).map(m => createMovieCard(m)).join('')}
      </div>
    </div>

    <div id="searchResults" style="${AppState.searchQuery ? '' : 'display:none'}">
      <div class="section-header">
        <span class="section-title" id="searchResultTitle">Results</span>
      </div>
      <div class="movie-grid" id="searchResultGrid"></div>
    </div>
    <div style="height:24px"></div>
  </div>`;
};

pageRenderers['watchlist'] = function() {
  const movies = MOVIES.filter(m => isInWatchlist(m.id));
  if (movies.length === 0) return `
  <div class="page-wrapper">
    <div class="header"><span class="header-title">My Watchlist</span></div>
    <div class="watchlist-empty">
      <i class="bi bi-bookmark-heart"></i>
      <h3>Nothing saved yet</h3>
      <p>Movies you bookmark will appear here</p>
      <div style="margin-top:20px">
        <button class="btn btn-gold" onclick="navigateTo('home')">
          <i class="bi bi-house-fill"></i> Browse Movies
        </button>
      </div>
    </div>
  </div>`;
  return `
  <div class="page-wrapper">
    <div class="header">
      <span class="header-title">My Watchlist</span>
      <div class="header-actions">
        <span style="font-size:0.8rem;color:var(--text-muted)">${movies.length} movie${movies.length !== 1 ? 's' : ''}</span>
      </div>
    </div>
    <div class="movie-grid" style="padding:16px">
      ${movies.map(m => createMovieCard(m)).join('')}
    </div>
    <div style="height:24px"></div>
  </div>`;
};

pageRenderers['profile'] = function() {
  const user = window._authUser;
  const name = user ? (user.displayName || user.email.split('@')[0]) : 'Guest';
  const email = user ? user.email : '';
  const photo = user && user.photoURL ? user.photoURL : 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=FFB800&color=0a0a0a&size=88';
  return `
  <div class="page-wrapper">
    <div class="profile-hero">
      <div class="profile-avatar-wrapper">
        <img class="profile-avatar" src="${photo}" alt="${name}">
        <div class="profile-avatar-edit"><i class="bi bi-camera-fill"></i></div>
      </div>
      <div class="profile-name">${name}</div>
      ${email ? `<div class="profile-email">${email}</div>` : ''}
      <div class="profile-stats">
        <div class="stat-item">
          <div class="stat-value">${AppState.watchlist.length}</div>
          <div class="stat-label">Watchlist</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${Math.floor(Math.random()*20)+5}</div>
          <div class="stat-label">Watched</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${Math.floor(Math.random()*10)+1}</div>
          <div class="stat-label">Reviews</div>
        </div>
      </div>
    </div>
    <div class="profile-menu">
      <div class="profile-menu-item" onclick="navigateTo('watchlist')">
        <i class="bi bi-bookmark-heart-fill"></i>
        <span>My Watchlist</span>
        <i class="bi bi-chevron-right"></i>
      </div>
      <div class="profile-menu-item">
        <i class="bi bi-person-fill"></i>
        <span>Edit Profile</span>
        <i class="bi bi-chevron-right"></i>
      </div>
      <div class="profile-menu-item">
        <i class="bi bi-bell-fill"></i>
        <span>Notifications</span>
        <i class="bi bi-chevron-right"></i>
      </div>
      <div class="profile-menu-item">
        <i class="bi bi-gear-fill"></i>
        <span>Settings</span>
        <i class="bi bi-chevron-right"></i>
      </div>
      <div class="profile-menu-item">
        <i class="bi bi-question-circle-fill"></i>
        <span>Help & Support</span>
        <i class="bi bi-chevron-right"></i>
      </div>
      <div style="height:16px"></div>
      <div class="profile-menu-item" style="border-color:rgba(239,68,68,0.2)" onclick="signOutUser()">
        <i class="bi bi-box-arrow-left" style="color:#ef4444"></i>
        <span style="color:#ef4444">Sign Out</span>
        <i class="bi bi-chevron-right"></i>
      </div>
    </div>
  </div>`;
};

pageRenderers['movie-detail'] = function(params) {
  const movie = getMovieById(params.id);
  if (!movie) return `<div class="page-wrapper" style="padding:60px 16px;text-align:center"><i class="bi bi-exclamation-circle" style="font-size:3rem;color:var(--text-muted)"></i><p style="margin-top:12px">Movie not found.</p></div>`;
  const saved = isInWatchlist(movie.id);
  const related = MOVIES.filter(m => m.id !== movie.id && m.genre.some(g => movie.genre.includes(g))).slice(0,6);
  return `
  <div class="page-wrapper">
    <!-- Back Button -->
    <div style="position:absolute;top:8px;left:8px;z-index:10">
      <button class="btn btn-icon" style="background:rgba(0,0,0,0.6);border-radius:50%;color:white;border:1px solid var(--border)" onclick="history.back()">
        <i class="bi bi-arrow-left"></i>
      </button>
    </div>
    <!-- Backdrop -->
    <div class="movie-backdrop" style="position:relative">
      <img src="${movie.backdrop}" alt="${movie.title}">
      <div class="movie-backdrop-overlay"></div>
    </div>
    <!-- Info -->
    <div class="movie-info-container">
      <div class="movie-info">
        <div class="movie-detail-title">${movie.title}</div>
        <div class="movie-detail-meta">
          <span class="hero-rating"><i class="bi bi-star-fill"></i> ${movie.rating}/10</span>
          <span class="dot">•</span><span>${movie.year}</span>
          <span class="dot">•</span><span>${movie.duration}</span>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px">
          ${movie.genre.map(g => `<span class="genre-tag">${g}</span>`).join('')}
        </div>
        <p class="movie-description">${movie.description}</p>
        <div class="movie-detail-actions">
          <button class="btn btn-primary" onclick="playMovie(${movie.id})">
            <i class="bi bi-play-fill"></i> Watch Now
          </button>
          <button class="btn ${saved ? 'btn-gold' : 'btn-secondary'}" onclick="toggleWatchlist(${movie.id}); this.className='btn ' + (isInWatchlist(${movie.id}) ? 'btn-gold' : 'btn-secondary'); this.innerHTML='<i class=\\'bi bi-bookmark' + (isInWatchlist(${movie.id}) ? '-fill' : '') + '\\'></i> ' + (isInWatchlist(${movie.id}) ? 'Saved' : 'Save')">
            <i class="bi bi-bookmark${saved ? '-fill' : ''}"></i> ${saved ? 'Saved' : 'Save'}
          </button>
          <button class="btn btn-secondary" onclick="shareMovie(${movie.id})">
            <i class="bi bi-share-fill"></i> Share
          </button>
        </div>
        <!-- Video Player Placeholder -->
        <div id="videoArea" style="display:none">
          <div class="video-player-wrap">
            <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px">
              <i class="bi bi-play-circle-fill" style="font-size:3rem;color:var(--accent-gold)"></i>
              <p style="font-size:0.82rem;color:var(--text-muted)">MEGA stream will load here</p>
              <p style="font-size:0.72rem;color:var(--text-muted)">Configure MEGA.js with your link</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- More Like This -->
    ${related.length ? `
    <div class="section-header"><span class="section-title">More Like This</span></div>
    <div class="scroll-row">
      ${related.map(m => createMovieCard(m)).join('')}
    </div>
    ` : ''}
    <div style="height:32px"></div>
  </div>`;
};

// ---- ACTION HANDLERS ----
function filterByCategory(cat, btn) {
  document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  const filtered = getMoviesByGenre(cat);
  const grid = document.getElementById('movieGrid');
  const title = document.getElementById('gridTitle');
  if (grid) {
    grid.innerHTML = filtered.map(m => createMovieCard(m)).join('');
    if (title) title.textContent = cat === 'All' ? 'All Movies' : cat + ' Movies';
  }
}

function handleSearch(value) {
  AppState.searchQuery = value;
  const clearBtn = document.getElementById('searchClear');
  const suggestions = document.getElementById('searchSuggestions');
  const results = document.getElementById('searchResults');
  const grid = document.getElementById('searchResultGrid');
  const title = document.getElementById('searchResultTitle');
  if (clearBtn) clearBtn.classList.toggle('visible', !!value);
  if (!value) {
    if (suggestions) suggestions.style.display = '';
    if (results) results.style.display = 'none';
    return;
  }
  if (suggestions) suggestions.style.display = 'none';
  if (results) results.style.display = '';
  const found = searchMovies(value);
  if (title) title.textContent = `${found.length} result${found.length !== 1 ? 's' : ''} for "${value}"`;
  if (grid) {
    grid.innerHTML = found.length
      ? found.map(m => createMovieCard(m)).join('')
      : `<div class="no-results" style="grid-column:1/-1"><i class="bi bi-search"></i><p>No movies found for "${value}"</p></div>`;
  }
}

function clearSearch() {
  AppState.searchQuery = '';
  const input = document.getElementById('searchInput');
  if (input) { input.value = ''; input.focus(); }
  handleSearch('');
}

function playMovie(id) {
  const videoArea = document.getElementById('videoArea');
  if (videoArea) {
    videoArea.style.display = 'block';
    videoArea.scrollIntoView({ behavior: 'smooth' });
    if (window.MegaPlayer) { window.MegaPlayer.play(id); }
    showToast('Loading stream...', 'bi-play-circle');
  }
}

function shareMovie(id) {
  const movie = getMovieById(id);
  if (navigator.share && movie) {
    navigator.share({ title: movie.title, text: movie.description, url: location.href });
  } else {
    navigator.clipboard.writeText(location.href).then(() => showToast('Link copied!', 'bi-link-45deg'));
  }
}

function signOutUser() {
  if (window.firebaseSignOut) { window.firebaseSignOut(); }
  else { showToast('Signing out...', 'bi-box-arrow-left'); setTimeout(() => { window.location.href = 'auth/login.html'; }, 800); }
}

// ---- MAIN RENDER ----
function renderPage(page, params = {}) {
  const renderer = pageRenderers[page];
  if (!renderer) { renderPage('home'); return; }
  const appRoot = document.getElementById('appRoot');
  if (appRoot) appRoot.innerHTML = renderer(params);
  // Re-run search if on search page
  if (page === 'search' && AppState.searchQuery) {
    setTimeout(() => handleSearch(AppState.searchQuery), 50);
  }
}

// ---- INIT ----
function initApp() {
  const hash = location.hash.replace('#', '') || 'home';
  const [page, id] = hash.split('/');
  AppState.currentPage = page;
  renderPage(page, id ? { id: parseInt(id) } : {});
  setActiveNav(page);
}
