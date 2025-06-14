let logo = document.getElementById("logo");
let vlajka = document.getElementById("vlajka");
let jazyk = false;
const d = new Date();
const birthDate = new Date(2007, 8, 18); // September 18, 2007
let age = d.getFullYear() - birthDate.getFullYear();
if (
  d.getMonth() < birthDate.getMonth() ||
  (d.getMonth() == birthDate.getMonth() && d.getDate() < birthDate.getDate())
) {
  age--;
}
logo.onclick = () => {
  window.location.href = "/";
};

window.onload = () => {
  document.getElementById("fast").innerHTML =
    "Mám " +
    age +
    " rokov, zaujímam sa o grafický dizajn, video editing, VFX, motion grafiku, programovanie stránok a hranie video hier. Grafickému dizajnu sa venujem od roku 2019";
};

vlajka.onclick = () => {
  if (jazyk) {
    document.getElementById("fast").innerHTML =
      "Mám " +
      age +
      " rokov, zaujímam sa o grafický dizajn, video editing, VFX, motion grafiku, programovanie stránok a hranie video hier. Grafickému dizajnu sa venujem od roku 2019";
    document.getElementById("prg").innerHTML =
      "Programy ktoré používam: Adobe Photoshop, Adobe Illustrator, Adobe Premier Pro, Adobe After Effects, Adobe Media Encoder, Cinema 4D, Visual Studio Code";
    0;
    document.getElementById("uk").style = "opacity: 0;";
    document.getElementById("sk").style = "opacity: 1;";
    jazyk = false;
  } else {
    document.getElementById("fast").innerHTML =
      "I am " +
      age +
      " years old, I am interested in graphic design, video editing, VFX, motion graphics, programming websites and playing video games. I have been doing Graphic design since 2019";
    document.getElementById("prg").innerHTML =
      "Programs I use: Adobe Photoshop, Adobe Illustrator, Adobe Premier Pro, Adobe After Effects, Adobe Media Encoder, Cinema 4D, Visual Studio Code";
    document.getElementById("uk").style = "opacity: 1;";
    document.getElementById("sk").style = "opacity: 0;";
    jazyk = true;
  }
};
