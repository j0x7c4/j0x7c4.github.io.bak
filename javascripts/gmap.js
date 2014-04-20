function initialize() {
  
  if (!$("div#map-canvas")[0]) return; //check there is map-canves
  
  var locations=[];

  //get locations from div.map-marker
  $("div.map-marker").each(function(){
    console.log($(this).attr('name'));
    locations.push([$(this).attr('name'),$(this).attr('lat'),$(this).attr('lng')]);
  });
  
  
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
      zoom: 10,
      center: new google.maps.LatLng(locations[0][1], locations[0][2]),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

  var infowindow = new google.maps.InfoWindow();

  for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
  }
}

google.maps.event.addDomListener(window, 'load', initialize);
