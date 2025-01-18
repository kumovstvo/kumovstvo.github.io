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

const vuzs = ["mephi.csv"];
var LGOTS = {};

for(const vuz of vuzs) {
  let shortName = NaN, longName = NaN, minClass = NaN;
  let text = loadFile("./res/vuzs/"+vuz).split("\n");
  
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
    if(text[i].length != 6) continue;
    
    let olymp = text[i][1];
    let profile = text[i][2];
    let minStatus = text[i][3][0];
    let minLevel = Number(text[i][3][1]);
    let prgrs = text[i][4].split(" ");
    let lg = text[i][0];
    let predmet = text[i][5];

    if(olymp != "*") {
      for(const list of olympLists) {
        if(OLYMPS[list].hasOwnProperty(olymp) &&
        OLYMPS[list][olymp].hasOwnProperty(profile) &&
        Number(OLYMPS[list][olymp][profile]) <= minLevel) {
          for(const pr of prgrs) {
            if(pr[0] == '-') {
              for(let _pg in programs) {
                let zVz = programs[_pg].code.split(", ");
                if(zVz.includes(pr.slice(1))) {
                  for(const jj in programs[_pg].lgots[list][olymp+` (${profile})`]) {
                    if(programs[_pg].lgots[list][olymp+` (${profile})`][jj].lgota == lg) {
                      programs[_pg].lgots[list][olymp+` (${profile})`].splice(jj,1);
                      break;
                    }
                  }
                }
              }
            } else if(pr[0] == '+') {
              for(let _pg in programs) {
                let zVz = programs[_pg].code.split(", ");
                if(zVz.includes(pr.slice(1))) {
                  if(!programs[_pg].lgots.hasOwnProperty(list)) programs[_pg].lgots[list] = {};
                  if(!programs[_pg].lgots[list].hasOwnProperty(olymp+` (${profile})`)) programs[_pg].lgots[list][olymp+` (${profile})`] = [];
                  programs[_pg].lgots[list][olymp+` (${profile})`].push({
                    status: minStatus,
                    lgota: lg,
                    predmet:predmet
                  });
                }
              }
            } else if(pr[0] == '#') {
              for(let _pg in programs) {
                if(!programs[_pg].lgots.hasOwnProperty(list)) programs[_pg].lgots[list] = {};
                if(!programs[_pg].lgots[list].hasOwnProperty(olymp+` (${profile})`)) programs[_pg].lgots[list][olymp+` (${profile})`] = [];
                if(String(programs[_pg].ege).includes(pr[1])) {
                  programs[_pg].lgots[list][olymp+` (${profile})`].push({
                    status: minStatus,
                    lgota: lg,
                    predmet:predmet
                  });
                }
              }
            } else if(pr == "*") {
              for(let _pg in programs) {
                if(!programs[_pg].lgots.hasOwnProperty(list)) programs[_pg].lgots[list] = {};
                if(!programs[_pg].lgots[list].hasOwnProperty(olymp+` (${profile})`)) programs[_pg].lgots[list][olymp+` (${profile})`] = [];
                programs[_pg].lgots[list][olymp+` (${profile})`].push({
                  status: minStatus,
                  lgota: lg,
                  predmet:predmet
                });
              }
            } else {
              console.log(pr)
              if(!programs[pr].lgots.hasOwnProperty(list)) programs[pr].lgots[list] = {};
              if(!programs[pr].lgots[list].hasOwnProperty(olymp+` (${profile})`)) programs[pr].lgots[list][olymp+` (${profile})`] = [];
              programs[pr].lgots[list][olymp+` (${profile})`].push({
                status: minStatus,
                lgota: lg,
                predmet:predmet
              });
            }
          }
        }
      } 
    } else {
      for(const list of olympLists) {
        for(const ol in OLYMPS[list]) {
          if(OLYMPS[list][ol].hasOwnProperty(profile) && Number(OLYMPS[list][ol][profile]) <= minLevel) {
            for(const pr of prgrs) {
              if(pr[0] == '*') {
                for(let _pg in programs) {
                  if(!programs[_pg].lgots.hasOwnProperty(list)) programs[_pg].lgots[list] = {};
                  if(!programs[_pg].lgots[list].hasOwnProperty(ol+` (${profile})`)) programs[_pg].lgots[list][ol+` (${profile})`] = [];
                  programs[_pg].lgots[list][ol+` (${profile})`].push({
                    status: minStatus,
                    lgota: lg,
                    predmet:predmet
                  });
                }
              } else if(pr[0] == '-') {
                for(let _pg in programs) {
                  let zVz = programs[_pg].code.split(", ");
                  if(zVz.includes(pr.slice(1))) {
                    if(!programs[_pg].lgots.hasOwnProperty(list)) programs[_pg].lgots[list] = {};
                    if(!programs[_pg].lgots[list].hasOwnProperty(ol+` (${profile})`)) programs[_pg].lgots[list][ol+` (${profile})`] = [];
                    for(const jj in programs[_pg].lgots[list][ol+` (${profile})`]) {
                      if(programs[_pg].lgots[list][ol+` (${profile})`][jj].lgota == lg) {
                        programs[_pg].lgots[list][ol+` (${profile})`].splice(jj,1);
                        break;
                      }
                    }
                  }
                }
              } else if(pr[0] == '#') {
                for(let _pg in programs) {
                  if(String(programs[_pg].ege).includes(pr[1])) {
                    if(!programs[_pg].lgots.hasOwnProperty(list)) programs[_pg].lgots[list] = {};
                    if(!programs[_pg].lgots[list].hasOwnProperty(ol+` (${profile})`)) programs[_pg].lgots[list][ol+` (${profile})`] = [];
                    programs[_pg].lgots[list][ol+` (${profile})`].push({
                      status: minStatus,
                      lgota: lg,
                      predmet:predmet
                    });
                  }
                }
              } else if(pr[0] == '+') {
                for(let _pg in programs) {
                  let zVz = programs[_pg].code.split(", ");
                  if(zVz.includes(pr.slice(1))) {
                    if(!programs[_pg].lgots.hasOwnProperty(list)) programs[_pg].lgots[list] = {};
                    if(!programs[_pg].lgots[list].hasOwnProperty(ol+` (${profile})`)) programs[_pg].lgots[list][ol+` (${profile})`] = [];
                    programs[_pg].lgots[list][ol+` (${profile})`].push({
                      status: minStatus,
                      lgota: lg,
                      predmet:predmet
                    });
                  }
                }
              } else {
                if(!programs[pr].lgots.hasOwnProperty(list)) programs[pr].lgots[list] = {};
                if(!programs[pr].lgots[list].hasOwnProperty(ol+` (${profile})`)) programs[pr].lgots[list][ol+` (${profile})`] = [];
                programs[pr].lgots[list][ol+` (${profile})`].push({
                  status: minStatus,
                  lgota: lg,
                  predmet:predmet
                });
              }
            }
          }
        }
      }
    } 
  }

  LGOTS[vuz] = {
    name: shortName,
    fullName: longName,
    minClass: minClass,
    programs: programs
  };
}

console.log(LGOTS);

updateLgots();


function hideVuz(id) {
  let obj = document.getElementById(id);
  if(obj.style.display != "table") {
    obj.style.display = "table";
  } else {
    obj.style.display = "none";
  }
}

function updateLgots() {
  if(!localStorage.getItem("ach")) localStorage["ach"]="";
  let text = localStorage["ach"].split("|");
  let now = {};

  for(let i = 0; i < text.length; ++i) {
    text[i] = text[i].split(";");
    if(text[i].length != 6) continue;
    if(!now.hasOwnProperty(text[i][0])) now[text[i][0]] = {};
    now[text[i][0]][`${text[i][1]} (${text[i][2]})`] = {
      status: text[i][5],
      class: text[i][4]
    };
  }

  let HTML = "";
  for(const vuz of vuzs) {
    HTML += `<div class="lgota">
    <button class="lgota-vuz-name" onclick="hideVuz('${vuz}')" title="${LGOTS[vuz].fullName}">${LGOTS[vuz].name}</button>
    <table id="${vuz}" class="lgota-table" style="border-collapse: collapse; display: none;">`
    for(const i in LGOTS[vuz].programs) {
      HTML += `<tr>
            <td class="lgota-programm-number">${i}</td>
            <td class="lgota-programm">
              <div>
                <div class="lgota-programm-code">${LGOTS[vuz].programs[i].code}</div>
                <div class="lgota-programm-name">${LGOTS[vuz].programs[i].name}</div>
              </div>
            </td>
            <td class="lgota-programm-ege">---</td>
            <td>
              <table class="lgota-programm-lgota">
                <tr>`;
      let lgots = {};
      console.log(vuz,i);
      for(const e of LGOTS[vuz].programs[i].ege) {
        if(e == 'F') {
          HTML += `<th title="Физика">Ф</th>`;
          lgots[e] = [];
        }
        if(e == 'C') {
          HTML += `<th title="Химия">Х</th>`;
          lgots[e] = [];
        }
        if(e == 'H') {
          HTML += `<th title="История">И</th>`;
          lgots[e] = [];
        }
        if(e == 'O') {
          HTML += `<th title="Обществознание">О</th>`;
          lgots[e] = [];
        }
        if(e == 'I') {
          HTML += `<th title="Информатика">ИКТ</th>`;
          lgots[e] = [];
        }
        if(e == 'B') {
          HTML += `<th title="Биология">Б</th>`;
          lgots[e] = [];
        }
        if(e == 'G') {
          HTML += `<th title="География">Г</th>`;
          lgots[e] = [];
        }
        if(e == 'L') {
          HTML += `<th title="Иностранный язык">ИЯ</th>`;
          lgots[e] = [];
        }
        if(e == 'K') {
          HTML += `<th title="Литература">Л</th>`;
          lgots[e] = [];
        }
        if(e == 'R') {
          HTML += `<th title="Русский язык">РЯ</th>`;
          lgots[e] = [];
        }
        if(e == 'M') {
          HTML += `<th title="Математика (профильная)">М</th>`;
          lgots[e] = [];
        }
      }
      HTML += `<th title="Дополнительные баллы">+</th></tr>`
      lgots["+"] = [];

      for(const list in now) {
        for(const ol in now[list]) {
          if(LGOTS[vuz].programs[i].lgots.hasOwnProperty(list) && LGOTS[vuz].programs[i].lgots[list].hasOwnProperty(ol)) {
            for(const U of LGOTS[vuz].programs[i].lgots[list][ol]) {
              if((now[list][ol].status == U.status || U.status == "P") && (list=="vsosh.csv" || Number(LGOTS[vuz].minClass) <= now[list][ol].class)) {
                if(U.predmet == "*") {
                  for(const j in lgots) {
                    if(j != '+') lgots[j].push([Number(U.lgota), ol])
                  }
                } else {
                  for(let UU of U.predmet) {
                    if(lgots.hasOwnProperty(UU)) {
                      lgots[UU].push([Number(U.lgota), ol]);
                    } else {
                      lgots["+"].push([Number(U.lgota), ol+` (ОШИБКА: Нет предмета '${UU}' для подтверждения льготы)`]);
                    }
                  }
                }
              }
            }
          }
        }
      }

      HTML += `<tr>`;
      for(const i in lgots) {
        if(lgots[i].length == 0) {
          if(i == '+') HTML += `<td title="Льгот не найдено">0</td>`
          else HTML += `<td title="Льгот не найдено">-</td>`;
        } else {
          let mx = -100;
          HTML += `<td title="`
          for(const j of lgots[i]) {
            mx = Math.max(mx, j[0]);
            if(j[0] == 0) HTML += `БВИ: ${j[1]}\n`;
            else if(j[0] == -1) HTML += `100: ${j[1]}\n`;
          }
          HTML += `">`;
          if(i == '+') HTML += `0</td>`
          else if(mx == -1) HTML += `100</td>`;
          else if(mx == 0) HTML += `БВИ</td>`;
        }
      }
      HTML += `</tr></table></td></tr>`;
    }
    HTML += "</table></div>";
  }
  document.getElementById('ZZZ').innerHTML = HTML;
}