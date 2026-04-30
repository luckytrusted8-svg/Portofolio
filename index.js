/* ═══════════════════════════════════════════
   LUCKY UBAIDILLAH — PORTFOLIO SCRIPT
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── LOADER ──────────────────────────────
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 600);
  });

  // ── CUSTOM CURSOR ────────────────────────
  const cursor = document.getElementById('cursor');
  const trail  = document.getElementById('cursorTrail');
  if (cursor && trail) {
    let mx = 0, my = 0, tx = 0, ty = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });
    function animTrail() {
      tx += (mx - tx) * 0.12;
      ty += (my - ty) * 0.12;
      trail.style.left = tx + 'px';
      trail.style.top  = ty + 'px';
      requestAnimationFrame(animTrail);
    }
    animTrail();
    document.querySelectorAll('a, button, .pcard, .about-card, .tool-item, .contact-card').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%,-50%) scale(2.5)'; });
      el.addEventListener('mouseleave', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; });
    });
  }

  // ── NAVBAR SCROLL ────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveNav();
  });

  // ── ACTIVE NAV ───────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  function updateActiveNav() {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.dataset.section === current);
    });
  }

  // ── MOBILE MENU ──────────────────────────
  const burger     = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  document.querySelectorAll('.mobile-link').forEach(l => {
    l.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // ── REVEAL ON SCROLL ─────────────────────
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.12 });
  reveals.forEach(r => observer.observe(r));

  // ── SKILL BARS ───────────────────────────
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.w + '%';
        });
        barObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skills-bar-wrap').forEach(el => barObserver.observe(el));

  // ── SMOOTH SCROLL (internal links) ──────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior:'smooth' }); }
    });
  });

});

// ── COPY DISCORD ────────────────────────
function copyDiscord() {
  navigator.clipboard.writeText('LuckyTrusted17').then(() => {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  });
}

// ── COPY EMAIL ────────────────────────
function copyEmail() {
  navigator.clipboard.writeText('luckyubaidillah5@gmail.com').then(() => {
    const toast = document.getElementById('toast');
    toast.textContent = 'Email disalin! 📋';
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => { toast.textContent = 'Discord username disalin! 🎮'; }, 400);
    }, 3000);
  });
}

/* ═══════════════════════════════════════════════════
   THEME TOGGLE — Lucky Ubaidillah Portfolio
   Tambahkan kode ini ke script.js kamu,
   atau include sebagai <script src="theme.js"></script>
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  const STORAGE_KEY = 'lu-theme';
  const html = document.documentElement;

  /* ── 1. Baca preferensi tersimpan, fallback ke system ── */
  function getInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    // Ikuti preferensi sistem OS
    return window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }

  /* ── 2. Terapkan tema ke <html> ── */
  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    // Update semua toggle buttons (desktop + mobile)
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      btn.setAttribute('title',      theme === 'dark' ? 'Light Mode' : 'Dark Mode');
    });
  }

  /* ── 3. Toggle ── */
  function toggleTheme() {
    const current = html.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  /* ── 4. Pasang event ke semua .theme-toggle ── */
  function bindToggles() {
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });
  }

  /* ── 5. Init saat DOM ready ── */
  function init() {
    // Set tema sebelum render untuk menghindari flash
    applyTheme(getInitialTheme());
    bindToggles();

    // Re-bind kalau ada elemen yang di-render dinamis
    const observer = new MutationObserver(bindToggles);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ── 6. Sinkronisasi kalau tab lain ganti tema ── */
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY && (e.newValue === 'light' || e.newValue === 'dark')) {
      applyTheme(e.newValue);
    }
  });

})();

/* ═══════════════════════════════════════════════════
   FEATURES.JS — Lucky Ubaidillah Portfolio
   Semua JS untuk fitur-fitur baru
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ──────────────────────────────────────────────
     1. SCROLL PROGRESS BAR + BACK TO TOP RING
     ────────────────────────────────────────────── */
  var progressBar = document.getElementById('scrollProgressBar');
  var backToTop   = document.getElementById('backToTop');
  var bttRingFill = document.getElementById('bttRingFill');

  // SVG circle circumference for r=17: 2πr ≈ 106.81
  var CIRCUMFERENCE = 2 * Math.PI * 17;

  function onScroll() {
    var scrollTop    = window.scrollY || document.documentElement.scrollTop;
    var docHeight    = document.documentElement.scrollHeight - window.innerHeight;
    var pct          = docHeight > 0 ? scrollTop / docHeight : 0;
    var pctClamped   = Math.min(Math.max(pct, 0), 1);

    // Progress bar width
    if (progressBar) progressBar.style.width = (pctClamped * 100) + '%';

    // Back to top visibility
    if (backToTop) {
      if (scrollTop > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }

    // Ring stroke
    if (bttRingFill) {
      var offset = CIRCUMFERENCE - pctClamped * CIRCUMFERENCE;
      bttRingFill.style.strokeDashoffset = offset;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // init

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ──────────────────────────────────────────────
     2. ACTIVE NAV HIGHLIGHT via IntersectionObserver
     ────────────────────────────────────────────── */
  var navLinks = document.querySelectorAll('.nav-link[data-section]');

  var sectionIds = Array.from(navLinks).map(function (l) {
    return l.getAttribute('data-section');
  });

  var sectionEls = sectionIds.map(function (id) {
    return document.getElementById(id);
  }).filter(Boolean);

  var activeSection = sectionIds[0];

  var navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        activeSection = entry.target.id;
        navLinks.forEach(function (link) {
          var isActive = link.getAttribute('data-section') === activeSection;
          link.classList.toggle('active', isActive);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' });

  sectionEls.forEach(function (el) { navObserver.observe(el); });


  /* ──────────────────────────────────────────────
     3. TYPING ANIMATION
     ────────────────────────────────────────────── */
  var typingEl = document.getElementById('typingText');
  var words    = [
    'Web Development',
    'UI/UX Design',
    'React.js',
    'Laravel',
    'Creative Coding',
    'Problem Solving'
  ];

  if (typingEl) {
    var wordIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typingDelay = 110;

    function type() {
      var current = words[wordIndex];

      if (isDeleting) {
        charIndex--;
        typingEl.textContent = current.slice(0, charIndex);
        typingDelay = 55;
      } else {
        charIndex++;
        typingEl.textContent = current.slice(0, charIndex);
        typingDelay = 110;
      }

      if (!isDeleting && charIndex === current.length) {
        // Pause at end of word
        typingDelay = 1800;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex  = (wordIndex + 1) % words.length;
        typingDelay = 300;
      }

      setTimeout(type, typingDelay);
    }

    // Small delay before starting
    setTimeout(type, 800);
  }


  /* ──────────────────────────────────────────────
     4. PROJECT FILTER
     ────────────────────────────────────────────── */
  var filterBtns  = document.querySelectorAll('.filter-btn');
  var projectCards = document.querySelectorAll('.pcard[data-category]');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');

      // Update active button
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      // Show/hide cards
      projectCards.forEach(function (card) {
        var cat = card.getAttribute('data-category');
        var show = filter === 'all' || cat === filter;

        if (show) {
          card.classList.remove('hidden');
          card.classList.add('fade-in');
          setTimeout(function () { card.classList.remove('fade-in'); }, 400);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });


  /* ──────────────────────────────────────────────
     5. LIGHTBOX
     ────────────────────────────────────────────── */
  var lightbox   = document.getElementById('lightbox');
  var lbImg      = document.getElementById('lbImg');
  var lbCaption  = document.getElementById('lbCaption');
  var lbClose    = document.getElementById('lbClose');
  var lbPrev     = document.getElementById('lbPrev');
  var lbNext     = document.getElementById('lbNext');
  var lbBackdrop = document.getElementById('lbBackdrop');
  var lbDots     = document.getElementById('lbDots');

  var lbItems    = [];
  var lbCurrent  = 0;

  // Build items list from all .lb-trigger elements
  function buildLbItems() {
    lbItems = Array.from(document.querySelectorAll('.lb-trigger'));
  }

  function openLightbox(index) {
    if (!lightbox || lbItems.length === 0) return;
    lbCurrent = index;
    updateLbContent();
    buildDots();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateLbContent() {
    var item = lbItems[lbCurrent];
    if (!item) return;
    var src     = item.getAttribute('data-src');
    var caption = item.getAttribute('data-caption') || '';

    // Fade out → update → fade in
    if (lbImg) {
      lbImg.style.opacity = '0';
      lbImg.style.transform = 'scale(.95)';
      setTimeout(function () {
        lbImg.src = src;
        lbImg.alt = caption;
        lbImg.onload = function () {
          lbImg.style.opacity = '1';
          lbImg.style.transform = 'scale(1)';
        };
        lbImg.style.transition = 'opacity .3s ease, transform .3s ease';
      }, 150);
    }
    if (lbCaption) lbCaption.textContent = caption;
    updateDots();
  }

  function buildDots() {
    if (!lbDots) return;
    lbDots.innerHTML = '';
    lbItems.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'lb-dot' + (i === lbCurrent ? ' active' : '');
      dot.setAttribute('aria-label', 'Gambar ' + (i + 1));
      dot.addEventListener('click', function () { lbCurrent = i; updateLbContent(); updateDots(); });
      lbDots.appendChild(dot);
    });
  }

  function updateDots() {
    if (!lbDots) return;
    var dots = lbDots.querySelectorAll('.lb-dot');
    dots.forEach(function (d, i) { d.classList.toggle('active', i === lbCurrent); });
  }

  function lbGo(dir) {
    lbCurrent = (lbCurrent + dir + lbItems.length) % lbItems.length;
    updateLbContent();
    updateDots();
  }

  // Init triggers
  buildLbItems();
  lbItems.forEach(function (item, index) {
    item.addEventListener('click', function () { openLightbox(index); });
  });

  if (lbClose)   lbClose.addEventListener('click', closeLightbox);
  if (lbBackdrop) lbBackdrop.addEventListener('click', closeLightbox);
  if (lbPrev)    lbPrev.addEventListener('click', function () { lbGo(-1); });
  if (lbNext)    lbNext.addEventListener('click', function () { lbGo(1); });

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  lbGo(-1);
    if (e.key === 'ArrowRight') lbGo(1);
  });


  /* ──────────────────────────────────────────────
     6. COUNTER ANIMATION
     ────────────────────────────────────────────── */
  var counters = document.querySelectorAll('.counter[data-target]');
  var counterDone = false;

  function animateCounters() {
    if (counterDone) return;
    counters.forEach(function (el) {
      var target   = parseInt(el.getAttribute('data-target'), 10);
      var duration = 1400;
      var start    = null;

      function step(timestamp) {
        if (!start) start = timestamp;
        var elapsed  = timestamp - start;
        var progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target;
        }
      }
      requestAnimationFrame(step);
    });
    counterDone = true;
  }

  // Trigger counters when the stats block enters viewport
  var statsEl = document.querySelector('.abn-stats');
  if (statsEl && counters.length > 0) {
    var counterObserver = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        animateCounters();
        counterObserver.disconnect();
      }
    }, { threshold: 0.5 });
    counterObserver.observe(statsEl);
  }


  /* ──────────────────────────────────────────────
     7. PWA SERVICE WORKER REGISTRATION
     ────────────────────────────────────────────── */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').then(function (reg) {
        console.log('[PWA] ServiceWorker registered:', reg.scope);
      }).catch(function (err) {
        console.warn('[PWA] ServiceWorker registration failed:', err);
      });
    });
  }

})();

/* ═══════════════════════════════════════════════════
   MUSIC PLAYER — Spotify-like Playlist & Controls
   Edit array `songs` below to add/remove tracks!
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── EDIT LAGU DI SINI ── */
  var songs = [
    {
      title: 'Locked Out Of Heaven',
      artist: 'Bruno Mars',
      src: 'audio/Bruno Mars - Locked Out Of Heaven.mp3',
      cover: 'image/AlbumPlaylist/BrunoMars.jpg',
      duration: '3:53'
    },
    {
      title: 'Perfect',
      artist: 'One Direction',
      src: 'audio/One Direction - Perfect.mp3',
      cover: 'image/AlbumPlaylist/OneDirection.jpg',
      duration: '3:50'
    },
    {
      title: 'Strong',
      artist: 'One Direction',
      src: 'audio/One Direction - Strong (Audio) [9JiW1UrLiBo].mp3',
      cover: 'image/AlbumPlaylist/Strong.jpg',
      duration: '3:20'
    },
    {
      title: 'Story Of My Life',
      artist: 'One Direction',
      src: 'audio/One Direction - Story of My Life [W-TE_Ys4iwM].mp3',
      cover: 'image/AlbumPlaylist/StoryOfMyLife.jpg',
      duration: '4:07'
    },
    {
      title: 'Treat You Better',
      artist: 'Shawn Mendes',
      src: 'audio/Shawn Mendes - Treat You Better [lY2yjAdbvdQ].mp3',
      cover: 'image/AlbumPlaylist/TreatYouBetter.jpg',
      duration: '4:16'
    },
    {
      title: 'Focus On Myself',
      artist: 'DEV',
      src: 'audio/DEV - Focus On Myself (Official Audio) [u0jm2l3He3A].mp3',
      cover: 'image/AlbumPlaylist/FocusOnMyself.jpg',
      duration: '3:35'
    },
    {
      title: 'Right Now',
      artist: 'One Direction',
      src: 'audio/One Direction - Right Now (Audio) [96C7zX178-s].mp3',
      cover: 'image/AlbumPlaylist/OneDirection.jpg',
      duration: '3:21'
    },
    {
      title: 'December',
      artist: 'Neck Deep',
      src: 'audio/Neck Deep - December [8NnQs3EtoqU].mp3',
      cover: 'image/AlbumPlaylist/NeckDeep.jpg',
      duration: '3:21'
    },
    {
      title: 'One Call Away',
      artist: 'Charlie Puth',
      src: 'audio/Charlie Puth - One Call Away [Official Video] [BxuY9FET9Y4].mp3',
      cover: 'image/AlbumPlaylist/CharliePuth.jpg',
      duration: '4:01'
    },
    {
      title: 'Just The Way You Are',
      artist: 'Bruno Mars',
      src: 'audio/Bruno Mars - Just The Way You Are (Lyrics) [u7XjPmN-tHw].mp3',
      cover: 'image/AlbumPlaylist/BrunoMars2.jpg',
      duration: '3:40'
    },
    {
      title: 'Love Me Not',
      artist: 'Ravyn Lenae',
      src: 'audio/Ravyn Lenae - Love Me Not [-7AfRAU69d8].mp3',
      cover: 'image/AlbumPlaylist/LoveMeNot.jpg',
      duration: '3:33'
    },

  ];

  var audio          = document.getElementById('audioPlayer');
  var playBtn        = document.getElementById('playBtn');
  var prevBtn        = document.getElementById('prevBtn');
  var nextBtn        = document.getElementById('nextBtn');
  var shuffleBtn     = document.getElementById('shuffleBtn');
  var repeatBtn      = document.getElementById('repeatBtn');
  var progressBar    = document.getElementById('progressBar');
  var progressFill   = document.getElementById('progressFill');
  var progressHandle = document.getElementById('progressHandle');
  var currentTimeEl  = document.getElementById('currentTime');
  var totalTimeEl    = document.getElementById('totalTime');
  var volumeSlider   = document.getElementById('volumeSlider');
  var disc           = document.getElementById('albumDisc');
  var albumImg       = document.getElementById('albumImg');
  var songTitle      = document.getElementById('musicTitle');
  var songArtist     = document.getElementById('musicArtist');
  var playlistEl     = document.getElementById('playlist');
  var playlistCount  = document.getElementById('playlistCount');

  if (!audio) return; // Section tidak ada di halaman

  var currentIndex = 0;
  var isPlaying    = false;
  var isShuffle    = false;
  var repeatMode   = 0; // 0 = none, 1 = all, 2 = one

  function formatTime(seconds) {
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  function loadSong(index) {
    currentIndex = index;
    var s = songs[index];
    audio.src = s.src;
    if (songTitle)  songTitle.textContent  = s.title;
    if (songArtist) songArtist.textContent = s.artist;
    if (albumImg)   albumImg.src = s.cover || '';
    if (totalTimeEl) totalTimeEl.textContent = s.duration || '--:--';
    renderPlaylist();
    if (isPlaying) {
      audio.play().catch(function(){});
      if (disc) disc.classList.add('spin');
    }
  }

  function togglePlay() {
    if (!audio.src) loadSong(currentIndex);
    if (audio.paused) {
      audio.play().catch(function(){});
      isPlaying = true;
      if (playBtn) { playBtn.innerHTML = '<i class="fas fa-pause"></i>'; }
      if (disc) disc.classList.add('spin');
    } else {
      audio.pause();
      isPlaying = false;
      if (playBtn) { playBtn.innerHTML = '<i class="fas fa-play"></i>'; }
      if (disc) disc.classList.remove('spin');
    }
  }

  function nextSong() {
    if (isShuffle) {
      var nextIndex;
      do { nextIndex = Math.floor(Math.random() * songs.length); }
      while (nextIndex === currentIndex && songs.length > 1);
      currentIndex = nextIndex;
    } else {
      currentIndex = (currentIndex + 1) % songs.length;
    }
    loadSong(currentIndex);
    isPlaying = true;
    if (playBtn) { playBtn.innerHTML = '<i class="fas fa-pause"></i>'; }
  }

  function prevSong() {
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      updateProgress();
      return;
    }
    if (isShuffle) {
      var prevIdx;
      do { prevIdx = Math.floor(Math.random() * songs.length); }
      while (prevIdx === currentIndex && songs.length > 1);
      currentIndex = prevIdx;
    } else {
      currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    }
    loadSong(currentIndex);
    isPlaying = true;
    if (playBtn) { playBtn.innerHTML = '<i class="fas fa-pause"></i>'; }
  }

  function toggleShuffle() {
    isShuffle = !isShuffle;
    if (shuffleBtn) {
      shuffleBtn.classList.toggle('active', isShuffle);
      shuffleBtn.style.color = isShuffle ? 'var(--accent)' : '';
    }
  }

  function toggleRepeat() {
    repeatMode = (repeatMode + 1) % 3;
    if (repeatBtn) {
      if (repeatMode === 0) {
        repeatBtn.classList.remove('active');
        repeatBtn.style.color = '';
        repeatBtn.innerHTML = '<i class="fas fa-redo"></i>';
        repeatBtn.title = 'Repeat: Off';
      } else if (repeatMode === 1) {
        repeatBtn.classList.add('active');
        repeatBtn.style.color = 'var(--accent)';
        repeatBtn.innerHTML = '<i class="fas fa-redo"></i>';
        repeatBtn.title = 'Repeat: All';
      } else {
        repeatBtn.classList.add('active');
        repeatBtn.style.color = 'var(--accent)';
        repeatBtn.innerHTML = '<i class="fas fa-redo-alt"></i>';
        repeatBtn.title = 'Repeat: One';
      }
    }
  }

  function onEnded() {
    if (repeatMode === 2) {
      audio.currentTime = 0;
      audio.play().catch(function(){});
    } else if (repeatMode === 1) {
      nextSong();
    } else {
      if (currentIndex < songs.length - 1 || isShuffle) {
        nextSong();
      } else {
        isPlaying = false;
        if (playBtn) playBtn.innerHTML = '<i class="fas fa-play"></i>';
        if (disc) disc.classList.remove('spin');
      }
    }
  }

  function updateProgress() {
    if (!audio.duration) return;
    var pct = (audio.currentTime / audio.duration) * 100;
    if (progressFill) progressFill.style.width = pct + '%';
    if (progressHandle) progressHandle.style.left = pct + '%';
    if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
    if (totalTimeEl && audio.duration) totalTimeEl.textContent = formatTime(audio.duration);
  }

  function seek(e) {
    if (!audio.duration || !progressBar) return;
    var rect = progressBar.getBoundingClientRect();
    var pct  = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    audio.currentTime = pct * audio.duration;
    updateProgress();
  }

  function renderPlaylist() {
    if (!playlistEl) return;
    playlistEl.innerHTML = songs.map(function(s, i) {
      var active = i === currentIndex ? 'active' : '';
      return (
        '<li class="playlist-item ' + active + '" data-index="' + i + '">' +
          '<span class="pl-num">' + (i + 1) + '</span>' +
          '<div class="pl-info"><strong>' + s.title + '</strong><span>' + s.artist + '</span></div>' +
          '<span class="pl-duration">' + (s.duration || '--:--') + '</span>' +
          '<span class="pl-playing"><i class="fas fa-volume-up"></i></span>' +
        '</li>'
      );
    }).join('');

    playlistEl.querySelectorAll('.playlist-item').forEach(function(item) {
      item.addEventListener('click', function() {
        var idx = parseInt(item.getAttribute('data-index'), 10);
        loadSong(idx);
        isPlaying = true;
        if (playBtn) { playBtn.innerHTML = '<i class="fas fa-pause"></i>'; }
        if (disc) disc.classList.add('spin');
      });
    });

    if (playlistCount) playlistCount.textContent = songs.length + ' lagu';
  }

  // Events
  if (playBtn)    playBtn.addEventListener('click', togglePlay);
  if (prevBtn)    prevBtn.addEventListener('click', prevSong);
  if (nextBtn)    nextBtn.addEventListener('click', nextSong);
  if (shuffleBtn) shuffleBtn.addEventListener('click', toggleShuffle);
  if (repeatBtn)  repeatBtn.addEventListener('click', toggleRepeat);
  if (audio) {
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('loadedmetadata', updateProgress);
  }
  if (progressBar) {
    progressBar.addEventListener('click', seek);
  }
  if (volumeSlider) {
    volumeSlider.value = 0.8;
    audio.volume = 0.8;
    volumeSlider.addEventListener('input', function() {
      audio.volume = volumeSlider.value;
    });
  }

  // Init
  renderPlaylist();
  loadSong(0);
  isPlaying = false;
  if (playBtn) playBtn.innerHTML = '<i class="fas fa-play"></i>';

})();

/* ═══════════════════════════════════════════════════
   SERVICE WORKER — Lucky Ubaidillah Portfolio
   Cache-first strategy for offline support
   ═══════════════════════════════════════════════════ */

var CACHE_NAME   = 'lu-portfolio-v1';
var STATIC_FILES = [
  './',
  './index.html',
  './index.css',
  './theme-mode.css',
  './about-new-addition.css',
  './features.css',
  './script.js',
  './theme.js',
  './features.js',
  './manifest.json',
  './logo-lu.jpeg',
  './image/lucky.jpeg',
  'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css'
];

/* ── INSTALL: cache static assets ── */
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('[SW] Caching static files');
      return cache.addAll(STATIC_FILES);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

/* ── ACTIVATE: clean old caches ── */
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (key) { return key !== CACHE_NAME; })
            .map(function (key) {
              console.log('[SW] Deleting old cache:', key);
              return caches.delete(key);
            })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

/* ── FETCH: cache-first, fallback to network ── */
self.addEventListener('fetch', function (event) {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(function (cachedResponse) {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).then(function (networkResponse) {
        // Cache image and font responses dynamically
        if (
          networkResponse.ok &&
          (event.request.url.match(/\.(jpg|jpeg|png|gif|svg|webp|woff2?)$/) ||
           event.request.url.includes('fonts.googleapis') ||
           event.request.url.includes('fonts.gstatic'))
        ) {
          var responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      }).catch(function () {
        // Offline fallback for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});

(function() {
    // ── Avatar gradient pool
    const GRAD = [
      'linear-gradient(135deg,#5b8dee,#7c5fe8)',
      'linear-gradient(135deg,#E1306C,#833ab4)',
      'linear-gradient(135deg,#10b981,#0ea5e9)',
      'linear-gradient(135deg,#f59e0b,#ef4444)',
      'linear-gradient(135deg,#a78bfa,#60a5fa)',
      'linear-gradient(135deg,#34d399,#3b82f6)',
    ];
    let gradIdx = 3;
 
    // ── Default / pinned comment
    let cnComments = [
      {
        id: 0,
        name: 'Lucky Ubaidillah',
        admin: true,
        pinned: true,
        time: 'Apr 20, 2026',
        msg: 'Thank you for visiting! If you have any questions, feel free to DM me on IG @onlyluxky',
        photo: null,
        initials: 'LU',
        grad: 0
      }
    ];
 
    // ── Load saved from localStorage
    try {
      const saved = JSON.parse(localStorage.getItem('lu_guestbook') || '[]');
      cnComments = [cnComments[0], ...saved];
    } catch(e) {}
 
    let uploadedPhoto = null;
 
    // ── Render
    function render() {
      const list  = document.getElementById('cnCommentsList');
      const count = document.getElementById('cnCommentCount');
      if(!list || !count) return;
 
      count.textContent = cnComments.length;
 
      const sorted = [...cnComments].sort((a,b)=>{
        if(a.pinned&&!b.pinned) return -1;
        if(!a.pinned&&b.pinned) return 1;
        return b.id - a.id;
      });
 
      list.innerHTML = sorted.map(c=>`
        <div class="cn-comment ${c.pinned?'cn-comment--pinned':''}">
         
          <div class="cn-avatar" style="${c.photo?'':'background:'+GRAD[c.grad%GRAD.length]}">
            ${c.photo?`<img src="${c.photo}" alt="${esc(c.name)}" />`:`<span>${esc(c.initials)}</span>`}
          </div>
          <div class="cn-comment-body">
            <div class="cn-comment-meta">
              <strong class="cn-comment-name">${esc(c.name)}</strong>
              ${c.admin?'<span class="cn-admin-tag">Admin</span>':''}
              <span class="cn-comment-time">${c.time}</span>
            </div>
            <p class="cn-comment-text">${esc(c.msg)}</p>
          </div>
        </div>
      `).join('');
    }
 
    function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
 
    // ── Post comment
    window.cnPostComment = function() {
      const nameEl = document.getElementById('cn-cname');
      const msgEl  = document.getElementById('cn-cmessage');
      const name   = nameEl.value.trim();
      const msg    = msgEl.value.trim();
      if(!name){ cnShake(nameEl); return; }
      if(!msg) { cnShake(msgEl);  return; }
 
      const initials = name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2)||'??';
      const newItem = {
        id: Date.now(),
        name, admin: false, pinned: false,
        time: 'just now',
        msg, photo: uploadedPhoto,
        initials, grad: gradIdx++
      };
      cnComments.push(newItem);
 
      // persist (skip pinned)
      try { localStorage.setItem('lu_guestbook', JSON.stringify(cnComments.filter(c=>!c.pinned))); } catch(e){}
 
      nameEl.value = '';
      msgEl.value  = '';
      uploadedPhoto = null;
      document.getElementById('cnPhotoHint').textContent = 'Max file size: 5MB';
 
      render();
      document.getElementById('cnCommentsList').scrollTop = 9999;
      cnToast('Komentar berhasil diposting! 🎉');
    };
 
    // ── Send contact message via WhatsApp
    window.cnSendMessage = function() {
      const name  = document.getElementById('cn-name').value.trim();
      const email = document.getElementById('cn-email').value.trim();
      const msg   = document.getElementById('cn-message').value.trim();
      if(!name||!email||!msg){ cnToast('Harap isi semua field terlebih dahulu!'); return; }
      const text = `Halo Lucky!\n\nNama: ${name}\nEmail: ${email}\n\nPesan:\n${msg}`;
      window.open('https://wa.me/62895402889544?text='+encodeURIComponent(text),'_blank');
      document.getElementById('cn-name').value='';
      document.getElementById('cn-email').value='';
      document.getElementById('cn-message').value='';
      cnToast('Membuka WhatsApp... 🚀');
    };
 
    // ── Photo upload preview
    window.cnPreviewPhoto = function(input) {
      const file = input.files[0]; if(!file) return;
      if(file.size > 5*1024*1024){ cnToast('File terlalu besar! Maks 5MB.'); return; }
      const reader = new FileReader();
      reader.onload = e => {
        uploadedPhoto = e.target.result;
        document.getElementById('cnPhotoHint').innerHTML = `<span style="color:var(--accent)"><i class="fas fa-check"></i> ${file.name}</span>`;
      };
      reader.readAsDataURL(file);
    };
 
    // ── Toast
    function cnToast(msg){
      const t=document.getElementById('cnToast');
      document.getElementById('cnToastMsg').textContent=msg;
      t.classList.add('cn-toast--show');
      setTimeout(()=>t.classList.remove('cn-toast--show'),3000);
    }
 
    // ── Shake invalid field
    function cnShake(el){
      el.style.borderColor='rgba(239,68,68,0.7)';
      el.style.boxShadow='0 0 0 3px rgba(239,68,68,0.15)';
      el.animate([{transform:'translateX(-5px)'},{transform:'translateX(5px)'},{transform:'translateX(-4px)'},{transform:'translateX(4px)'},{transform:'translateX(0)'}],{duration:350,easing:'ease'});
      setTimeout(()=>{ el.style.borderColor=''; el.style.boxShadow=''; },1500);
      el.focus();
    }
 
    // ── Init
    render();
  })();

  
