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
          div.innerHTML += '<h4>Depth Legend</h4>';
          div.innerHTML += '<div class="legend-item"><span class="circle" style="background-color: #FF0000;"></span> Depth > 90 km</div>';
          div.innerHTML += '<div class="legend-item"><span class="circle" style="background-color: #FFA500;"></span> Depth > 70 km</div>';
          div.innerHTML += '<div class="legend-item"><span class="circle" style="background-color: #FFFF00;"></span> Depth > 50 km</div>';
          div.innerHTML += '<div class="legend-item"><span class="circle" style="background-color: #ADD8E6;"></span> Depth > 30 km</div>';
          div.innerHTML += '<div class="legend-item"><span class="circle" style="background-color: #90EE90;"></span> Depth > 10 km</div>';
          div.innerHTML += '<div class="legend-item"><span class="circle" style="background-color: #006400;"></span> Depth <= 10 km</div>';
          return div;
        };

        legend.addTo(myMap);

        // Loop through the earthquake data and add markers to the map
        data.features.forEach(feature => {
          var coordinates = feature.geometry.coordinates;
          var magnitude = feature.properties.mag;
          var depth = coordinates[2];
          var place = feature.properties.place;

          // Create a circle marker for each earthquake
          L.circleMarker([coordinates[1], coordinates[0]], {
            radius: Math.sqrt(magnitude) * 3, 
            fillColor: getColor(depth),
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
          }).bindPopup(`<strong>Magnitude:</strong> ${magnitude}<br><strong>Depth:</strong> ${depth} km<br><strong>Place:</strong>${place}`).addTo(myMap);
        });
      });

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
        return "90EE90"; // Light Green
      else
        return "#006400"; // Dark Green (Default)
    }


//     // Creating the map object
// let myMap = L.map("map", {
//   center: [40.7128, -74.0059],
//   zoom: 11
// });

// // Adding the tile layer
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(myMap);

// // Use this link to get the GeoJSON data.
// let link = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/15-Mapping-Web/nyc.geojson";

// // The function that will determine the color of a neighborhood based on the borough that it belongs to
// function chooseColor(borough) {
//   if (borough == "Brooklyn") return "yellow";
//   else if (borough == "Bronx") return "red";
//   else if (borough == "Manhattan") return "orange";
//   else if (borough == "Queens") return "green";
//   else if (borough == "Staten Island") return "purple";
//   else return "black";
// }

// // Getting our GeoJSON data
// d3.json(link).then(function(data) {
//   // Creating a GeoJSON layer with the retrieved data
//   L.geoJson(data, {
//     // Styling each feature (in this case, a neighborhood)
//     style: function(feature) {
//       return {
//         color: "white",
//         // Call the chooseColor() function to decide which color to color our neighborhood. (The color is based on the borough.)
//         fillColor: chooseColor(feature.properties.borough),
//         fillOpacity: 0.5,
//         weight: 1.5
//       };
//     },
//     // This is called on each feature.
//     onEachFeature: function(feature, layer) {
//       // Set the mouse events to change the map styling.
//       layer.on({
//         // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
//         mouseover: function(event) {
//           layer = event.target;
//           layer.setStyle({
//             fillOpacity: 0.9
//           });
//         },
//         // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
//         mouseout: function(event) {
//           layer = event.target;
//           layer.setStyle({
//             fillOpacity: 0.5
//           });
//         },
//         // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
//         click: function(event) {
//           myMap.fitBounds(event.target.getBounds());
//         }
//       });
//       // Giving each feature a popup with information that's relevant to it
//       layer.bindPopup("<h1>" + feature.properties.neighborhood + "</h1> <hr> <h2>" + feature.properties.borough + "</h2>");

//     }
//   }).addTo(myMap);
// });