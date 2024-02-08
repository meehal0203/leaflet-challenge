# USGS Earthquake Mapping Challenge using Leaflet

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, I will develope a way to visualize USGS data that will help allow them to better educate the public and other government organizations on issues facing our planet.

## Create the Earthquake Visualization

![image](https://github.com/meehal0203/leaflet-challenge/assets/146681542/0f5e5f30-6596-4ef5-9303-0917b94e6fae)

I visited the USGS earthquake [website](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) and selected a dataset containing all earthquakes logged within the last 7 days worldwide (1/29/24 - 2/5/24). This gave me a JSON representation of the data such as in the diagram below:

![image](https://github.com/meehal0203/leaflet-challenge/assets/146681542/fd8eea43-0a09-4a39-8dba-89ae8586cf04)

* I then created a map using Leaflet that plots all the earthquakes from the dataset based on their longitude and latitude.

* Data markers reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes have  larger markers while earthquakes with greater depth appear darker in color.

* I have included popups that provide additional information about the earthquake when its associated marker is clicked, namely the location, depth and magnitude of each earthquake.

* I have given the map a legend that will provide context for map data.

### Below is the map plotting all earthquakes in a 7 day span around the world showing depth, magnitude and location information:

![image](https://github.com/meehal0203/leaflet-challenge/assets/146681542/d98dc235-5cba-43a7-8b99-57a72c58b12d)




