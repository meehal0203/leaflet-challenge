// store url with one month of earthquake data > 4.5 
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson"

// perform GET request on url
d3.json(url).then(function (data) {
    console.log(data);

    // create function
    createFeatures(data.features);
});
let myMap = L.map('map').setView([0, 0], 2);

// Add the base map layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Function to determine the color based on depth
function getColor(depth) {
    if (depth > 90)
        return "red";
    elseif(depth > 70)
    return "orange red";
    elseif (depth > 50)
    return "orange";
    elseif (depth > 30);
    return "gold";
    elseif (depth > 10)
    return "yellow";
    else:
    return "green";
}
//  colorscale: [[0, 'rgb(166,206,227)'], [0.25, 'rgb(31,120,180)'], [0.45, 'rgb(178,223,138)'],
// [0.65, 'rgb(51,160,44)'], [0.85, 'rgb(251,154,153)'], [1, 'rgb(227,26,28)']]

// Function to determine the radius based on magnitude
function getRadius(magnitude) {
    return Math.sqrt(magnitude) * 5;  // Adjust the multiplier to change the circle size
}

// Fetch earthquake data (Replace 'your-dataset-url' with the actual URL)
fetch('your-dataset-url')
    .then(response => response.json())
    .then(data => {
        // Loop through the earthquake data and add markers to the map
        data.features.forEach(feature => {
            var coordinates = feature.geometry.coordinates;
            var magnitude = feature.properties.mag;
            var depth = coordinates[2];

            // Create a circle marker for each earthquake
            L.circleMarker([coordinates[1], coordinates[0]], {
                radius: getRadius(magnitude),
                fillColor: getColor(depth),
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }).bindPopup(`<strong>Magnitude:</strong> ${magnitude}<br><strong>Depth:</strong> ${depth} km`).addTo(myMap);
        });
    })