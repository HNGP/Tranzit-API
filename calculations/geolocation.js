const { getDistance } = require("../utils/util");
const data = require("../scripts/data.json");

for (let i = 0; i < Object.keys(data).length; i++) {
  console.log(data[i + 1].latitude);
}

let findNearestStation = (user_latitude, user_longitude) => {
  let lat2, lon2, dist;
  let distanceList = [];

  for (let i = 0; i < Object.keys(data).length; i++) {
    lat2 = data[i + 1].latitude;
    lon2 = data[i + 1].longitude;
    dist = getDistance(user_latitude, user_longitude, lat2, lon2);
    distanceList.push(dist);
  }

  let leastDistance = Math.min(...distanceList);
  i = distanceList.indexOf(leastDistance);

  const geoResult = {
    nearestStation: data[i + 1].title,
    distance: leastDistance,
  };

  return geoResult;
};

module.exports.findNearestStation = findNearestStation;
