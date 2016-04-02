'use strict'

var React = require('react');

var map;
var ICON_URL = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|";
var OPTION_INC_ADDRESS = '16820 197th Ave NW,Big Lake, MN 55309, USA';
var geocoder = new google.maps.Geocoder();
var directionsDisplay = new google.maps.DirectionsRenderer;
var directionsService = new google.maps.DirectionsService;
var ConsumerMap = React.createClass({
  getInitialState: function() {
    return {markers: []}
  },

  getCenter: function(done) {
    var address = OPTION_INC_ADDRESS;
    geocoder.geocode({
      'address': address
    }, function(results, status) {

      done({lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()})
    }
  },
  componentDidMount: function() {

    //get center
    var _self = this;
    this.getCenter(function(center) {
      //load map
      map = new google.maps.Map(document.getElementById('test-map'), {
        center: center,
        zoom: 12
      });

      var RED = "FE7569";
      var BUSINESS_NAME = 'OPTIONS_INC'
      var icon = ICON_URL + RED;
      var marker = new google.maps.Marker({position: center, map: map, title: BUSINESS_NAME, icon: icon});
      var infowindow = new google.maps.InfoWindow({content: BUSINESS_NAME});

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
      _self.loadConsumers();

      //display directions
      directionsDisplay.setMap(map);

      _self.calculateAndDisplayRoute(directionsService, directionsDisplay);
    })

  },
  calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var waypts = [];
    //calculate route for 1 vehicle
    this.state.vehicles[0].consumers.forEach(function(consumer) {
      waypts.push({location: consumer.address, stopover: true});

    });

    directionsService.route({
      origin: OPTION_INC_ADDRESS,
      destination: OPTION_INC_ADDRESS,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        console.log(response);
        directionsDisplay.setDirections(response);
        var route = response.routes[0];
        var summaryPanel = document.getElementById('directions-panel');
        summaryPanel.innerHTML = '';
        // For each route, display summary information.
        var totalDuration = 0;
        var totalDistance = 0;
        for (var i = 0; i < route.legs.length; i++) {
          var routeSegment = i + 1;
          summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
          summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
          summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
          summaryPanel.innerHTML += route.legs[i].distance.text + '<br>';
          summaryPanel.innerHTML += route.legs[i].distance.value + ' meters<br>';
          summaryPanel.innerHTML += route.legs[i].duration.text + '<br>';
          summaryPanel.innerHTML += route.legs[i].duration.value + ' seconds<br><br>';
          totalDuration +=route.legs[i].duration.value;
          totalDistance +=route.legs[i].distance.value;
        }

        summaryPanel.innerHTML += '<b>Total duration: ' + totalDuration/60 + ' minutes</b><br>';
        summaryPanel.innerHTML += '<b>Total distance: ' + totalDistance * 0.00062137 + ' miles</b><br>';
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });

  },
  loadConsumers: function() {
    this.state.vehicles.forEach(function(vehicle) {
      vehicle.consumers.forEach(function(consumer) {
        geocoder.geocode({
          'address': consumer.address
        }, function(results, status) {
          var position = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          }

          var icon = ICON_URL + vehicle.markerColor;
          var marker = new google.maps.Marker({position: position, map: map, title: consumer.name, icon: icon});
          var content = "<div>" + vehicle.name + "</div>" + "<div>" + consumer.name + "</div>" + "<div>" + consumer.address + "</div>";
          var infowindow = new google.maps.InfoWindow({content: content});

          marker.addListener('click', function() {
            infowindow.open(map, marker);
          });
        })
      });
    })
  },
  getInitialState: function() {
    return {
      markers: [],
      vehicles: [
        {
          name: 'Bus 1',
          markerColor: 'ffff99',
          occupiedSeats: 2,
          totalSeats: 3,
          occupiedWheelchairs: 1,
          totalWheelchairs: 1,
          isFull: false,
          consumers: [
            {
              name: "Thomas",
              address: "301 Donna Ct,Big Lake, MN 55309, USA"
            }, {
              name: "Percy",
              address: "321 Washington Ave,Big Lake, MN 55309, USA",
              hasWheelchair: true
            }, {
              name: "James",
              address: "14901 204th Ave NW,Big Lake, MN 55330, USA"
            }
          ]
        }, {
          name: 'Bus 2',
          markerColor: '0099ff',
          occupiedSeats: 2,
          totalSeats: 2,
          occupiedWheelchairs: 1,
          totalWheelchairs: 2,
          isFull: true,
          consumers: [
            {
              name: "Gordon",
              address: "20083 January St,Big Lake, MN 55309, USA"
            }, {
              name: "Edward",
              address: "17270 US Highway 10 NW,Big Lake, MN 55309, USA"
            }, {
              name: "Toby",
              address: "15818 201st Ave NW,Big Lake, MN 55330, USA",
              hasWheelchair: true
            }
          ]
        }
      ]
    }
  },
  render() {

    return (
      <div className="content-wrapper">
        <section className="content">
          <div className="row">
            <div className="col-xs-3">
              {this.state.vehicles.map(function(vehicle, index) {
                var seatsColor;
                var wheelchairsColor;
                if (vehicle.occupiedSeats < vehicle.totalSeats) {
                  seatsColor = "green";
                } else {
                  seatsColor = "red";
                }
                if (vehicle.occupiedWheelchairs < vehicle.totalWheelchairs) {
                  wheelchairsColor = "green";
                } else {
                  wheelchairsColor = "red";
                }
                return (
                  <div>
                    <h1>{vehicle.name}
                      <img src={ICON_URL + vehicle.markerColor}></img>
                    </h1>
                    <div style={{
                      color: seatsColor
                    }}>
                      <i className="fa fa-male"></i>
                      {vehicle.occupiedSeats}/{vehicle.totalSeats}
                    </div>
                    <div style={{
                      color: wheelchairsColor
                    }}>
                      <i className="fa fa-wheelchair"></i>
                      {vehicle.occupiedWheelchairs}/{vehicle.totalWheelchairs}</div>
                    {vehicle.consumers.map(function(consumer, index) {
                      return (
                        <div>

                          <h3>{consumer.name} {consumer.hasWheelchair
                              ? <i className="fa fa-wheelchair"></i>
                              : null}</h3>
                          <div>{consumer.address}</div>

                        </div>
                      )
                    })
}

                  </div>
                )
              })
}
            </div>
            <div className="col-xs-9">
              <div id="test-map"></div>
              <div id="directions-panel"></div>
            </div>
          </div>
        </section>
      </div>

    );
  }

});
module.exports = ConsumerMap;
