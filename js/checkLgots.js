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

  for(;i < text.length; ++i) {
    text[i] = text[i].split(";");
    if(text[i].length != 5) continue;
    
    let olymp = text[i][1];
    let profile = text[i][2];
    let minStatus = text[i][3][0];
    let minLevel = Number(text[i][3][1]);
    let prgrs = text[i][4].split(" ");
    let lg = text[i][0];

    if(olymp != "*") {
      for(const list of olympLists) {
        if(OLYMPS[list].hasOwnProperty(olymp) &&
        OLYMPS[list][olymp].hasOwnProperty(profile) &&
        Number(OLYMPS[list][olymp][profile]) <= minLevel) {
          for(const pr of prgrs) {
            if(!programs[pr].lgots.hasOwnProperty(list)) programs[pr].lgots[list] = {};
            if(!programs[pr].lgots[list].hasOwnProperty(olymp+` (${profile})`)) programs[pr].lgots[list][olymp+` (${profile})`] = [];
            programs[pr].lgots[list][olymp+` (${profile})`].push({
              status: minStatus,
              lgota: lg
            });
          }
        }
      } 
    } else {
      for(const list of olympLists) {
        for(const ol in OLYMPS[list]) {
          if(OLYMPS[list][ol].hasOwnProperty(profile) && Number(OLYMPS[list][ol][profile]) <= minLevel) {
            for(const pr of prgrs) {
              if(!programs[pr].lgots.hasOwnProperty(list)) programs[pr].lgots[list] = {};
              if(!programs[pr].lgots[list].hasOwnProperty(ol+` (${profile})`)) programs[pr].lgots[list][ol+` (${profile})`] = [];
              programs[pr].lgots[list][ol+` (${profile})`].push({
                status: minStatus,
                lgota: lg
              });
            }
          }
        }
      }
    } 
  }

  LGOTS[vuz] = programs;
}

console.log(LGOTS);