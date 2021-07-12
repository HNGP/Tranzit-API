function getDistance(lat1=28.565307, lon1=77.122413, lat2=28.45927, lon2=77.07268){
   
    var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2-lat1);  // deg2rad below
      var dLon = deg2rad(lon2-lon1); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; // Distance in km
      // document.getElementById("container2").innerHTML += '<br>' + d + 'km';
      return d;
      console.log(d);
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
module.exports={
    getDistance:getDistance
}