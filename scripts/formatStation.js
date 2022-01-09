const fs = require("fs");
csv = fs.readFileSync("result.csv");

var array = csv.toString().split("\r");

array = array[0].split("\n");
array.shift();

let result = [];

array.forEach((element, index) => {
  let entry = {};
  element = element.split(",");
  entry.id = parseInt(element[5]);
  entry.title = element[0];
  let weights = element[6].split(" ");
  weights.pop();
  entry.connected = {};
  weights.forEach((weight) => {
    weight = weight.slice(1, weight.length - 1);
    let en = weight.split(":");
    Object.assign(entry.connected, { [parseInt(en[0])]: parseInt(en[1]) });
  });
  entry.details = {};
  entry.details.line = element[1];
  entry.details.layout = element[2];
  entry.details.latitude = parseFloat(element[3]);
  entry.details.longitude = parseFloat(element[4]);
  result.push(entry);
});
fs.writeFileSync("./delhi-stations.json", JSON.stringify(result, null, 2));
