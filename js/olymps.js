var OLYMPS = {};
var olympLists = [
  "rsosh-24_25.csv"
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

    OLYMPS[l] = now;
  }
}


console.log("Start loading olymps...");
loadOlymps();
console.log("Loaded:");
console.log(OLYMPS);