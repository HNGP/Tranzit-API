const {
  getDistance,
  calcTime,
  calcFare,
  convertToObj,
} = require("../utils/util");
const problem = require("../stations/delhi-data.json").stations;

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
  let a = {};

  problem[parseInt(startNode) - 1]["connected"].forEach((element) => {
    a[element] = getDistance(
      problem[parseInt(startNode) - 1]["details"]["latitude"],
      problem[parseInt(startNode) - 1]["details"]["longitude"],
      problem[parseInt(element) - 1]["details"]["latitude"],
      problem[parseInt(element) - 1]["details"]["longitude"]
    );
  });

  distances = Object.assign(distances, a);

  let parents = {};
  parents[endNode] = null;

  problem[parseInt(startNode) - 1]["connected"].forEach((child) => {
    parents[child] = startNode;
  });

  let visited = [];

  let node = shortestDistanceNode(distances, visited);

  while (node) {
    let distance = distances[node];
    b = {};

    problem[parseInt(node) - 1]["connected"].forEach((i) => {
      b[i] = getDistance(
        problem[parseInt(node) - 1]["details"]["latitude"],
        problem[parseInt(node) - 1]["details"]["longitude"],
        problem[parseInt(i) - 1]["details"]["latitude"],
        problem[parseInt(i) - 1]["details"]["longitude"]
      );
    });

    let children = b;

    // for each of those child nodes:
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

  shortestPath.forEach((element, i) => {
    shortestPath[i] = problem[parseInt(element) - 1]["title"];
  });

  let time = calcTime(distances[endNode]);
  let fare = calcFare(distances[endNode]);

  let stationsList = convertToObj(shortestPath, line);

  let results = {
    distance: distances[endNode],
    stationsList,
    time,
    fare,
  };

  return results;
};

module.exports.findShortestPath = findShortestPath;
