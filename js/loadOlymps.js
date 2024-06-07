function loadFile(filePath) {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', filePath, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result;
}


const olympLists = ["rsosh-20_21.csv", "rsosh-21_22.csv", "rsosh-22_23.csv", "rsosh-23_24.csv", "vsosh.csv"];

for(let i = 0; i < olympLists.length; ++i) {
  let text = loadFile("./res/olymps/"+olympLists[i]);
  console.log(text);
}


