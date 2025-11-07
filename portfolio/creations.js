const logo = document.getElementById('logo');
if (logo) {
  logo.addEventListener('click', () => {
    window.location.href = '../';
  });
}

const uparrow = document.getElementById('uparrow');
const hd = document.getElementById('mischeaders');
if (uparrow && hd) {
  uparrow.addEventListener('click', () => {
    hd.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

function initFullscreenGallery() {
  const overlay = document.getElementById('media-fullscreen-overlay');
  if (!overlay) return; // nothing to do if overlay element is missing

  // Build gallery from all images/videos that allow fullscreen
  function mediaHasSource(m) {
    const tag = m.tagName && m.tagName.toLowerCase();
    if (m.classList && m.classList.contains('no-fullscreen')) return false;
    if (tag === 'img') {
      const srcAttr = m.getAttribute('src');
      return !!srcAttr && srcAttr.trim() !== '';
    }
    if (tag === 'video') {
      const src = m.currentSrc || m.getAttribute('src') || (m.querySelector && m.querySelector('source') && m.querySelector('source').getAttribute('src'));
      return !!src && String(src).trim() !== '';
    }
    return false;
  }

  let gallery = Array.from(document.querySelectorAll('img, video')).filter(mediaHasSource);
  let currentIndex = -1;

  function closeOverlay() {
    overlay.style.display = 'none';
    overlay.innerHTML = '';
    currentIndex = -1;
    document.body.style.overflow = '';
  }
  overlay.addEventListener('click', closeOverlay);

  function createCloneFromMedia(el, direction) {
    const tag = el.tagName.toLowerCase();
    let clone;
    if (tag === 'img') {
      clone = document.createElement('img');
      clone.src = el.src || (el.querySelector && el.querySelector('source') && el.querySelector('source').src) || '';
      clone.alt = el.alt || '';
      clone.style.maxWidth = '90vw';
      clone.style.maxHeight = '90vh';
      clone.style.boxShadow = '0 0 40px #000';
      clone.style.borderRadius = '10px';
      clone.style.zIndex = '2';
    } else if (tag === 'video') {
      clone = document.createElement('video');
      clone.src = el.currentSrc || el.src || (el.querySelector && el.querySelector('source') && el.querySelector('source').src) || '';
      clone.controls = true;
      clone.autoplay = true;
      clone.loop = el.loop;
      clone.muted = el.muted;
      clone.style.maxWidth = '90vw';
      clone.style.maxHeight = '90vh';
      clone.style.boxShadow = '0 0 40px #000';
      clone.style.borderRadius = '10px';
      clone.style.zIndex = '2';
    }
    if (clone) {
      // prevent clicks on the media from bubbling to overlay (which would close it)
      clone.addEventListener('click', (ev) => ev.stopPropagation());
      // apply chosen animation class
      if (animationMode === 'fade') {
        clone.classList.add('anim-fade');
      } else if (animationMode === 'zoom') {
        clone.classList.add('anim-zoom');
      } else if (animationMode === 'slide') {
        if (direction === 'prev') clone.classList.add('anim-slide-left');
        else clone.classList.add('anim-slide-right');
      }
    }
    return clone;
  }

  function showMediaAtIndex(index) {
    if (!gallery || gallery.length === 0) return;
    if (index < 0) index = 0;
    if (index >= gallery.length) index = gallery.length - 1;
    currentIndex = index;
    overlay.innerHTML = '';

  // re-add UI controls (animation buttons) if needed
  ensureAnimationControls();
  // ensure pagination dots exist and are up-to-date
  ensureDots();

    // left/right clickable zones (helpful on touch)
    const leftZone = document.createElement('div');
    leftZone.style.position = 'absolute';
    leftZone.style.left = '0';
    leftZone.style.top = '0';
    leftZone.style.width = '35%';
    leftZone.style.height = '100%';
    leftZone.style.cursor = 'pointer';
    leftZone.style.zIndex = '1';
    leftZone.addEventListener('click', (e) => { e.stopPropagation(); prevMedia(); });

    const rightZone = document.createElement('div');
    rightZone.style.position = 'absolute';
    rightZone.style.right = '0';
    rightZone.style.top = '0';
    rightZone.style.width = '35%';
    rightZone.style.height = '100%';
    rightZone.style.cursor = 'pointer';
    rightZone.style.zIndex = '1';
    rightZone.addEventListener('click', (e) => { e.stopPropagation(); nextMedia(); });

    overlay.appendChild(leftZone);
    overlay.appendChild(rightZone);

    // visible arrow buttons (allow image icons via data attributes on overlay)
    const prevBtn = document.createElement('button');
    prevBtn.className = 'overlay-arrow overlay-arrow-left';
    prevBtn.type = 'button';
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevMedia(); });
    const nextBtn = document.createElement('button');
    nextBtn.className = 'overlay-arrow overlay-arrow-right';
    nextBtn.type = 'button';
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextMedia(); });

    // if overlay contains data attributes for arrow images, use them
    const leftImgSrc = overlay.dataset && overlay.dataset.arrowLeft ? overlay.dataset.arrowLeft : null;
    const rightImgSrc = overlay.dataset && overlay.dataset.arrowRight ? overlay.dataset.arrowRight : null;
    if (leftImgSrc) {
      const img = document.createElement('img');
      img.src = leftImgSrc;
      img.alt = 'Previous';
      img.className = 'overlay-arrow-img overlay-arrow-img-left';
      prevBtn.appendChild(img);
    } else {
      prevBtn.innerHTML = '&#x2039;';
    }
    if (rightImgSrc) {
      const img = document.createElement('img');
      img.src = rightImgSrc;
      img.alt = 'Next';
      img.className = 'overlay-arrow-img overlay-arrow-img-right';
      nextBtn.appendChild(img);
    } else {
      nextBtn.innerHTML = '&#x203A;';
    }

    overlay.appendChild(prevBtn);
    overlay.appendChild(nextBtn);

  // close button (top-right)
  const closeBtn = document.createElement('button');
  closeBtn.className = 'overlay-close';
  closeBtn.type = 'button';
  closeBtn.title = 'Close';
  closeBtn.innerHTML = '\u00D7'; // ×
  closeBtn.addEventListener('click', (e) => { e.stopPropagation(); closeOverlay(); });
  overlay.appendChild(closeBtn);

    // counter (e.g. "3 / 24")
    let counter = document.getElementById('overlay-counter');
    if (!counter) {
      counter = document.createElement('div');
      counter.id = 'overlay-counter';
      counter.style.position = 'fixed';
      counter.style.top = '12px';
      counter.style.left = '50%';
      counter.style.transform = 'translateX(-50%)';
      counter.style.zIndex = '10002';
      counter.style.color = '#fff';
      counter.style.fontFamily = 'Montserrat, sans-serif';
      counter.style.fontSize = '14px';
      counter.style.padding = '6px 10px';
      counter.style.borderRadius = '6px';
      counter.style.background = 'rgba(0,0,0,0.32)';
      overlay.appendChild(counter);
    }

    const sourceEl = gallery[currentIndex];
    const clone = createCloneFromMedia(sourceEl, lastDirection);
    if (clone) overlay.appendChild(clone);
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // update counter text
    if (counter) counter.textContent = `${currentIndex + 1} / ${gallery.length}`;

    // update active dot state
    const dots = document.querySelectorAll('#overlay-dots .overlay-dot');
    if (dots && dots.length) {
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === currentIndex);
        d.setAttribute('aria-current', i === currentIndex ? 'true' : 'false');
      });
    }

    // On mobile, ensure the active dot is visible (when it goes offscreen)
    // call the helper that checks and adjusts the scroll position.
    ensureActiveDotVisibleMobile();

    // center active dot after layout stabilizes and media has loaded to avoid jumps
    function centerActiveDotAttempt(attemptsLeft = 5) {
      const active = document.querySelector('#overlay-dots .overlay-dot.active');
      const inner = document.querySelector('#overlay-dots .overlay-dots-inner');
      if (!active || !inner) return;
      // if inner width is 0 it may not be rendered yet; try again shortly
      if (inner.clientWidth === 0 && attemptsLeft > 0) {
        requestAnimationFrame(() => centerActiveDotAttempt(attemptsLeft - 1));
        return;
      }
      const left = active.offsetLeft;
      const target = Math.max(0, Math.round(left - (inner.clientWidth / 2) + (active.clientWidth / 2)));
      inner.scrollLeft = target;
    }

    // If the cloned media is an image/video, wait for it to load metadata/content
    if (clone && clone.tagName) {
      const tag = clone.tagName.toLowerCase();
      if (tag === 'img') {
        if (clone.complete) {
          centerActiveDotAttempt();
        } else {
          clone.addEventListener('load', () => centerActiveDotAttempt());
          // also guard with a timeout in case load doesn't fire
          setTimeout(() => centerActiveDotAttempt(), 120);
        }
      } else if (tag === 'video') {
        // wait for metadata (dimensions) or short timeout
        if (clone.readyState >= 1) {
          centerActiveDotAttempt();
        } else {
          clone.addEventListener('loadedmetadata', () => centerActiveDotAttempt());
          setTimeout(() => centerActiveDotAttempt(), 120);
        }
      } else {
        // fallback
        requestAnimationFrame(() => centerActiveDotAttempt());
      }
    } else {
      // no clone (edge case) — still attempt centering
      requestAnimationFrame(() => centerActiveDotAttempt());
    }
  }

  // animation mode: 'fade' | 'slide' | 'zoom' | 'none'
  // default to 'slide' so media slides animate when navigating the gallery.
  // Dots and UI stay non-animated per user's preference.
  let animationMode = 'slide';
  // direction used for slide animation: 'next' or 'prev'
  let lastDirection = 'next';

  // create small controls inside overlay to choose animation
  function ensureAnimationControls() {
    if (document.getElementById('overlay-animation-controls')) return;
    const controls = document.createElement('div');
    controls.id = 'overlay-animation-controls';
    controls.style.position = 'fixed';
    controls.style.top = '12px';
    controls.style.right = '12px';
    controls.style.zIndex = '10001';
  // create hidden controls (not visible by default). They remain in DOM
  // so they can be shown later if needed (e.g., toggle or debug).
  controls.style.display = 'none';
    controls.style.gap = '6px';

    ['fade', 'slide', 'zoom', 'none'].forEach(mode => {
      const btn = document.createElement('button');
      btn.textContent = mode;
      btn.dataset.mode = mode;
      btn.style.padding = '6px 8px';
      btn.style.borderRadius = '6px';
      btn.style.border = 'none';
      btn.style.cursor = 'pointer';
      btn.style.background = mode === animationMode ? '#fff' : 'rgba(255,255,255,0.12)';
      btn.style.color = mode === animationMode ? '#000' : '#fff';
      btn.addEventListener('click', (e) => {
        animationMode = mode;
        // update button styles
        Array.from(controls.children).forEach(c => {
          c.style.background = c.dataset.mode === mode ? '#fff' : 'rgba(255,255,255,0.12)';
          c.style.color = c.dataset.mode === mode ? '#000' : '#fff';
        });
      });
      controls.appendChild(btn);
    });

    overlay.appendChild(controls);
  }

  // pagination dots (creates #overlay-dots with inner scrollable row)
  function ensureDots() {
    let container = document.getElementById('overlay-dots');
    if (!container) {
      container = document.createElement('div');
      container.id = 'overlay-dots';
      container.className = 'overlay-dots';
      // positioning handled by CSS, but set sensible defaults
      container.style.position = 'fixed';
      container.style.bottom = '18px';
      container.style.left = '50%';
      container.style.transform = 'translateX(-50%)';
      container.style.zIndex = '10004';
      const inner = document.createElement('div');
      inner.className = 'overlay-dots-inner';
      container.appendChild(inner);
      overlay.appendChild(container);
    }

    const inner = container.querySelector('.overlay-dots-inner');
    if (!inner) return;
    inner.innerHTML = '';
    for (let i = 0; i < gallery.length; i++) {
      const dot = document.createElement('button');
      dot.className = 'overlay-dot';
      dot.type = 'button';
      dot.setAttribute('aria-label', `Go to item ${i + 1}`);
      dot.dataset.index = String(i);
      if (i === currentIndex) {
        dot.classList.add('active');
        dot.setAttribute('aria-current', 'true');
      }
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = Number(e.currentTarget.dataset.index);
        showMediaAtIndex(idx);
      });
      inner.appendChild(dot);
    }
  }

  // Ensure the active dot is visible on small screens (mobile only).
  // If the active dot is partially or fully offscreen inside the scrollable
  // dots inner container, adjust scrollLeft so it becomes visible. Instant (no smooth).
  function ensureActiveDotVisibleMobile() {
    try {
      if (!window.matchMedia) return; // defensive
      if (!window.matchMedia('(max-width: 600px)').matches) return; // only on mobile
      const inner = document.querySelector('#overlay-dots .overlay-dots-inner');
      const active = document.querySelector('#overlay-dots .overlay-dot.active');
      if (!inner || !active) return;
      const innerRect = inner.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      // If active left is left of inner viewport
      if (activeRect.left < innerRect.left) {
        // scroll so active is visible with small padding
        const offset = active.offsetLeft - 12;
        inner.scrollLeft = Math.max(0, offset);
      } else if (activeRect.right > innerRect.right) {
        // active extends beyond right edge
        const offset = active.offsetLeft - (inner.clientWidth - active.clientWidth) + 12;
        inner.scrollLeft = Math.max(0, offset);
      }
    } catch (err) {
      // ignore errors — non-critical
    }
  }

  function showMediaFullscreen(el) {
    // refresh gallery in case DOM changed
    gallery = Array.from(document.querySelectorAll('img, video')).filter(mediaHasSource);
    const idx = gallery.indexOf(el);
    if (idx === -1) {
      // fallback: try to match by src
      const src = el.currentSrc || el.src || (el.querySelector && el.querySelector('source') && el.querySelector('source').src) || '';
      const found = gallery.findIndex(m => (m.currentSrc || m.src || (m.querySelector && m.querySelector('source') && m.querySelector('source').src)) === src);
      if (found !== -1) {
        showMediaAtIndex(found);
      }
      return;
    }
    showMediaAtIndex(idx);
  }

  function nextMedia() {
    if (!gallery || gallery.length === 0) return;
    lastDirection = 'next';
    showMediaAtIndex((currentIndex + 1) % gallery.length);
  }

  function prevMedia() {
    if (!gallery || gallery.length === 0) return;
    lastDirection = 'prev';
    showMediaAtIndex((currentIndex - 1 + gallery.length) % gallery.length);
  }

  // attach click handlers to all media
  document.querySelectorAll('img, video').forEach(media => {
    if (!mediaHasSource(media)) return;
    media.addEventListener('click', function(e) {
      showMediaFullscreen(this);
    });
  });

  // ensure animation controls are present when overlay is first used
  ensureAnimationControls();

  // keyboard navigation while overlay is open
  document.addEventListener('keydown', function(e) {
    if (overlay.style.display !== 'flex') return;
    if (e.key === 'Escape') { closeOverlay(); return; }
    if (e.key === 'ArrowRight') { e.preventDefault(); nextMedia(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prevMedia(); }
  });

  // Enable swipe gestures on the overlay for mobile: left swipe = next, right swipe = prev
  // Ignore swipes that start on UI controls (arrows, close button, dots) so touches on controls still work.
  (function enableSwipeGestures() {
    if (!overlay) return;
    let startX = null;
    let startY = null;
    let startTime = 0;

    function isInUI(target) {
      try {
        return !!(target && (target.closest('.overlay-arrow') || target.closest('.overlay-close') || target.closest('.overlay-dot') || target.closest('#overlay-dots')));
      } catch (e) {
        return false;
      }
    }

    overlay.addEventListener('touchstart', function (e) {
      if (!window.matchMedia || !window.matchMedia('(max-width: 600px)').matches) return;
      const t = e.touches && e.touches[0];
      if (!t) return;
      if (isInUI(e.target)) return; // don't start gesture when touching controls
      startX = t.clientX;
      startY = t.clientY;
      startTime = Date.now();
    }, { passive: true });

    overlay.addEventListener('touchmove', function (e) {
      // nothing to do here for now; we keep passive to avoid blocking scroll elsewhere
    }, { passive: true });

    overlay.addEventListener('touchend', function (e) {
      if (startX === null) return;
      const t = (e.changedTouches && e.changedTouches[0]) || null;
      const endX = t ? t.clientX : startX;
      const endY = t ? t.clientY : startY;
      const dx = endX - startX;
      const dy = endY - startY;
      const dt = Date.now() - startTime;
      // require a mostly-horizontal swipe, sufficient distance, and reasonable time
      const minDistance = 40; // px
      const maxVerticalDiff = 75; // px
      if (Math.abs(dx) > minDistance && Math.abs(dx) > Math.abs(dy) && Math.abs(dy) < maxVerticalDiff) {
        if (dx < 0) {
          // left swipe -> next
          nextMedia();
        } else {
          // right swipe -> prev
          prevMedia();
        }
      }
      startX = null;
      startY = null;
      startTime = 0;
    }, { passive: true });
  })();
}

// Initialize now if DOM is ready, otherwise wait for DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFullscreenGallery);
} else {
  initFullscreenGallery();
}

const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
const gradient = document.querySelector('.gradient') || document.getElementById('gradient') || document.querySelector('gradient');

// When opening the menu we want the items to animate in a staggered fashion briefly,
// then after a short wait disable those per-item delays so subsequent interactions
// aren't delayed. We manage that by adding/removing the `menu-opened` class.
let menuOpenedTimeoutId = null;
const MENU_OPENED_DELAY = 160; // ms to wait before disabling staggered delays

if (burger && menu && gradient) {
  // Ensure gradient is hidden initially
  gradient.style.opacity = '0';
  gradient.style.transition = 'opacity 0.5s ease-out';
  gradient.style.pointerEvents = 'none';

  function openMenu() {
    // ensure any previous opened flag/timeout is cleared so we re-run the stagger
    if (menuOpenedTimeoutId) {
      clearTimeout(menuOpenedTimeoutId);
      menuOpenedTimeoutId = null;
    }
    menu.classList.remove('menu-opened');
    menu.classList.add('menu-active');
    burger.classList.add('burger-active');
    gradient.classList.add('gradient-active');
    gradient.style.opacity = '1';
    gradient.style.pointerEvents = 'auto';
    document.body.style.overflow = 'hidden';

    // after a short wait, disable the per-item stagger delays by adding .menu-opened
    menuOpenedTimeoutId = setTimeout(() => {
      menu.classList.add('menu-opened');
      menuOpenedTimeoutId = null;
    }, MENU_OPENED_DELAY);
  }

  function closeMenu() {
    // If we're closing, cancel the pending timeout and remove the opened flag so
    // the closing animation uses the stagger delays.
    if (menuOpenedTimeoutId) {
      clearTimeout(menuOpenedTimeoutId);
      menuOpenedTimeoutId = null;
    }
    menu.classList.remove('menu-opened');
    menu.classList.remove('menu-active');
    burger.classList.remove('burger-active');
    gradient.style.opacity = '0';
    gradient.style.pointerEvents = 'none';
    document.body.style.overflow = '';
    // Remove gradient-active after fade out
    setTimeout(() => {
      gradient.classList.remove('gradient-active');
    }, 500);
  }

  burger.addEventListener('click', function() {
    if (menu.classList.contains('menu-active')) {
      closeMenu();
      
    } else {
      openMenu();
    }
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      closeMenu();
    });
  });
}