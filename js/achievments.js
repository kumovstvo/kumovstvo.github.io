function selectElement(id, valueToSelect) {    
  let element = document.getElementById(id);
  element.value = valueToSelect;
}

function addAchievmentFormClean() {
  selectElement("achType", "*");
  selectElement("achStatus", "*");
  selectElement("achGrade", "*");
  selectElement("achOlymp", "*");
  selectElement("achProfile", "*");
  document.getElementById('achProfile').innerHTML = `<option value="*" disabled selected></option>`;
  document.getElementById('achOlymp').innerHTML = `<option value="*" disabled selected></option>`;
}

function addAchievment() {
  if(!localStorage.getItem("achs")) localStorage["achs"]="";

  let type = document.getElementById('achType').value;
  let status = document.getElementById('achStatus').value;
  let grade = document.getElementById('achGrade').value;
  let olymp = document.getElementById('achOlymp').value;
  let profile = document.getElementById('achProfile').value;

  if(type == "*" || status == "*" || grade == "*" || olymp == "*" || profile == "*") {
    alert("Для добавления достижения необходимо заполнить все поля формы.");
    return;
  }

  let level = OLYMPS[type][olymp][profile];
  localStorage["achs"] += `${type};${status};${grade};${olymp};${profile};${level}|`;
  addAchievmentFormClean();
}

function deleteAcievment(id) {
  if(!localStorage.getItem("achs")) localStorage["achs"]="";
  let text = localStorage["achs"].split('|');
  delete text[id];

  localStorage["achs"] = "";
  for(let i = 0; i < text.length; ++i) {
    localStorage["achs"] += text[i] + "|";
  }
}

function loadAchievments() {
  let text = localStorage["achs"].split('|');

  let HTML = ``;

  for(let i = 0; i < text.length; ++i) {
    text[i] = text[i].split(";");
    if(text[i].length != 6) continue;
    HTML += `
    <div class="achievment ${text[i][1]}Ach">
      <span class="achTitle">${text[i][3]}</span>
      <span class="achList">${OLYMPS[text[i][0]]["#name"]["#name"]}</span>
      <span class="achSeparator">&#183;</span>
      <span class="achProfile">${text[i][4]}</span>
      &#183;
      <span class="achGrade">${text[i][2]} класс</span>
      &#183;
      <span class="achStatus">${text[i][1] == "W" ? "Победитель" : (text[i][1] == "P" ? "Призёр" : "Участник")}</span>
      &#183;
      <button class="achDelete" onclick="deleteAcievment(${i}); loadAchievments();">Удалить</button>
    </div>
    `;
  }
  document.getElementById('achievments').innerHTML = HTML;
}

document.querySelector('#achType').addEventListener('change', function (e) {
  let listName = document.getElementById("achType").value;
  let olymps = OLYMPS[listName];

  let optionsHTML = `<option value="*" disabled selected></option>`;
  for(const i in olymps) {
    if(i != "#name")
      optionsHTML += `<option value="${i}">${i}</option>\n`;
  }
  
  document.getElementById('achOlymp').innerHTML = optionsHTML;
  document.getElementById('achProfile').innerHTML = `<option value="*" disabled selected></option>`;
});

document.querySelector('#achOlymp').addEventListener('change', function (e) {
  let listName = document.getElementById("achType").value;
  let olympName = document.getElementById("achOlymp").value;
  let profiles = OLYMPS[listName][olympName];

  let optionsHTML = `<option value="*" disabled selected></option>`;
  for(const i in profiles) {
    if(i != "#name")
      optionsHTML += `<option value="${i}">${i}</option>\n`;
  }
  
  document.getElementById('achProfile').innerHTML = optionsHTML;
});

loadAchievments();