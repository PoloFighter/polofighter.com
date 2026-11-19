let logo = document.getElementById("logo");
let vlajka = document.getElementById("vlajka");
let language = "sk";
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
  window.location.href = "../";
};

const translations = {
  sk: {
    fast: `Mám ${age} rokov, zaujímam sa o grafický dizajn, video editing, VFX, motion grafiku, programovanie stránok, 3D grafiku a vo voľnom čase hranie video hier. Odkedy som začal chodiť na strednú školu na ktorú som dochádzal hlavne autobusom a celkovo verejnou dopravou som sa začal zaujímať o verejnú dopravu a jej fungovanie. Hra cities skylines kde sa stavá celkovo mesto, cesty, dialnice, vlakové kolaje, električky a celkovo verejná doprava, ma do toho dostala najviac, naučil som sa skrz ňu aj základy urbanistického inžnierstva čo sa týka dopravy a ciest.  Grafickému dizajnu sa venujem od roku 2019, kedy som dostal prvý počítač a začínal som robiť pre kamaráta na jeho youtube kanál kde natáčal minecraft videá náhladovky vo photoshope. On robil videá ja som mu robil náhladovky, naučil sa základy pozeral inšpiráciu a hovoril s ostatnými grafikmi na scéne ktorý mi poradili techniky a ako čo funguje. Učil som sa sám a zo zaujímavosti, v tej dobe som sa učil aj v strihacom softvére sony vegas, a začal sa hrať v Cinema 4D s minecraft postavičkami. Takto som sa dostal ku grafike a zistil som že ma baví, že môžem urobiť čokoľvek chcem, čo ma baví.`,
    prg: "Programy ktoré používam: Adobe Photoshop, Adobe Illustrator, Davinci Resolve, Darktable, Adobe After Effects, Adobe Media Encoder, Cinema 4D, Visual Studio Code",
  },
  en: {
    fast: `I am ${age} years old, and I am interested in graphic design, video editing, VFX, motion graphics, programming websites, 3D graphics, and playing video games in my free time. Since I started going to high school, which I mainly commuted to by bus and other forms of public transport, I have also become interested in public transport and how it works. The game cities skylines, where you build a whole city with roads, highways, railway tracks, trams, and public transport, got me especially interested in it. Through the game, I also learned the basics of urban planning, particularly when it comes to transport and roads. I have been doing graphic design since 2019, when I got my first computer and started making thumbnails for my friends's youtube channel, where he made Minecraft videos. He made the videos and I made the thumbnails. I learned the basics, looked for inspiration, and talked to other designers in the cz/sk minecraft community, who shared techniques and explained how things worked. I taught myself, and out of curiosity I also learned to edit videos in Sony Vegas. I started experimenting with Minecraft characters in Cinema 4D, too. That is how I got into graphic design and realised I enjoy it because I can create whatever I want, whatever I feel like making.`,
    prg: "Programs I use: Adobe Photoshop, Adobe Illustrator, Adobe Premier Pro, Adobe After Effects, Adobe Media Encoder, Cinema 4D, Visual Studio Code",
  },
};

function renderLanguage() {
  document.getElementById("fast").textContent = translations[language].fast;
  document.getElementById("prg").textContent = translations[language].prg;
  document.getElementById("uk").style.opacity = language === "en" ? "1" : "0";
  document.getElementById("sk").style.opacity = language === "sk" ? "1" : "0";
}

renderLanguage();

vlajka.onclick = () => {
  language = language === "sk" ? "en" : "sk";
  renderLanguage();
};
