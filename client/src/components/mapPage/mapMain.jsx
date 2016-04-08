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
var WHITE = "FFFFFF"    // loading state

var VehiclePanel = require('./vehiclePanel.jsx')

var _addFlags = require('../../utils/addConsumerFlags');

var ConsumerMap = React.createClass({
  map: null,
  consumersToVehiclesMap: null,
  markers: null,
  componentDidMount: function() {
    var positionHome = this.props.homePosition
    this.map = new google.maps.Map(document.getElementById('test-map'), {
      center: positionHome,
      zoom: 12
    });
    var iconHome = ICON_URL + RED;
    var markerHome = new google.maps.Marker(
      {
        position: positionHome,
        map: this.map,
        title: "Options, Inc.",
        icon: iconHome
      });

    this.mapConsumersToVehicles();
    this.showConsumersMarker();
  },
  setMarkersColorOnActiveBusChange: function (
    nextActiveVehicleId, currActiveVehicleId) {

    var self = this;
    if (nextActiveVehicleId) {
      // next state has an active vehicle
      var prevActiveVehicle = null;
      var consumersOnPrevActive = [];
      if (currActiveVehicleId) {
        // there is a previously active vehicle. Reset its markers
        prevActiveVehicle = this.props.vehicles[currActiveVehicleId];
        consumersOnPrevActive = prevActiveVehicle.consumers;
      }
      consumersOnPrevActive.forEach(function(c_id){
        self.markers[c_id].setIcon(ICON_URL + YELLOW);
      })
      // set markers for next active vehicle
      var nextActiveVehicle = this.props.vehicles[nextActiveVehicleId];
      var consumersOnNextActive = nextActiveVehicle.consumers;
      consumersOnNextActive.forEach(function(c_id){
        self.markers[c_id].setIcon(ICON_URL + GREEN);
      })
    } else {
      // vehicle deactivated: all vehicle inactive
      var prevActiveVehicle = this.props.vehicles[currActiveVehicleId];
      var consumersOnPrevActive = prevActiveVehicle.consumers;
      consumersOnPrevActive.forEach(function(c_id){
        self.markers[c_id].setIcon(ICON_URL + YELLOW);
      })
    }
  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.activeVehicleId !== this.props.activeVehicleId) {
      // active vehicle status has changed
      this.setMarkersColorOnActiveBusChange(
        nextProps.activeVehicleId,
        this.props.activeVehicleId
      );
    }

    if (nextProps.markerLoading && !this.props.markerLoading) {
      // a marker/consumer is in put loading state
      console.log('marker loading');
      this.markers[nextProps.markerLoading].setIcon(ICON_URL + WHITE);
      this.markers[nextProps.markerLoading].setOpacity(0.5);
    }

    if (!nextProps.markerLoading && this.props.markerLoading) {
      // a marker/consumer is removed from loading state
      console.log('marker loading end');
      this.markers[this.props.markerLoading].setIcon(ICON_URL + GRAY);
      this.markers[this.props.markerLoading].setOpacity(1);
    }
  },
  mapConsumersToVehicles: function() {
    // NOTE this should be moved into a reducer,
    // Now this function is called on every rendering

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
  },
  showConsumersMarker: function() {

    var ids = this.props.consumersIds;
    var consumers = this.props.consumers;
    var vehicles = this.props.vehicles;
    var self = this;
    this.markers = {};
    var markers = this.markers;

    ids.forEach(function(c_id, index) {
      var consumer = consumers[c_id];
      var position = consumer.position;
      var icon = ICON_URL + GRAY;

      var content = "<div>" + consumer.name + "</div>" + "<div>" + consumer.address + "</div>";

      // add flags div
      var flags = _addFlags(consumer);
      if(flags.needs) {
        content += '<div>' + 'Needs : ' + flags.flagsString + '</div>';
      }

      var v_id = self.consumersToVehiclesMap[c_id];
      if (v_id) {
        // assigned to a bus
        icon = v_id !== self.props.activeVehicleId ?
          (ICON_URL + YELLOW)   // not active on bus
          : (ICON_URL + GREEN); // on active bus
        content += 'Vehicle: ' + vehicles[v_id].name + '</div>';
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

      marker.addListener('click', self.markerLeftClick.bind(null, c_id));

      markers[c_id] = marker;
    })
  },
  markerLeftClick: function (c_id) {
    if (this.consumersToVehiclesMap[c_id]) {
      // marked consumer is on a vehicle
      if (this.consumersToVehiclesMap[c_id] == this.props.activeVehicleId) {
       // marked consumer is on the active vehicle
       console.log('on board active');
     } else {
       // marked consumer is not on the active vehicle
       console.log('on board not active');
     }
    } else {
      // marked consumer is not on a vehicle
      console.log('not on board');
    }

  },

  render: function() {
    return (

          <div className="row">
            <div className="col-md-3 col-sm-4 col-xs-5">

            <VehiclePanel />
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
    consumers: state.consumers.data,
    activeVehicleId : state.mapPage.activeVehicleId,
    markerLoading: state.mapPage.markerLoading
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
