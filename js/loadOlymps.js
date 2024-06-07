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
  
  let text = loadFile("./res/olymps/"+listName).split("\n");
  let datalistHtml = "<option disabled selected>Выберите олимпиаду</option>";
  for(let j = 0; j < text.length; ++j) {
    text[j] = text[j].split(";");
    datalistHtml += `<option value="olymp${j}">${text[j][0]}</option>\n`;
  }
  console.log(datalistHtml)
  
  document.getElementById('selectOlymp').innerHTML = datalistHtml;
  // insertAdjacentHTML("beforeend", blogHTML)
});




// const olympLists = ["rsosh-20_21.csv", "rsosh-21_22.csv", "rsosh-22_23.csv", "rsosh-23_24.csv", "vsosh.csv"];

// for(let i = 0; i < olympLists.length; ++i) {
//   let text = loadFile("./res/olymps/"+olympLists[i]).split("\n");
//   Set

  // let datalistHtml = `
  // <select name="olymp">
  //   <option disabled selected value="s1">Выберите олимпиаду</option>
  // `;
  // for(let j = 0; j < text.length; ++j) {
  //   text[j] = text[j].split(";");
  //   datalistHtml += `
  //   <option value="olymp${j}">${text[j][0]}</option>
  //   `
  // }

  
//   //   
//   //   <option value="vsosh.csv">ВсОШ</option>
//   //   <option value="rsosh-20_21.csv">РСОШ 2020-21</option>
//   //   <option value="rsosh-21_22.csv">РСОШ 2021-22</option>
//   //   <option value="rsosh-22_23.csv">РСОШ 2022-23</option>
//   //   <option value="rsosh-23_24.csv">РСОШ 2023-24</option>
//   // </select>
//   `
//   console.log(text);
// }


