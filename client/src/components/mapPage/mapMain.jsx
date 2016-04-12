'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var cActions = require('../../actions/consumerActions');
var mActions = require('../../actions/mapActions');
var VehiclePanel = require('./vehiclePanel.jsx')
var _addFlags = require('../../utils/addConsumerFlags');
var vehicleUtils = require('../../utils/vehicleUtils');

// COLORS
var RED = "FE7569";     //options inc address
var YELLOW = "FFD42A";  //assigned to a vehicle
var GREEN = "5AA02C";   //assigned to current selected vehicle
var GREEN_H = "78EA2F";
var GRAY = "A6A6A6";    //unassigned user
var WHITE = "FFFFFF"    // loading state

var ICON_URL =
  "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|";

/**
* THINGS TODO:
* 1. Handle driving directions
* 2. Include bus with foldable seats
* 3. Handle errors with infoboxes
* 4. If possible give a better structure to this huge file
*/

var ConsumerMap = React.createClass({
  map: null,
  consumersToVehiclesMap: null,
  markers: null,
  infoBoxes: null,
  componentDidMount: function() {
    var positionHome = this.props.homePosition
    var map = this.map = new google.maps.Map(document.getElementById('test-map'), {
      center: positionHome,
      zoom: 12
    });
    var iconHome = ICON_URL + RED;
    var markerHome = new google.maps.Marker(
      {
        position: positionHome,
        map: map,
        title: "Options, Inc.",
        icon: iconHome
      });
    var center;

    // centering map on window resize
    google.maps.event.addDomListener(window, 'resize', function(){
      map.setCenter(positionHome);
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
    // Make markers be driven by props is possible only here

    if (nextProps.activeVehicleId !== this.props.activeVehicleId) {
      // active vehicle status has changed
      this.setMarkersColorOnActiveBusChange(
        nextProps.activeVehicleId,
        this.props.activeVehicleId
      );
    }

    if (nextProps.markerLoading && !this.props.markerLoading) {
      // a marker/consumer is in put loading state

      // set loading icon
      this.markers[nextProps.markerLoading].setIcon(ICON_URL + WHITE);
      this.markers[nextProps.markerLoading].setOpacity(0.5);
    }

    if (!nextProps.markerLoading && this.props.markerLoading) {
      // a marker/consumer is removed from loading state

      if (this.consumersToVehiclesMap[this.props.markerLoading]) {
        // consumer is being removed from active bus

        // reset icon to GRAY - unassigned
        this.markers[this.props.markerLoading].setIcon(ICON_URL + GRAY);
        this.markers[this.props.markerLoading].setOpacity(1);

        // remove consumer/marker from the consumer -> vehicle map
        this.consumersToVehiclesMap[this.props.markerLoading] = undefined;
      } else {
        // consumer is being assigned to active bus

        // reset icon to GREEN - on active bus
        this.markers[this.props.markerLoading].setIcon(ICON_URL + GREEN);
        this.markers[this.props.markerLoading].setOpacity(1);

        // set consumer/marker in the consumer -> vehicle map to active vehicle

        this.consumersToVehiclesMap[this.props.markerLoading]
          = this.props.activeVehicleId;
      }

      // update InfoBox, after updating consumer -> vehicles map
      var c_id = this.props.markerLoading;
      var content = this.generateInfoBoxContent(c_id);
      this.infoBoxes[c_id].setContent(content);
    }

    if(nextProps.highlightedMarker !== this.props.highlightedMarker) {
      // marker highlightening change related to name hover in vehicle panel

      if(nextProps.highlightedMarker) {
        this.markers[nextProps.highlightedMarker].setIcon(ICON_URL + GREEN_H);
      } else {
        // this assumes that hover can happen only in the active bus panel.
        // may change in the future
        this.markers[this.props.highlightedMarker].setIcon(ICON_URL + GREEN);
      }

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
          console.err(`Consumer ${c_id} is assigned to 
            ${self.consumersToVehiclesMap[c_id]} and ${v_id}`);
        } else {
          self.consumersToVehiclesMap[c_id] = v_id;
        }
      })
    })
  },
  generateInfoBoxContent: function (c_id) {
    var consumer = this.props.consumers[c_id];
    var vehicleOnBoardId = this.consumersToVehiclesMap[c_id];
    var v_onBoard = this.props.vehicles[vehicleOnBoardId];

    var content = "<div>" + consumer.name + "</div>" + "<div>" + consumer.address + "</div>";

    // add flags div
    var flags = _addFlags(consumer);
    if(flags.needs) {
      content += '<div>' + 'Needs : ' + flags.flagsString + '</div>';
    }

    if (v_onBoard) {
      // assigned to a bus
      content += 'Vehicle: ' + v_onBoard.name + '</div>';
    }

    return content;
  },
  showConsumersMarker: function() {

    var ids = this.props.consumersIds;
    var consumers = this.props.consumers;
    var vehicles = this.props.vehicles;
    var self = this;
    this.markers = {};
    this.infoBoxes = {};
    var markers = this.markers;

    ids.forEach(function(c_id, index) {
      var consumer = consumers[c_id];
      var position = consumer.position;
      var icon = ICON_URL + GRAY;

      var content = self.generateInfoBoxContent(c_id);

        if (self.consumersToVehiclesMap[c_id]) {
          // consumer is on board

          icon = self.props.activeVehicleId
            !== self.consumersToVehiclesMap[c_id]
            ? (ICON_URL + YELLOW)   // not on the active bus
            : (ICON_URL + GREEN);   // on the active bus
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
      self.infoBoxes[c_id] = infowindow;
    })
  },
  markerLeftClick: function (c_id) {
    if(!this.props.markerLoading) {
      // not in loading state
      if (this.consumersToVehiclesMap[c_id]) {
        // marked consumer is on a vehicle

        if (this.consumersToVehiclesMap[c_id] == this.props.activeVehicleId) {
         // marked consumer is on the active vehicle

         this.props.removeConsumerFromActiveBus(c_id, this.props.activeVehicleId);
       } else {
         // marked consumer is not on the active vehicle

         // activate the vehicle which the consumers is on
         this.props.activateVehicleByConsumer(this.consumersToVehiclesMap[c_id]);
       }
      } else {
        // marked consumer is not on a vehicle

        if (this.props.activeVehicleId) {
          // A vehicle is active (A Collapsible Box is open)
          if(vehicleUtils.willConsumerFit(
            c_id, this.props.vehicles[this.props.activeVehicleId], this.props.consumers)){
              this.props.addConsumerToActiveBus(c_id, this.props.activeVehicleId);
            }
        }
      }
    } else {
      console.log('WARN: markers frozen in loading state');
    }
  },

  render: function() {
    return (

      <div className="row">
        <div className="col-md-5 col-sm-5 col-xs-5">

        <VehiclePanel />
        </div>
        <div className="col-md-7 col-sm-7 col-xs-7">
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
    markerLoading: state.mapPage.markerLoading,
    highlightedMarker: state.mapPage.highlightedMarker
  }
}
var mapDispatchToProps = function(dispatch) {
  return {
    loadConsumers: function() {
      dispatch(cActions.loadConsumers());
    },
    activateVehicleByConsumer: function(vehicleId) {
      dispatch(mActions.vehicleBoxClick(vehicleId))
    },
    addConsumerToActiveBus: function(c_id, active_v_id) {
      dispatch(mActions.addToActiveBus(c_id, active_v_id))
    },
    removeConsumerFromActiveBus: function(c_id, active_v_id) {
      dispatch(mActions.removeFromActiveBus(c_id, active_v_id))
    }
  }
}

var ConsumerMapContainer = connect(mapStateToProps, mapDispatchToProps)(ConsumerMap);
module.exports = ConsumerMapContainer;
