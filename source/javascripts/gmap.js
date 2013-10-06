function initialize() {
  var lat = $("#map-canvas").attr("lat"); 
  var lng = $("#map-canvas").attr("lng"); 
  console.log(lat);
  console.log(lng);
  var loc = new google.maps.LatLng(lat,lng);
  var mapOptions = {
    zoom: 7,
    center: loc,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var marker = new google.maps.Marker({
      position: loc,
      map: map,
      title: 'Hello World!'
  });

}

google.maps.event.addDomListener(window, 'load', initialize);