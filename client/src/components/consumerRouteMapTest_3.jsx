'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var actions = require('../actions/consumerActions');

var ICON_URL = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|";
var OPTIONS_INC_ADDRESS = '16820 197th Ave NW,Big Lake, MN 55309, USA';
var OPTIONS_INC_POSITION = {lat: 45.3292957, lng: -93.69755090000001};

var geocoder = new google.maps.Geocoder();
var directionsDisplay = new google.maps.DirectionsRenderer;
var directionsService = new google.maps.DirectionsService;

// COLORS
var RED = "FE7569";     //options inc address
var YELLOW = "FFD42A";  //assigned to a vehicle
var GREEN = "5AA02C";   //assigned to current selected vehicle
var BLUE = "0088AA";
var GRAY = "A6A6A6";    //unassigned user

var VehiclePanel = require('./vehiclePanel.jsx')

var ConsumerMap = React.createClass({
  tripPath: null,
  map: null,
  componentDidMount: function() {
    this.map = new google.maps.Map(document.getElementById('test-map'), {
      center: OPTIONS_INC_POSITION,
      zoom: 12
    });

    this.showConsumersMarker(this.props.consumersIds, this.props.consumers);
  },
  showConsumersMarker: function(ids, consumers) {
    var self = this;
    var markers = {};
    ids.forEach(function(id, index) {
      var consumer = consumers[id];
      var position = consumer.position;

      var iconUnassigned = ICON_URL + GRAY;
      /*
      var iconOnBoard = ICON_URL + GREEN;
      var iconAssigned = ICON_URL + YELLOW;
      //get icon */
      var icon = iconUnassigned;
      var marker = new google.maps.Marker(
        {position: position, map: self.map, title: consumer.name, icon: icon});

      var content = "<div>" + consumer.name + "</div>" + "<div>" + consumer.address + "</div>";
      if (consumer.hasWheelchair) {
        content += '<div><i class="fa fa-wheelchair"></i></div>';
        console.log(content);
      }
      var infowindow = new google.maps.InfoWindow({content: content});

      marker.addListener('mouseover', function() {
        infowindow.open(self.map, marker);
      });

      marker.addListener('mouseout', function() {
        infowindow.close();
      });

      markers[id] = marker;
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
    consumersAreLoaded: state.consumers.isLoaded,
    consumersIds: state.consumers.ids,
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
