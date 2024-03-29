const { getDistance } = require("../utils/util");
const data = require("../scripts/delhi-stations.json");

let findNearestStation = (user_latitude, user_longitude) => {
  let lat2, lon2, dist;
  let distanceList = [];

  for (let i = 0; i < data.length; i++) {
    lat2 = data[i].details.latitude;
    lon2 = data[i].details.longitude;
    dist = getDistance(user_latitude, user_longitude, lat2, lon2);
    distanceList.push(dist);
  }

  let leastDistance = Math.min(...distanceList);
  i = distanceList.indexOf(leastDistance);

  const geoResult = {
    nearestStation: data[i].title,
    distance: leastDistance,
  };

  return geoResult;
};

module.exports.findNearestStation = findNearestStation;
