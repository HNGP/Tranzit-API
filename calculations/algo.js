const { getDistance, calcFare, convertToObj } = require("../utils/util");
const problem = require("../scripts/delhi-stations.json");

let shortestDistanceNode = (distances, visited) => {
  let shortest = null;

  for (let node in distances) {
    let currentIsShortest =
      shortest === null || distances[node] < distances[shortest];
    if (currentIsShortest && !visited.includes(node)) {
      shortest = node;
    }
  }
  return shortest;
};

let findShortestPath = (startNode, endNode) => {
  let distances = {};
  distances[endNode] = "Infinity";
  distances = Object.assign(distances, problem[startNode - 1]["connected"]);
  let parents = { [endNode]: null };

  for (let child in problem[startNode - 1]["connected"]) {
    parents[child] = startNode;
  }

  let visited = [];

  let node = shortestDistanceNode(distances, visited);

  while (node) {
    let distance = distances[node];
    let children = problem[node - 1]["connected"];

    for (let child in children) {
      if (String(child) === String(startNode)) {
        continue;
      } else {
        let newdistance = distance + children[child];
        if (!distances[child] || distances[child] > newdistance) {
          distances[child] = newdistance;
          parents[child] = node;
        }
      }
    }

    visited.push(node);
    node = shortestDistanceNode(distances, visited);
  }

  let shortestPath = [endNode];
  let parent = parents[endNode];
  while (parent) {
    shortestPath.push(parent);
    parent = parents[parent];
  }
  shortestPath.reverse();

  let line = [];

  shortestPath.forEach((i) => {
    line.push(problem[parseInt(i) - 1]["details"]["line"]);
  });

  let interchange = 0;

  line.forEach((element, index) => {
    if (element.length > 1) {
      if (index === 0) {
        if (
          line[index].includes("Blue Line Branch") &&
          line[index].includes("Pink Line Branch")
        ) {
          line[index] = ["Blue Line Branch"];
          return;
        } else {
          let bruh = line[index];
          line[index] = bruh.filter((value) => line[index + 1].includes(value));
          return;
        }
      }
      if (index === line.length - 1) {
        if (
          line[index].includes("Blue Line Branch") &&
          line[index].includes("Pink Line Branch")
        ) {
          line[index] = ["Blue Line Branch"];
          return;
        } else {
          let bruh = line[index];
          line[index] = bruh.filter((value) => line[index - 1].includes(value));
          return;
        }
      }

      if (line[index - 1][0] === line[index + 1][0]) {
        line[index] = line[index - 1];
        return;
      }
      if (JSON.stringify(line[index]) === JSON.stringify(line[index + 1])) {
        line[index] = line[index - 1];
        return;
      }
      if (line[index + 1].length > 1 && line[index + 2]) {
        let bruh = [...new Set(line[index - 1].concat(line[index + 1]))];
        line[index] = bruh.filter((value) => !line[index + 2].includes(value));
      } else if (line[index - 1].length > 1 && line[index - 2]) {
        let bruh = [...new Set(line[index - 1].concat(line[index + 1]))];
        line[index] = bruh.filter((value) => !line[index - 2].includes(value));
      } else if (!line[index + 1].length > 1) {
        line[index] = [...new Set(line[index - 1].concat(line[index + 1]))];
      } else if (line[index].length == 3) {
        let bruh = [...new Set(line[index - 1].concat(line[index + 1]))];
        line[index] = bruh.filter((value) => line[index].includes(value));
      }
    }
  });

  line.forEach((line) => line.length > 1 && interchange++);

  shortestPath.forEach((element, i) => {
    shortestPath[i] = problem[parseInt(element) - 1]["title"];
  });

  const distanceToDestination = getDistance(
    problem[parseInt(startNode) - 1]["details"]["latitude"],
    problem[parseInt(startNode) - 1]["details"]["longitude"],
    problem[parseInt(endNode) - 1]["details"]["latitude"],
    problem[parseInt(endNode) - 1]["details"]["longitude"]
  );

  let fare = calcFare(distanceToDestination);

  let stationsList = convertToObj(shortestPath, line);

  let results = {
    time: distances[endNode],
    stationsList,
    fare,
    interchange,
  };

  return results;
};

module.exports.findShortestPath = findShortestPath;
