

// Create my map variable
let myMap = L.map('map').setView([0, 0], 2);

// Add the base map layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Fetch earthquake data
fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson')
  .then(response => response.json())
  .then(data => {
    // Loop through the earthquake data and add markers to the map
    for (let i = 0; i < data.features.length; i++) {
      let feature = data.features[i];
      let coordinates = feature.geometry.coordinates;
      let magnitude = feature.properties.mag;
      let depth = coordinates[2];
      let place = feature.properties.place;

      // Create a circle marker for each earthquake
      L.circleMarker([coordinates[1], coordinates[0]], {
        radius: Math.sqrt(magnitude) * 3,
        fillColor: getColor(depth),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      }).bindPopup(`<strong>Magnitude:</strong> ${magnitude}<br><strong>Depth:</strong> ${depth} km<br><strong>Location:</strong> ${place}`).addTo(myMap);
    }

    // Function to determine the color based on depth
    function getColor(depth) {
      if (depth > 90)
        return "#FF0000"; // Red
      else if (depth > 70)
        return "#FFA500"; // Orange
      else if (depth > 50)
        return "#FFFF00"; // Yellow
      else if (depth > 30)
        return "#ADD8E6"; // Light Blue
      else if (depth > 10)
        return "#90EE90"; // Light Green
      else
        return "#006400"; // Dark Green (Default)
    }

    // Create the legend
    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map) {

      var div = L.DomUtil.create('div', 'info legend')
      let grades = [0, 10, 30, 50, 70, 90]
      let colors = ['#FF0000', '#FFA500', '#FFFF00', '#ADD8E6', '#90EE90', '#006400'];
      div.innerHTML = "<h1><center>Depth</center></h1>" ;
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
          '<i style="background:' + colors[i] + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }

      return div;
    };

    legend.addTo(myMap);
  });