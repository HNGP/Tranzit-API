const express = require("express");
const expressGraphQl = require("express-graphql").graphqlHTTP;
const schema = require("./schema.js");
const { findShortestPath } = require("./algo/algo");
const { map } = require("./stations/delhi");
const data = require("./stations/delhi-data.json");
const { getDistance } = require("./distance/distance");

const app = express();

app.use(
  "/graphql",
  expressGraphQl({
    schema: schema,
    graphiql: true,
  })
);
app.get("/", (req, res) => {
  // const ans = getDistance(28.565307,77.122413,28.45437,77.07268);
  var source = "1";
  var destination = "2";

  let result = findShortestPath(data.station, source, destination);

  return res.json(result);
});

app.get("/geo", (req, res) => {
  let latitude_user = req.query.lat;
  let longitude_user = req.query.lon;
  let lat2, lon2, dist;
  let distanceList = [];
  let nearestObj = [];
  let nearestStation;
  for (var i in map) {
    lat2 = map[i].details.latitude;
    lon2 = map[i].details.longitude;
    dist = getDistance(latitude_user, longitude_user, lat2, lon2);
    distanceList.push(dist);
    nearestObj.push(i);
  }
  let leastDistance = Math.min(...distanceList);
  i = distanceList.indexOf(leastDistance);

  const geoResult = {
    nearestStation: nearestObj[i],
    distance: leastDistance,
  };

  return res.json(geoResult);

  //http://localhost:5000/geo?lat=28.6409424&lon=77.3836369 TEST URL
});

app.listen(5000, () => console.log(`Server is running on port 5000`));
