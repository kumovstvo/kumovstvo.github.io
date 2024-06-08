const olympLists = ["vsosh.csv","rsosh-20_21.csv", "rsosh-21_22.csv", "rsosh-22_23.csv", "rsosh-23_24.csv"];
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

console.log(OLYMPS)

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
  console.log(datalistHtml);
  
  document.getElementById('selectProfile').innerHTML = datalistHtml;
  olympNow = olympName;
});

function addAch() {
  let list = document.getElementById('selectList').value;
  let olymp = document.getElementById('selectOlymp').value;
  let profile = document.getElementById('selectProfile').value;
  let clasS = document.getElementById('selectClass').value;
  let status = document.getElementById('selectStatus').value;
  let olympLevel = OLYMPS[list][olymp][profile];
  if(!localStorage.getItem("ach")) localStorage["ach"]="";
  localStorage["ach"] += `${list};${olymp};${profile};${olympLevel};${clasS};${status}\n`;
}
