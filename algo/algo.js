const { getDistance } = require("../distance/distance");
const { map } = require('../stations/delhi'); 

let shortestDistanceNode = (distances, visited) => {
    let shortest = null;
    
    for (let node in distances) {
      let currentIsShortest = shortest === null || distances[node] < distances[shortest];
      if (currentIsShortest && !visited.includes(node)) {
        shortest = node;
      }
    }
    return shortest;
  };
  
  let findShortestPath = (problem, startNode, endNode) => {
    let distances = {};
    distances[endNode] = "Infinity";
    let a = {};
    for(i in problem[startNode]["connected"])
    {
        a[i] = getDistance(problem[startNode]["details"]["latitude"], problem[startNode]["details"]["longitude"], problem[i]["details"]["latitude"], problem[i]["details"]["longitude"]);
    }
    
    distances = Object.assign(distances, a);
    
    let parents = { endNode: null };
    for (let child in problem[startNode]["connected"]) {
      parents[child] = startNode;
    }
   
      let visited = [];
  
    let node = shortestDistanceNode(distances, visited);
    
    
    while (node) {
      let distance = distances[node];
      b = {};
      for(i in problem[node]["connected"])
      {
          b[i] = getDistance(problem[node]["details"]["latitude"], problem[node]["details"]["longitude"], problem[i]["details"]["latitude"], problem[i]["details"]["longitude"]);
      }
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

    for(var i in shortestPath){
      line.push(map[shortestPath[i]]["details"]["line"])
    }    
    
      
    let results = {
      distance: distances[endNode],
      path: shortestPath,
      lines: line
    };
      
      return results;
  };

  module.exports.findShortestPath = findShortestPath;