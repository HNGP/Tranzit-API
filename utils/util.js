function getDistance(
  lat1 = 28.565307,
  lon1 = 77.122413,
  lat2 = 28.45927,
  lon2 = 77.07268
) {
  var R = 6371;
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;

  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function calcTime(distance) {
  return (distance / 30) * 60;
}

function calcFare(distance) {
  let fare = 0;
  if (distance >= 0 && distance < 2) {
    fare = 10;
  }
  if (distance >= 2 && distance < 5) {
    fare = 20;
  }
  if (distance >= 5 && distance < 12) {
    fare = 30;
  }
  if (distance >= 12 && distance < 21) {
    fare = 40;
  }
  if (distance >= 21 && distance < 32) {
    fare = 50;
  }
  if (distance >= 32) {
    fare = 60;
  }

  return fare;
}

function convertToObj(a, b) {
  if (a.length != b.length || a.length == 0 || b[0].length == 0) {
    return null;
  }
  let obj = {};

  a.forEach((k, i) => {
    obj[k] = b[i];
  });
  return obj;
}

module.exports = {
  getDistance: getDistance,
  deg2rad: deg2rad,
  calcTime: calcTime,
  calcFare: calcFare,
  convertToObj: convertToObj,
};
