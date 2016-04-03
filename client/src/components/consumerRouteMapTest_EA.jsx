'use strict'

var React = require('react');

var map;
var ICON_URL = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|";
var OPTIONS_INC_ADDRESS = '16820 197th Ave NW,Big Lake, MN 55309, USA';
var OPTIONS_INC_POSITION = {lat: 45.3292957, lng: -93.69755090000001};

var geocoder = new google.maps.Geocoder();
var directionsDisplay = new google.maps.DirectionsRenderer;
var directionsService = new google.maps.DirectionsService;

// COLORS
var RED = "FE7569";
var YELLOW = "FFD42A";
var GREEN = "5AA02C";
var BLUE = "0088AA"
var Vehicle = React.createClass({

  render : function() {
    var vehicle = this.props.vehicleObject;
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
        </h1>
        <div style={{
          color: seatsColor
        }}>
          <i className="fa fa-male"></i>&nbsp;
          {vehicle.occupiedSeats}/{vehicle.totalSeats}
        </div>
        <div style={{
          color: wheelchairsColor
        }}>
          <i className="fa fa-wheelchair"></i>&nbsp;
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
  }
});

var ConsumerMap = React.createClass({
  tripPath: null,
  componentDidMount: function() {

    //get center
    var _self = this;
      //load map
    map = new google.maps.Map(document.getElementById('test-map'), {
      center: OPTIONS_INC_POSITION,
      zoom: 12
    });

    var BUSINESS_NAME = 'OPTIONS_INC'
    var icon = ICON_URL + RED;
    var marker = new google.maps.Marker({position: OPTIONS_INC_POSITION, map: map, title: BUSINESS_NAME, icon: icon});
    var infowindow = new google.maps.InfoWindow({content: BUSINESS_NAME});

    marker.addListener('rightclick', function() {
      infowindow.open(map, marker);
    });
    _self.loadConsumers();

    /*
      //display directions
      directionsDisplay.setMap(map);

      _self.calculateAndDisplayRoute(directionsService, directionsDisplay);
      */
  },
  calculateAndDisplayRoute() {
    if(!this.tripPath) {
      var self = this;
      var waypts = [];
      //calculate route for 1 vehicle
      this.state.vehicle.consumers.forEach(function(consumer) {
        waypts.push({location: consumer.address, stopover: true});
      });


      directionsService.route({
        origin: OPTIONS_INC_ADDRESS,
        destination: OPTIONS_INC_ADDRESS,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
      }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {

          self.tripPath = new google.maps.Polyline({
             path: response.routes[0].overview_path,
             geodesic: false,
             strokeColor: '#0088AA',
             strokeOpacity: 0.5,
             strokeWeight: 4
           });

           self.tripPath.setMap(map);


          var route = response.routes[0];
          var summaryPanel = document.getElementById('directions-panel');
          summaryPanel.innerHTML = '';
          // For each route, display summary information.
          for (var i = 0; i < route.legs.length; i++) {
            var routeSegment = i + 1;
            summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment + '</b><br>';
            summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
            summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
            summaryPanel.innerHTML += route.legs[i].distance.text + ' ';
            summaryPanel.innerHTML += route.legs[i].duration.text + '<br><br>';
          }
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });

    }

  },
  loadConsumers: function() {

      var self = this;
      this.state.consumers.forEach(function(consumer, index) {

      var position = consumer.position;

      var icon = ICON_URL + YELLOW;
      var iconOnBoard = ICON_URL + GREEN;
      var marker = new google.maps.Marker({position: position, map: map, title: consumer.name, icon: icon});
      var content = "<div>" + consumer.name + "</div>" + "<div>" + consumer.address + "</div>";

      if (consumer.hasWheelchair) {
        content += '<div><i class="fa fa-wheelchair"></i></div>'
      }
      var infowindow = new google.maps.InfoWindow({content: content});



      marker.addListener('mouseover', function() {
        infowindow.open(map, marker);
      });

      marker.addListener('mouseout', function() {
        infowindow.close();
      });

      marker.addListener('click', function(index) {
        console.log(index);
        var vehicle = self.state.vehicle;
        var consumersOnBoard = self.state.vehicle.consumers;
        var candidateConsumer = self.state.consumers[index];
        var ind = consumersOnBoard.indexOf(candidateConsumer);
        if (ind > -1) {
          consumersOnBoard.splice(ind,1)
          marker.setIcon(icon);
          if (consumer.hasWheelchair) {
            var occupiedWheelchairs = vehicle.occupiedWheelchairs - 1;
            vehicle.consumers = consumersOnBoard;
            vehicle.occupiedWheelchairs = occupiedWheelchairs;
          } else {
            var occupiedSeats = vehicle.occupiedSeats - 1;
            vehicle.consumers = consumersOnBoard;
            vehicle.occupiedSeats = occupiedSeats;
          }

          if(self.tripPath) {
            self.tripPath.setMap(null);
            self.tripPath = null;
            var summaryPanel = document.getElementById('directions-panel');
            summaryPanel.innerHTML = '';
          }
          self.setState({vehicle: vehicle});

        } else {

          if (!candidateConsumer.hasWheelchair
            && vehicle.occupiedSeats < vehicle.totalSeats ) {
            consumersOnBoard.push(self.state.consumers[index]);
            marker.setIcon(iconOnBoard);
            var occupiedSeats = vehicle.occupiedSeats + 1;
            vehicle.consumers = consumersOnBoard;
            vehicle.occupiedSeats = occupiedSeats;

            if(self.tripPath) {
              self.tripPath.setMap(null);
              self.tripPath = null;
              var summaryPanel = document.getElementById('directions-panel');
              summaryPanel.innerHTML = '';
            }
            self.setState({vehicle: vehicle});


          } else if (candidateConsumer.hasWheelchair
            && vehicle.occupiedWheelchairs < vehicle.totalWheelchairs) {
            consumersOnBoard.push(self.state.consumers[index]);
            marker.setIcon(iconOnBoard);
            var occupiedWheelchairs = vehicle.occupiedWheelchairs + 1;
            vehicle.consumers = consumersOnBoard;
            vehicle.occupiedWheelchairs = occupiedWheelchairs;

            if(self.tripPath) {
              self.tripPath.setMap(null);
              self.tripPath = null;
              var summaryPanel = document.getElementById('directions-panel');
              summaryPanel.innerHTML = '';
            }
            self.setState({vehicle: vehicle});
          }
        }
        console.log(self.state.vehicle);
      }.bind(null, index));

    });
  },
  getInitialState: function() {
    return {
      markers: [],
      vehicle: { // We have to made this selectable somehow
        name: 'Test Bus',
        occupiedSeats: 0,
        totalSeats: 3,
        occupiedWheelchairs: 0,
        totalWheelchairs: 1,
        isFull: false,
        consumers: []
      },
      consumers :[{
          name: "Thomas",
          address: "301 Donna Ct, Big Lake, MN 55309, USA",
          position : {lat: 45.3289021, lng: -93.73277439999998}
        }, {
          name: "Percy",
          address: "321 Washington Ave, Big Lake, MN 55309, USA",
          position: {lat: 45.3414832, lng: -93.7440694},
          hasWheelchair: true
        }, {
          name: "James",
          address: "14901 204th Ave NW,Big Lake, MN 55330, USA",
          position: {lat: 45.3418199, lng: -93.77724039999998}
        }, {
          name: "Gordon",
          address: "20083 January St,Big Lake, MN 55309, USA",
          position: {lat: 45.3323147, lng: -93.6875397}
        }, {
          name: "Edward",
          address: "17270 US Highway 10 NW,Big Lake, MN 55309, USA",
          position: {lat: 45.3330214, lng: -93.7109542}
        }, {
          name: "Toby",
          address: "15818 201st Ave NW,Big Lake, MN 55330, USA",
          position: {lat:45.33412389999999, lng: -93.67073979999998},
          hasWheelchair: true
        }]
    }
  },
  render: function() {
    return (
      <div className="content-wrapper">
        <section className="content">
          <div className="row">
            <div className="col-xs-3">
              <button
                className="btn btn-default"
                onClick={this.calculateAndDisplayRoute}
              >
                Get Optimal Route
              </button>
              <Vehicle
                vehicleObject={this.state.vehicle}
              />
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
