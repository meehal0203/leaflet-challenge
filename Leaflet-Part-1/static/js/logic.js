// let url = https = "//earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"

// // Perform GET request on URL
// d3.json(url).then(function (data) {
//     console.log(data);

//     // Create features function
//     // createFeatures(data.features);
  
//     // Initialize Leaflet map inside the callback function
//     let myMap = L.map('map').setView([0, 0], 2);

//     // Add the base map layer
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(myMap);

//     // Function to determine the color based on depth
//     function getColor(depth) {
//         if (depth > 90)
//             return "red";
//         else if (depth > 70)
//             return "orange red";
//         else if (depth > 50)
//             return "orange";
//         else if (depth > 30)
//             return "gold";
//         else if (depth > 10)
//             return "yellow";
//         else
//             return "green";
//     }

//     // Function to determine the radius based on magnitude
//     function getRadius(magnitude) {
//         return Math.sqrt(magnitude) * 5;  

//     // Loop through the earthquake data and add markers to the map
//     data.features.forEach(feature => {
//         var coordinates = feature.geometry.coordinates;
//         var magnitude = feature.properties.mag;
//         var depth = coordinates[2];

//         // Create a circle marker for each earthquake
//         L.circleMarker([coordinates[1], coordinates[0]], {
//             radius: getRadius(magnitude),
//             fillColor: getColor(depth),
//             color: "depth",
//             weight: 1,
//             opacity: 1,
//             fillOpacity: 0.8
//         }).bindPopup(`<strong>Magnitude:</strong> ${magnitude}<br><strong>Depth:</strong> ${depth} km`).addTo(myMap);
//     });
// });

var myMap = L.map('map').setView([0, 0], 2);

    // Add the base map layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

    // Fetch earthquake data
    fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson')
      .then(response => response.json())
      .then(data => {
        // Define a legend
        var legend = L.control({ position: 'bottomleft' });

        legend.onAdd = function (map) {
          var div = L.DomUtil.create('div', 'legend');
          div.innerHTML += '<h4>Legend</h4>';
          div.innerHTML += '<div class="legend-item"><span class="circle" style="background-color: #FF0000;"></span> Depth > 70 km</div>';
          div.innerHTML += '<div class="legend-item"><span class="circle" style="background-color: #FFA500;"></span> Depth > 50 km</div>';
          div.innerHTML += '<div class="legend-item"><span class="circle" style="background-color: #FFFF00;"></span> Depth > 30 km</div>';
          div.innerHTML += '<div class="legend-item"><span class="circle" style="background-color: #ADD8E6;"></span> Depth > 10 km</div>';
          return div;
        };

        legend.addTo(myMap);

        // Loop through the earthquake data and add markers to the map
        data.features.forEach(feature => {
          var coordinates = feature.geometry.coordinates;
          var magnitude = feature.properties.mag;
          var depth = coordinates[2];

          // Create a circle marker for each earthquake
          L.circleMarker([coordinates[1], coordinates[0]], {
            radius: Math.sqrt(magnitude) * 3, // Adjust the multiplier to change the circle size
            fillColor: getColor(depth),
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
          }).bindPopup(`<strong>Magnitude:</strong> ${magnitude}<br><strong>Depth:</strong> ${depth} km`).addTo(myMap);
        });
      });

    // Function to determine the color based on depth
    function getColor(depth) {
      if (depth > 70)
        return "#FF0000"; // Red
      else if (depth > 50)
        return "#FFA500"; // Orange
      else if (depth > 30)
        return "#FFFF00"; // Yellow
      else if (depth > 10)
        return "#ADD8E6"; // Light Blue
      else
        return "#ADD8E6"; // Light Blue (Default)
    }