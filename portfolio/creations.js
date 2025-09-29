let logo = document.getElementById("logo");
let uparrow = document.getElementById("uparrow");
let hd = document.getElementById("mischeaders");

document.getElementById("logo").onclick = () => {
  window.location.href = "../";
};

uparrow.onclick = () => {
  hd.scrollIntoView({ behavior: "smooth", block: "start" });
};
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry)
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden ');
hiddenElements.forEach((el) => observer.observe(el));

document.addEventListener('DOMContentLoaded', function() {
  const overlay = document.getElementById('media-fullscreen-overlay');
  function closeOverlay() {
    overlay.style.display = 'none';
    overlay.innerHTML = '';
    document.body.style.overflow = '';
  }
  overlay.addEventListener('click', closeOverlay);

  function showMediaFullscreen(el) {
    overlay.innerHTML = '';
    let clone;
    if (el.tagName.toLowerCase() === 'img') {
      clone = document.createElement('img');
      clone.src = el.src;
      clone.style.maxWidth = '90vw';
      clone.style.maxHeight = '90vh';
      clone.style.boxShadow = '0 0 40px #000';
      clone.style.borderRadius = '10px';
    } else if (el.tagName.toLowerCase() === 'video') {
      clone = document.createElement('video');
      clone.src = el.src;
      clone.controls = true;
      clone.autoplay = true;
      clone.loop = el.loop;
      clone.muted = el.muted;
      clone.style.maxWidth = '90vw';
      clone.style.maxHeight = '90vh';
      clone.style.boxShadow = '0 0 40px #000';
      clone.style.borderRadius = '10px';
    } else {
      return;
    }
    overlay.appendChild(clone);
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  document.querySelectorAll('img, video').forEach(media => {
    if (media.classList.contains('no-fullscreen')) return;
    media.addEventListener('click', function(e) {
      showMediaFullscreen(this);
    });
  });
});

const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
const gradient = document.querySelector('gradient');

if (burger && menu && gradient) {
  // Ensure gradient is hidden initially
  gradient.style.opacity = '0';
  gradient.style.transition = 'opacity 0.5s ease-out';
  gradient.style.pointerEvents = 'none';

  function openMenu() {
    menu.classList.add('menu-active');
    burger.classList.add('burger-active');
    gradient.classList.add('gradient-active');
    gradient.style.opacity = '1';
    gradient.style.pointerEvents = 'auto';
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
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