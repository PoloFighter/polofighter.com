let btn1 = document.getElementById("hbut1");
let btn2 = document.getElementById("hbut2");
let btn3 = document.getElementById("hbut3");
let btn4 = document.getElementById("hbut4");
const logo = document.getElementById("logo");
let dark = false;
const mname = document.getElementById("name");
let bg = document.getElementsByClassName("bg");
let bcp = document.getElementsByClassName("backupbg");

mname.onclick = () => {
  navigator.clipboard.writeText("PoloFighter").then(() => {
    alert("Copied Text to Clipboard: PoloFighter");
  });
};
logo.onclick = () => {
  if (dark) {
    document.getElementById("bg").style = "filter: grayscale(0) brightness(1);";
    document.getElementById("logo").setAttribute("src", "res/images/Moon.svg");
    document.getElementById("logo").style.setProperty = "margin-right: 0px;";
    document.getElementById("backupbg").style =
      "background-image: linear-gradient(45deg,#fc3c61,#2d0f3d);";
    dark = false;
  } else {
    document.getElementById("bg").style =
      "filter: grayscale(1) brightness(0.3);";
    document.getElementById("logo").setAttribute("src", "res/images/light.svg");
    document.getElementById("backupbg").style =
      "background-image: linear-gradient(45deg,#57000d,#2d0f3d);";
    dark = true;
  }
};
