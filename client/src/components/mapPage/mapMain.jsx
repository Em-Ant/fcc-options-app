'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var cActions = require('../../actions/consumerActions');
var mActions = require('../../actions/mapActions');
var vehicleUtils = require('../../utils/vehicleUtils');
var GoogleMapLoader = require('react-google-maps').GoogleMapLoader;
var GoogleMap = require('react-google-maps').GoogleMap;
var InfoWindow = require('react-google-maps').InfoWindow;
var Marker = require('react-google-maps').Marker;
var Polyline = require('react-google-maps').Polyline;
var ConsumerMarkerInfo = require('./consumerMarkerInfo.jsx');
var ClusterInfo = require('./clusterInfo.jsx');
var MarkerClusterer= require("react-google-maps/lib/addons/MarkerClusterer");


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
* 3. Handle errors with infoboxes
*/
var map;

var ConsumerMap = React.createClass({
  _googleMapComponent:null,
  handleWindowResize:function(){
    //center map on options inc marker
    this._googleMapComponent.panTo(this.props.optionsIncMarker.position);

  },
  componentDidMount: function() {
    window.addEventListener('resize', this.handleWindowResize);
  },
  getInitialState:function(){
    return {

    }
  },
  handleMarkerClick: function(c_id){
    if(!this.props.markerLoading) {
      // not in loading state
      if (this.props.consumersToVehiclesMap[c_id]) {
        // marked consumer is on a vehicle

        if (this.props.consumersToVehiclesMap[c_id] == this.props.activeVehicleId) {
         // marked consumer is on the active vehicle

         this.props.removeConsumerFromActiveBus(
           c_id,
           this.props.vehicles[this.props.activeVehicleId]
         );
       } else {
         // marked consumer is not on the active vehicle

         // activate the vehicle which the consumers is on
         this.props.activateVehicleByConsumer(this.props.consumersToVehiclesMap[c_id]);
       }
      } else {
        // marked consumer is not on a vehicle

        if (this.props.activeVehicleId) {
          // A vehicle is active (A Collapsible Box is open)
          if(vehicleUtils.willConsumerFit(
            c_id, this.props.vehicles[this.props.activeVehicleId], this.props.consumers)){
              this.props.addConsumerToActiveBus(
                c_id,
                this.props.vehicles[this.props.activeVehicleId]
              );
            }
        }
      }
    } else {
      console.log('WARN: markers frozen in loading state');
    }
  },
  handleMarkerMouseover:function(marker){

    //TODO dispatch action to redux to do this
    marker.showInfo = true;
    this.setState(this.state);
  },
  handleMarkerMouseout:function(marker){

    //TODO dispatch action to redux to do this
    marker.showInfo = false;
    this.setState(this.state);
  },
  renderInfoWindow(marker) {
    //TODO redux should generate this stuff
    var consumer = this.props.consumers[marker.consumerId];
    var assignedVehicleId = this.props.consumersToVehiclesMap[marker.consumerId];
    var assignedVehicle = this.props.vehicles[assignedVehicleId];
    return (
      <InfoWindow>
        <ConsumerMarkerInfo consumer = {consumer} assignedVehicle = {assignedVehicle}/>
      </InfoWindow>
    );

  },
  renderClusterInfoWindow(cluster) {
    //TODO redux should generate this stuff
    var self = this;
    return (
      <InfoWindow defaultPosition={cluster.center} onCloseclick={self.handleClusterInfoClose}>
        <ClusterInfo
          cluster = {cluster}
          consumers={self.props.consumers}
          vehicles={self.props.vehicles}
          consumersToVehiclesMap={self.props.consumersToVehiclesMap}
          markerClick={self.handleMarkerClick}
        >
        </ClusterInfo>
      </InfoWindow>
    );
  },
  handleMapZoomChanged:function(){
    //close all cluster info windows
    this.handleClusterInfoClose();
  },
  handleClusterMouseover:function(cluster_){
    var cluster = {
      markers:cluster_.markers_.slice(),
      center:cluster_.getCenter()
    }
    var state = Object.assign({}, this.state, {
      cluster:cluster
    })
    this.setState(state);
  },
  handleClusterInfoClose:function(cluster){
    var state = Object.assign({}, this.state, {
      cluster:null
    })
    this.setState(state);
  },
  render: function() {
    var self = this;
    return (
    <section style={{height: "100%"}}>
      <GoogleMapLoader
        containerElement={
          <div
            style={{
              height: "100%",
            }}
          />
        }
        googleMapElement={
          <GoogleMap
            ref={function(map){
              self._googleMapComponent = map;
            }}
            defaultZoom={12}
            defaultCenter={self.props.optionsIncMarker.position}
            onZoomChanged={self.handleMapZoomChanged}
            >
            <Marker
              position={self.props.optionsIncMarker.position}
              title={self.props.optionsIncMarker.title}
              icon={self.props.optionsIncMarker.icon}/>
            <MarkerClusterer
              ref="markerClusterer"
              averageCenter
              enableRetinaIcons
              gridSize={ 1 }
              onMouseover={this.handleClusterMouseover}
            >
            {
            this.state.cluster?
            self.renderClusterInfoWindow(this.state.cluster) : null
            }

            {self.props.consumerMarkers.map(function(marker, index){
              const markerRef = 'marker_' + index;
              return(
                <Marker
                  key={index}
                  ref= {function(refMarker){
                    //HACK:  don't know any other way for the cluster to see
                    //the consumer id
                    if(refMarker){
                      refMarker.state.marker.consumerId=marker.consumerId;
                    }
                  }}
                  position={marker.position}
                  title = {marker.name}
                  icon={marker.icon}
                  onClick={self.handleMarkerClick.bind(null,marker.consumerId)}
                  onMouseover={self.handleMarkerMouseover.bind(null, marker)}
                  onMouseout={self.handleMarkerMouseout.bind(null, marker)}>
                  {marker.showInfo ? self.renderInfoWindow(marker) : null}
                </Marker>
              )
            })}
            </MarkerClusterer>
            {self.props.displayDirections?
            <Polyline
              path={self.props.vehiclePath}
              options={{
                geodesic: false,
                strokeColor: '#0088AA',
                strokeOpacity: 0.5,
                strokeWeight: 4
              }}
              ></Polyline>
              :null
            }
          </GoogleMap>
        }
      />
    </section>
  );
  }

});

/*
TODO:  I think this should be in a reducer.  
*/
var calculateAssignedVehicle = function(consumerMarkers, consumersToVehiclesMap, activeVehicleId) {
  return consumerMarkers.map(function(marker){
    var c_id = marker.consumerId;
    if (consumersToVehiclesMap[c_id]) {
      // consumer is on board
      var icon;
      if(activeVehicleId !== consumersToVehiclesMap[c_id]){
        icon = ICON_URL + YELLOW;// not on the active bus
      }else{
        icon = ICON_URL + GREEN;// on the active bus
      }
      return  Object.assign({}, marker, {
        icon:icon
      })
    }
    return marker;
  });
}
var mapStateToProps = function(state){
  return{
    consumerMarkers: calculateAssignedVehicle(state.mapPage.consumerMarkers, state.vehicles.consumersToVehiclesMap,state.mapPage.activeVehicleId),
    optionsIncMarker: state.mapPage.optionsIncMarker,
    consumersToVehiclesMap:state.vehicles.consumersToVehiclesMap,
    vehicles : state.vehicles.data,
    consumers: state.consumers.data,
    activeVehicleId : state.mapPage.activeVehicleId,
    markerLoading: state.mapPage.markerLoading,
    displayDirections: state.mapPage.displayDirections,
    vehiclePath: google.maps.geometry.encoding.decodePath(state.directions.morningRoute.overview_polyline.points)
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
    removeConsumerFromActiveBus: function(c_id, active_v) {
      dispatch(mActions.removeFromActiveBus(c_id, active_v))
    }
  }
}

var ConsumerMapContainer = connect(mapStateToProps, mapDispatchToProps)(ConsumerMap);
module.exports = ConsumerMapContainer;
