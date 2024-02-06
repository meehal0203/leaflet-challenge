// store url with earthquake data
let url= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson"

// perform GET request on url
d3.json(url).then(function(data) {
    console.log(data);
})