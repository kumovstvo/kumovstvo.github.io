function hideVuz(vuz) {
  let table = document.getElementById(`${vuz}-table`);
  if(table.style.display != "table") {
    table.style.display = "table";
  } else {
    table.style.display = "none";
  }

  let comment = document.getElementById(`${vuz}-comment`);
  if(comment.style.display != "block") {
    comment.style.display = "block";
  } else {
    comment.style.display = "none";
  }
}

function loadLgots() {
  if(!localStorage.getItem("achs")) localStorage["achs"]="";
  let text = localStorage["achs"].split('|');

  let achs = {};
  for(let i = 0; i < text.length; ++i) {
    text[i] = text[i].split(';');
    if(text[i].length != 6) continue;

    if(!achs.hasOwnProperty(text[i][0])) achs[text[i][0]] = {};
    achs[text[i][0]][`${text[i][3]}_${text[i][4]}`] = {
      status: text[i][1],
      class: Number(text[i][2])
    }
  }

  let HTML = "";
  for(const vuz in VUZS) {
    HTML += `<div class="vuz">
      <button class="vuz-name" onclick="hideVuz('${vuz}')" title="${VUZS[vuz].fullName}">${VUZS[vuz].name}</button>
      <span id="${vuz}-comment" class="vuz-comment" style="display: none;">${VUZS[vuz].comment}</span>
      <table id="${vuz}-table" class="vuz-table" style="border-collapse: collapse; display: none;">
    `;
    for(const i in VUZS[vuz].programs) {
      HTML += `<tr>
          <td class="vuz-programm-number">${i}</td>
          <td class="vuz-programm">
            <div>
              <div class="vuz-programm-code">${VUZS[vuz].programs[i].code.join(", ")}</div>
              <div class="vuz-programm-name">${VUZS[vuz].programs[i].name}</div>
            </div>
          </td>
          <td class="vuz-programm-ege" title="Средний балл ЕГЭ поступивших в прошлом году">---</td>
          <td>
            <table class="vuz-programm-subjects">
              <tr>`;
      let lgots = {};
      for(const e of VUZS[vuz].programs[i].ege) {
        if(e == 'F')
          HTML += `<th title="Физика">Ф</th>`;
        else if(e == 'C')
          HTML += `<th title="Химия">Х</th>`;
        else if(e == 'H')
          HTML += `<th title="История">И</th>`;
        else if(e == 'O')
          HTML += `<th title="Обществознание">О</th>`;
        else if(e == 'I')
          HTML += `<th title="Информатика">ИКТ</th>`;
        else if(e == 'B')
          HTML += `<th title="Биология">Б</th>`;
        else if(e == 'G')
          HTML += `<th title="География">Г</th>`;
        else if(e == 'L')
          HTML += `<th title="Иностранный язык">ИЯ</th>`;
        else if(e == 'K')
          HTML += `<th title="Литература">Л</th>`;
        else if(e == 'R')
          HTML += `<th title="Русский язык">РЯ</th>`;
        else if(e == 'M')
          HTML += `<th title="Математика (профильная)">М</th>`;
        else
          continue;

        lgots[e] = [];
      }
      HTML += `<th title="Дополнительные баллы">+</th></tr>`
      lgots['+'] = [];

      for(const list in achs) {
        if(!VUZS[vuz].programs[i].lgots.hasOwnProperty(list)) continue;
        for(const ol in achs[list]) {
          if(!VUZS[vuz].programs[i].lgots[list].hasOwnProperty(ol)) continue;
          for(const lgota of VUZS[vuz].programs[i].lgots[list][ol]) {
            if(list != "vsosh.csv") {
              if(Number(lgota.lgota) == -1 && achs[list][ol].class < VUZS[vuz].minClass100) continue;
              if(Number(lgota.lgota) == 0 && achs[list][ol].class < VUZS[vuz].minClassBVI) continue;
              if(achs[list][ol].status == 'M' && (lgota.status == 'P' || lgota.status == 'W')) continue;
              if(achs[list][ol].status == 'P' && (lgota.status == 'W')) continue;
            }
            if(lgota.predmet == "*") {
              for(const j in lgots) {
                if(j != '+') lgots[j].push([Number(lgota.lgota), ol])
              }
            } else {
              for(const subject of lgota.predmet) {
                if(lgots.hasOwnProperty(subject)) {
                  lgots[subject].push([Number(lgota.lgota), ol]);
                }
              }
            }
          }
        }
      }
      HTML += '<tr>';
      for(const i in lgots) {
        if(i == '+') continue;
        if(lgots[i].length == 0) {
          HTML += `<td title="Льгот не найдено">-</td>`;
        } else {
          let mx = -100;
          HTML += `<td title="`;
          for(const j of lgots[i]) {
            mx = Math.max(mx, j[0]);
            if(j[0] == 0) HTML += `БВИ: ${j[1]}\n`;
            else if(j[0] == -1) HTML += `100: ${j[1]}\n`;
          }
          HTML += `">`;
          if(mx == -1) HTML += `100</td>`;
          else if(mx == 0) HTML += `БВИ</td>`;
        }
      }
      HTML += `</tr> </table> </td> </tr>`;
    }
    HTML += `</table></div>`;
  }
  document.getElementById('content').innerHTML = HTML;
}

loadLgots();