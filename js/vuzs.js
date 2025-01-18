var vuzLists = [
  "mephi.csv"
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

function parseVUZPrograms(programs, text) {
  text = text.split(' ');

  let res = new Set();
  for(const pr of text) {
    console.log(pr);
    if(pr[0] == '+') {
      for(let prg in programs) {
        if(programs[prg].code.includes(pr.slice(1))) {
          res.add(prg);
        }
      }
    } else if(pr == '*') {
      for(let prg in programs) {
        res.add(prg);
      }
    } else if(pr[0] == '-') {
      for(let prg in programs) {
        if(programs[prg].code.includes(pr.slice(1))) {
          res.clear(prg);
        }
      }
    } else if(pr[0] == '#') {
      for(let prg in programs) {
        if(programs[prg].ege.includes(pr.slice(1))) {
          res.add(prg);
        }
      }
    } else {
      res.add(pr);
    }
  }

  return Array.from(res);
}

function parseOlymp(olymps, olymp, profile, minLevel) {
  minLevel = Number(minLevel);

  let res = new Set()
  if(olymp == "*") {
    for(const l of olympLists) {
      for(const ol in olymps[l]) {
        if(olymps[l][ol].hasOwnProperty(profile) && minLevel >= olymps[l][ol][profile]) {
          res.add([l, `${ol}_${profile}`]);
        }
      }
    }
  } else {
    for(const l of olympLists) {
      if(olymps[l].hasOwnProperty(olymp) && olymps[l][olymp].hasOwnProperty(profile) && minLevel >= olymps[l][olymp][profile]) {
        res.add([l, `${olymp}_${profile}`]);
      }
    }
  }

  return Array.from(res);
}

function loadVuzs() {
  let vuzs = {};
  for(const l of vuzLists) {
    let text = getFileText("./res/vuzs/"+l).split('\n');

    let i = 0;
    let shortName = "", longName = "", comment = "", ege = "---", minClassBVI = NaN, minClass100 = NaN;
    let programs = {};
    for(; i < text.length; ++i) {
      text[i] = text[i].split(';');
      if(text[i][0] == "#info") {
        shortName = text[i][1];
        longName = text[i][2];
        comment = text[i][3];
        ege = text[i][4];
        minClassBVI = Number(text[i][5]);
        minClass100 = Number(text[i][6]);
      } else if(text[i][0] == "#lgots") {
        ++i; break;
      } else {
        programs[text[i][0]] = {};
        programs[text[i][0]].code = text[i][1].split(", ");
        programs[text[i][0]].name = text[i][2];
        programs[text[i][0]].ege = text[i][3];
        programs[text[i][0]].lgots = {};
      }
    }

    for(; i < text.length; ++i) {
      text[i] = text[i].split(';');
      if(text[i].length != 6) continue;

      let minStatus = text[i][3][0];
      let lgota = text[i][0];
      let predmet = text[i][5];

      let progs = parseVUZPrograms(programs, text[i][4]);
      let olymps = parseOlymp(OLYMPS, text[i][1], text[i][2], Number(text[i][3][1]));

      for(const program of progs) {
        for(const olymp of olymps) {
          programs[program].lgots[olymp[0]][ol].push({
            status: minStatus,
            lgota: lgota,
            predmet: predmet
          });
        }
      }
    }
    vuzs[l] = {
      name: shortName,
      fullName: longName,
      comment: comment,
      minClass100: minClass100,
      minClassBVI: minClassBVI,
      avgEge: ege,
      programs: programs
    };
  }

  return vuzs;
}

var VUZS = loadVuzs();
console.log(VUZS);