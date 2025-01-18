var olympLists = [
  "rsosh-24_25.csv",
  "rsosh-23_24.csv",
  "rsosh-22_23.csv",
  "rsosh-21_22.csv",
  "rsosh-20_21.csv",
  "vsosh.csv"
];

function getFileText(filePath) {
  let result = null;
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', filePath, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result;
}

function loadOlymps() {
  let olymps = {};
  for(const l of olympLists) {
    let text = getFileText("./res/olymps/"+l).split('\n');

    let now = {};
    for(let i = 0; i < text.length; ++i) {
      text[i] = text[i].split(';');
      if(!now.hasOwnProperty(text[i][0])) {
        now[text[i][0]] = {};
      }
      now[text[i][0]][text[i][1]] = text[i][2];
    }

    olymps[l] = now;
  }
  return olymps;
}

console.log("Start loading olymps...");
var OLYMPS = loadOlymps();
console.log("Loaded:");
console.log(OLYMPS);