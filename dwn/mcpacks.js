document.getElementById("downloadbutton").onclick = () => {
  const a = document.createElement('a');
  a.href = "../../res/packs/§cCoroPvP §aRevamp.zip";
  a.download = "CoroPvP Revamp.zip";
  a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

document.getElementById("polofighter").onclick = () => {
  const a = document.createElement('a');
  a.href = "../res/designmanuals/polofighter.pdf";
  a.download = "polofighter.pdf";
  a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
