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
  burger.addEventListener('click', function() {
    menu.classList.toggle('menu-active');
    burger.classList.toggle('burger-active');
    gradient.classList.toggle('gradient-active');
    gradient.style.opacity = '1';
    gradient.style.transition = 'opacity 0.5s ease-out';
    if (menu.classList.contains('menu-active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      gradient.style.opacity = '0';
    }
  });
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      menu.classList.remove('menu-active');
      burger.classList.remove('burger-active');
      gradient.style.opacity = '0';
      gradient.style.transition = 'opacity 0.5s ease-out';
      document.body.style.overflow = '';
    });
  });
}