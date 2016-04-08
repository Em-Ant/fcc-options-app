'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var actions = require('../../actions/consumerActions');

var ICON_URL = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|";

// var directionsService = new google.maps.DirectionsService;

// COLORS
var RED = "FE7569";     //options inc address
var YELLOW = "FFD42A";  //assigned to a vehicle
var GREEN = "5AA02C";   //assigned to current selected vehicle
var BLUE = "0088AA";
var GRAY = "A6A6A6";    //unassigned user

var VehiclePanel = require('./vehiclePanel.jsx')

var ConsumerMap = React.createClass({
  map: null,
  consumersToVehiclesMap: undefined,
  componentDidMount: function() {
    var positionHome = this.props.homePosition
    this.map = new google.maps.Map(document.getElementById('test-map'), {
      center: positionHome,
      zoom: 12
    });
    var iconHome = ICON_URL + RED;
    var markerHome = new google.maps.Marker(
      {position: positionHome, map: this.map, title: "Options, Inc.", icon: iconHome});

    this.mapConsumersToVehicles();
    this.showConsumersMarker();
  },
  // NOTE this should be moved into a reducer,
  // Now this function is called on every rendering
  mapConsumersToVehicles: function() {    
    if (!this.consumersToVehiclesMap) {
      var self = this;
      self.consumersToVehiclesMap = {};
      this.props.vehiclesIds.forEach(function(v_id) {
        var vehicle = self.props.vehicles[v_id];
        vehicle.consumers.forEach(function(c_id){
          if(self.consumersToVehiclesMap[c_id]) {
            throw new Error ("Consumer assigned to more than one vehicle");
          } else {
            self.consumersToVehiclesMap[c_id] = v_id;
          }
        })
      })
    }
  },
  showConsumersMarker: function() {
    var ids = this.props.consumersIds;
    var consumers = this.props.consumers;
    var vehicles = this.props.vehicles;
    var self = this;
    var markers = {};

    ids.forEach(function(c_id, index) {
      var consumer = consumers[c_id];
      var position = consumer.position;
      var icon = ICON_URL + GRAY;

      var content = "<div>" + consumer.name + "</div>" + "<div>" + consumer.address + "</div>";
      if (consumer.hasWheelchair) {
        content += '<div><i class="fa fa-wheelchair"></i></div>';
      }

      var v_id = self.consumersToVehiclesMap[c_id];
      if (v_id) {
        // assigned to a bus
        icon = ICON_URL + YELLOW;
        content += '<div><i class="fa fa-bus"></i> ' + vehicles[v_id].name + '</div>'
      }

      var marker = new google.maps.Marker(
        {position: position, map: self.map, title: consumer.name, icon: icon});


      var infowindow = new google.maps.InfoWindow({content: content});

      marker.addListener('mouseover', function() {
        infowindow.open(self.map, marker);
      });

      marker.addListener('mouseout', function() {
        infowindow.close();
      });

      markers[c_id] = marker;
    })

    this.setState({
      markers:markers
    })
  },

  render: function() {
    return (

          <div className="row">
            <div className="col-md-3 col-sm-4 col-xs-5">

            <VehiclePanel/>
            </div>
            <div className="col-md-9 col-sm-8 col-xs-6">
              <div className="box box-widget map-height">
              <div id="test-map" className="map-height"></div>
              </div>
              <div id="directions-panel"></div>
            </div>
          </div>

    );
  }

});

var mapStateToProps = function(state){
  return{
    homePosition: state.settings.optionsIncCoords,
    consumersIds: state.consumers.ids,
    vehiclesIds: state.vehicles.ids,
    vehicles : state.vehicles.data,
    consumers: state.consumers.data
  }
}
var mapDispatchToProps = function(dispatch) {
  return {
    loadConsumers: function() {
      dispatch(actions.loadConsumers());
    }
  }
}

var ConsumerMapContainer = connect(mapStateToProps, mapDispatchToProps)(ConsumerMap);
module.exports = ConsumerMapContainer;
