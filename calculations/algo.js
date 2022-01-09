const {
  getDistance,
  calcTime,
  calcFare,
  convertToObj,
} = require("../utils/util");
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
  };

  return results;
};

module.exports.findShortestPath = findShortestPath;
