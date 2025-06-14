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