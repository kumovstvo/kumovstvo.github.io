function loadFile(filePath) {
  let result = null;
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', filePath, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result;
}

const vuzs = ["itmo.csv"];
var LGOTS = {};

for(const vuz of vuzs) {
  let shortName = NaN, longName = NaN, minClass = NaN;
  let text = loadFile("./res/vuz/"+vuz).split("\n");
  
  let i = 0;
  let programs = {};
  for(i = 0; i < text.length; ++i) {
    text[i] = text[i].split(";");
    if(text[i][0] == "#name") {
      shortName = text[i][1];
      longName = text[i][2];
    } else if(text[i][0] == "#lgots") {
      minClass = Number(text[i][1]);
      i++;
      break;
    } else {
      programs[text[i][0]] = {};
      programs[text[i][0]].code = text[i][1];
      programs[text[i][0]].name = text[i][2];
      programs[text[i][0]].ege = text[i][3];
      programs[text[i][0]].lgots = {};
    }
  }

  for(;i < text.length(); ++i) {
    text[i] = text[i].split(";");
    let olymp = text[1];
    let profile = text[2];
    let minStatus = text[3][0];
    let minLevel = Number(text[3][1]);
    let prgrs = text[4].split(" ");
    let lg = text[0];

    if(text[i].length != 5) continue;
    if(text[i][1] != "*") {
      for(let list of olympLists) {
        if(OLYMPS[list].hasOwnProperty(text[i][1]) &&
        OLYMPS[list][text[i][1]].hasOwnProperty(text[i][2]) &&
        Number(OLYMPS[list][text[i][1]][text[i][2]]) >= minLevel) {
          for(let pr of prgrs) {
            if(!programs[pr].lgots.hasOwnProperty(list)) programs[pr].lgots[list] = {};
            if(!programs[pr].lgots[list].hasOwnProperty(olymp+` (${profile})`)) programs[pr].lgots[list] = [];
            programs[pr].lgots[list][olymp+` (${profile})`].push({
              status: minStatus,
              lgota: lg
            });
          }
        }
      }
    }
  }

  console.log(programs);
}