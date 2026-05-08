/* ===============================================
   BURME MOVIE APP — MEGA.nz INTEGRATION
   ===============================================
   
   SETUP INSTRUCTIONS:
   1. Upload your movie files to MEGA.nz
   2. Get the sharing link (right-click → Share → Get link)
   3. Add the link to MOVIE_LINKS below with the movie ID
   4. The MegaPlayer will handle streaming
   
   MEGA SDK: https://github.com/qgustavor/mega
   =============================================== */

'use strict';

// ---- MOVIE LINKS MAP ----
// Add your MEGA.nz links here:
// Format: { movieId: 'https://mega.nz/file/XXXXXXXX#YYYYYYYY' }
const MEGA_LINKS = {
  // 1: 'https://mega.nz/file/YOUR_FILE_ID#YOUR_DECRYPTION_KEY',
  // 2: 'https://mega.nz/file/YOUR_FILE_ID#YOUR_DECRYPTION_KEY',
};

// ---- MEGA PLAYER ----
window.MegaPlayer = {

  // Stream a movie by ID
  async play(movieId) {
    const link = MEGA_LINKS[movieId];
    if (!link) {
      console.warn('[MEGA] No link configured for movie ID:', movieId);
      this.showPlaceholder(movieId);
      return;
    }
    try {
      await this.loadMegaSDK();
      const streamUrl = await this.getStreamUrl(link);
      this.renderPlayer(streamUrl, movieId);
    } catch (e) {
      console.error('[MEGA] Playback error:', e);
      this.showError(movieId, e.message);
    }
  },

  // Load MEGA SDK dynamically
  loadMegaSDK() {
    return new Promise((resolve, reject) => {
      if (window.mega) { resolve(); return; }
      const script = document.createElement('script');
      // Use the MEGA web client SDK
      script.src = 'https://mega.nz/sdk.js';
      script.onload = resolve;
      script.onerror = () => reject(new Error('Failed to load MEGA SDK'));
      document.head.appendChild(script);
    });
  },

  // Get streaming URL from MEGA link
  async getStreamUrl(megaLink) {
    // Parse file ID and key from link
    const match = megaLink.match(/mega\.nz\/file\/([^#]+)#(.+)/);
    if (!match) throw new Error('Invalid MEGA link format');
    const [, fileId, key] = match;
    
    // Using MEGA's streaming endpoint
    // In production, use the official mega.js SDK
    return `https://mega.nz/streaming/${fileId}#${key}`;
  },

  // Render video player
  renderPlayer(url, movieId) {
    const area = document.getElementById('videoArea');
    if (!area) return;
    area.innerHTML = `
      <div class="video-player-wrap">
        <video controls autoplay style="width:100%;height:100%;background:#000">
          <source src="${url}" type="video/mp4">
          Your browser does not support HTML5 video.
        </video>
      </div>
      <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">
        <button class="btn btn-secondary" onclick="MegaPlayer.toggleFullscreen()">
          <i class="bi bi-fullscreen"></i> Fullscreen
        </button>
        <button class="btn btn-secondary" onclick="document.getElementById('videoArea').style.display='none'">
          <i class="bi bi-x"></i> Close
        </button>
      </div>`;
  },

  // Placeholder when no link configured
  showPlaceholder(movieId) {
    const area = document.getElementById('videoArea');
    if (!area) return;
    area.style.display = 'block';
    area.innerHTML = `
      <div class="video-player-wrap">
        <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;background:#111">
          <i class="bi bi-cloud-slash" style="font-size:2.5rem;color:#6B7280"></i>
          <p style="color:#6B7280;font-size:0.85rem;text-align:center">
            Stream not configured yet.<br>
            Add MEGA link in <code style="color:#FFB800">server/MEGA.js</code>
          </p>
        </div>
      </div>`;
  },

  showError(movieId, msg) {
    const area = document.getElementById('videoArea');
    if (!area) return;
    area.innerHTML = `
      <div style="background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.3);
                  border-radius:12px;padding:20px;text-align:center">
        <i class="bi bi-exclamation-triangle" style="font-size:2rem;color:#ef4444"></i>
        <p style="color:#ef4444;margin-top:8px;font-size:0.85rem">${msg}</p>
      </div>`;
  },

  toggleFullscreen() {
    const video = document.querySelector('.video-player-wrap video');
    if (!video) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else video.requestFullscreen().catch(e => console.warn(e));
  }
};
