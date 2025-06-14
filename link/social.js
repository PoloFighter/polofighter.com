let bg = document.getElementsByClassName("bg");
let yt = document.getElementById("yt");
let ig = document.getElementById("ig");
let dc = document.getElementById("dc");
let ppl = document.getElementById("pp");
let mail = document.getElementById("ml");
let mailcopy = document.getElementById("mlc");
let mailadress = "polofightergfx@gmail.com";
let dcn = "PoloFighter#3839";
let logo = document.getElementById("logo");
let ttv = document.getElementById("ttv");

logo.onclick = () => {
  window.location.href = "../";
};
document.getElementById("socbg").playbackRate = 5;

yt.onclick = () => {
  window.open("https://youtube.com/PoloFighter");
};
ig.onclick = () => {
  window.open("https://instagram.com/PoloFighterGFX");
};
dc.onclick = () => {
  navigator.clipboard.writeText(dcn).then(() => {
    alert("Copied Text to Clipboard: " + dcn);
  });
};
ppl.onclick = () => {
  window.open("https://paypal.me/PoloFighterGFX");
};
mail.onclick = () => {
  window.location.href = "mailto:" + mailadress;
};

ttv.onclick = () => {
  window.open("https://twitch.tv/PoloFighterLmao");
};
mailcopy.onclick = () => {
  navigator.clipboard.writeText(mailadress).then(() => {
    alert("Copied Text to Clipboard: " + mailadress);
  });
};
