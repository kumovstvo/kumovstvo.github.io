updateTable();
var olympLists = ["vsosh.csv","rsosh-20_21.csv", "rsosh-21_22.csv", "rsosh-22_23.csv", "rsosh-23_24.csv"];
var OLYMPS = {};

for(const list of olympLists) {
  let mp = new Map();
  

  let text = loadFile("./res/olymps/"+list).split("\n");
  let olymps = {}
  for(let j = 0; j < text.length; ++j) {
    text[j] = text[j].split(";");

    if(!olymps.hasOwnProperty(text[j][0])) {
      olymps[text[j][0]] = {};
    }
    olymps[text[j][0]][text[j][1]] = text[j][2];
  }

  OLYMPS[list] = olymps;
}

console.log(OLYMPS);

var listNow = NaN;
var olympNow = NaN;
var profileNow = NaN;

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

document.querySelector('#selectList').addEventListener('change', function (e) {
  let listName = e.target.value;
  let olymps = OLYMPS[listName];

  let I = 0;
  let datalistHtml = "<option disabled selected>Выберите олимпиаду</option>";
  for(const i in olymps) {
    datalistHtml += `<option value="${i}">${i}</option>\n`;
    I++;
  }
  
  document.getElementById('selectOlymp').innerHTML = datalistHtml;
  document.getElementById('selectProfile').innerHTML = "<option disabled selected>Выберите профиль олимпиады</option>";
  listNow = listName;
});

document.querySelector('#selectOlymp').addEventListener('change', function (e) {
  let olympName = e.target.value;
  let profiles = OLYMPS[listNow][olympName];

  let I = 0;
  let datalistHtml = "<option disabled selected>Выберите профиль олимпиады</option>";
  for(const i in profiles) {
    datalistHtml += `<option value="${i}">${i}</option>\n`;
    I++;
  }
  
  document.getElementById('selectProfile').innerHTML = datalistHtml;
  olympNow = olympName;
});

function updateTable() {
  if(!localStorage.getItem("ach")) localStorage["ach"]="";
  let text = localStorage["ach"].split("|");

  let HTML = `
  <tr>
    <th class="achName">Достижение</th> 
    <th class="achProfile">Профиль</th>
    <th class="achStatus">Статус</th>
    <th class="achClass">Класс</th>
  </tr>
  `;

  for(let i = 0; i < text.length; ++i) {
    text[i] = text[i].split(";");
    if(text[i].length != 6) continue;
    HTML += `
    <tr>
      <td class="achName">${text[i][1]}</td>
      <td class="achProfile">${text[i][2]}</td>
      <td class="achStatus">${text[i][5]=="P" ? "Призёр" : "Победитель"}</td>
      <td class="achClass">${text[i][4]}</td>
    </tr>`;
  }
  document.getElementById('achTable').innerHTML = HTML;
}

function addAch() {
  if(!localStorage.getItem("ach")) localStorage["ach"]="";

  let list = document.getElementById('selectList').value;
  let olymp = document.getElementById('selectOlymp').value;
  let profile = document.getElementById('selectProfile').value;
  let clasS = document.getElementById('selectClass').value;
  let status = document.getElementById('selectStatus').value;
  if(list == "*" || olymp == "*" || profile == "*" || clasS == "*" || status == "*") {
    alert("Заполните все поля!");
    return;
  }
  let olympLevel = OLYMPS[list][olymp][profile];
  localStorage["ach"] += `${list};${olymp};${profile};${olympLevel};${clasS};${status}|`;
  updateTable();
}