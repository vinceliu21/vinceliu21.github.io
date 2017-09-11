var map;
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: new google.maps.LatLng(40.4435, -79.9435),
    mapTypeId: 'roadmap',
    gestureHandling: 'greedy'
  });

  var contentString = `
<div id="content" class="infowindow">
  <div class="row" style="margin-bottom: 0px">
    <h5 id="firstHeading" class="col s12">{0}</h5>
  </div>
  <div class="row" style="margin-bottom: 0px">
    <p class="col s12">{1} Free<br>{2} Total racks</p>
  </div>
</div>
  `;

  

  var iconBase = 'assets/parking/';
  var icons = {
    parking: {
      icon: iconBase + 'bike.png'
    }
  };
  var infowindows = []
  function addMarker(feature) {
    var marker = new google.maps.Marker({
      position: feature.position,
      icon: icons[feature.type].icon,
      map: map
    });
    formatted = contentString.format(feature.name, feature.num_free,feature.total)
    var infowindow = new google.maps.InfoWindow({
      content: formatted
    });

    marker.addListener('click', function() {
      for (var i = 0; i < infowindows.length; i++) {
        infowindows[i].close()
      }
      infowindows = []
      infowindows.push(infowindow);
      infowindow.open(map, marker);
    });
  }
  
  var features = [
    {
      position: new google.maps.LatLng(40.442181, -79.943771),
      name: "Doherty Hall",
      num_free: 3,
      total: 5,
      type: 'parking'
    },
    {
      position: new google.maps.LatLng(40.442303, -79.945986),
      name: "Wean Hall",
      num_free: 0,
      total: 7,
      type: 'parking'
    },
    {
      position: new google.maps.LatLng(40.441936, -79.942172),
      name: "Tennis Courts",
      num_free: 2,
      total: 6,
      type: 'parking'
    },
    {
      position: new google.maps.LatLng(40.442838, -79.942389),
      name: "UC (front)",
      num_free: 0,
      total: 8,
      type: 'parking'
    },
    {
      position: new google.maps.LatLng(40.443589, -79.944077),
      name: "Gates",
      num_free: 5,
      total: 5,
      type: 'parking'
    },
    {
      position: new google.maps.LatLng(40.441237, -79.944144),
      name: "Baker/Hunt",
      num_free: 1,
      total: 7,
      type: 'parking'
    },
    {
      position: new google.maps.LatLng(40.445201, -79.943641),
      name: "Morewood",
      num_free: 0,
      total: 2,
      type: 'parking'
    },
    {
      position: new google.maps.LatLng(40.446144, -79.942404),
      name: "Stever",
      num_free: 2,
      total: 2,
      type: 'parking'
    }
  ];
  

  for (var i = 0, feature; feature = features[i]; i++) {
    addMarker(feature);
  }
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      //infoWindow.setPosition(pos);
      //infoWindow.setContent('Location found.');
      map.setCenter(pos);
      var marker = new google.maps.Marker({
        position: pos,
        map: map
      });
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}