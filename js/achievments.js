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

  localStorage["achs"] += `${type};${status};${grade};${olymp};${profile}|`;
}