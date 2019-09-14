// Function to determine marker size based on earthquake magnitude
function markerSize(feature) {
  return Math.sqrt(Math.abs(feature.properties.mag)) * 5;
}

// Function to determine marker color based on earthquake magnitude
var colors = ["#7FFF00", "#dfedbe", "#eede9f", "#FF8C00", "	#FA8072", "#FF0000"]
function fillColor(feature) {
  var mag = feature.properties.mag;
  if (mag <= 1) {
    return colors[0]
  }
  else if (mag <= 2) {
    return colors[1]
  }
  else if (mag <= 3) {
    return colors[2]
  }
  else if (mag <= 4) {
    return colors[3]
  }
  else if (mag <= 5) {
    return colors[4]
  }
  else {
    return colors[5]
  }
}

// ma
var attribution = "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>";

var outdoorsMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={API}", {
  attribution: attribution,
  maxZoom: 18,
  id: "mapbox.outdoors",
  API: API_KEY
});

var satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={API}", {
  attribution: attribution,
  maxZoom: 18,
  id: "mapbox.satellite",
  API: API_KEY
});

var lightMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={API}", {
  attribution: attribution,
  maxZoom: 18,
  id: "mapbox.light",
  API: API_KEY
});


// baseMaps object
var baseMaps = {
  "Outdoors": outdoorsMap,
  "Satellite": satelliteMap,
  "Grayscale": lightMap
  
};

// Store API endpoint as queryUrl and perform API request
var PlatesQuery = "GeoJSON/PB2002_boundaries.json";
var APIquery = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(APIquery, function(data) {
    d3.json(PlatesQuery, function(platesData) {
  
    // Earthquake layer
    var earthquakes = L.geoJSON(data, {

        // Create circle markers
        pointToLayer: function (feature, latlng) {
          var MarkerOptions = {
            radius: 8,
            stroke: false,
            radius: markerSize(feature),
            fillColor: fillColor(feature),
            opacity: 1,
            fillOpacity: 1
          };
          return L.circleMarker(latlng, MarkerOptions);
        },
  
        // Create popups
        onEachFeature: function (feature, layer) {
          return layer.bindPopup(`Place:${feature.properties.place}<br><strong>Magnitude:${feature.properties.mag}`);
        }
      });

          // Tectonic plates
    var platesStyle = {
        "color": "grey",
        "weight": 2,
        "opacity": 2,
        fillOpacity: 0,
      };
      var plate = L.geoJSON(platesData, {
        style: platesStyle
      });
  
      // overlay
      var overlay = {
        "Faults": plate,
        "Earthquakes": earthquakes,
      };
  
      // starting point on map and layer control
      var map = L.map("map", {
        center: [36.77, -119.41],
        zoom: 6,
        layers: [satelliteMap, plate, earthquakes]
      });
  
      L.control.layers(baseMaps, overlay, {
        collapsed: false
      }).addTo(map);
  
      // Setting up the legend
      var legend = L.control({ position: "bottomleft" });
      legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var labelsColor = [];
        var labelsText = [];
        var limits = ["0-1", "1-2", "2-3", "3-4", "4-5", "5+"];
      
        limits.forEach(function(limit, index) {
          labelsColor.push(`<li style="background-color: ${colors[index]};"></li>`);
          labelsText.push(`<span class="legend-label">${limits[index]}</span>`)
        });
  
        var labelsColorHtml =  "<ul>" + labelsColor.join("") + "</ul>";
        var labelsTextHtml = `<div id="labels-text">${labelsText.join("<br>")}</div>`;
  
        var legendInfo = "<h4>Legend<br>Magnitude</h4>" +
          "<div class=\"labels\">" + labelsColorHtml + labelsTextHtml
          "</div>";
        div.innerHTML = legendInfo;
        return div;
      };
  
      legend.addTo(map);
  
    })
  })