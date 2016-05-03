'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var mActions = require('../../actions/mapActions');
var GoogleMapLoader = require('react-google-maps').GoogleMapLoader;
var GoogleMap = require('react-google-maps').GoogleMap;
var InfoWindow = require('react-google-maps').InfoWindow;
var Marker = require('react-google-maps').Marker;
var Polyline = require('react-google-maps').Polyline;
//var ConsumerMarkerInfo = require('./consumerMarkerInfo.jsx');
//var ClusterInfo = require('./clusterInfo.jsx');
//var MarkerClusterer= require("react-google-maps/lib/addons/MarkerClusterer");
const mapConst = require('../../constants/map');
var _ = require('lodash');
var clusterMouseoverTimer = null;
/*
Marker Wrapper to speed up performance
*/
var WMarker = React.createClass({
  //Needed to speed up marker performance
  shouldComponentUpdate(nextProps,nextState){
    return (nextProps.icon.fillColor != this.props.icon.fillColor ||
            nextProps.showInfo != this.props.showInfo)
  },
  render: function() {
    return <Marker {...this.props}/>
  }
})

var MapMain = React.createClass({
  _googleMapComponent:null,
  alertDiv:null,
  handleWindowResize:function(){
    //center map on options inc marker
    if( this._googleMapComponent) {
      this._googleMapComponent.panTo(this.props.optionsIncMarker.position);
    }
  },
  componentDidMount: function() {
    //window.addEventListener('resize', this.handleWindowResize);
  },
  componentDidUpdate:function(prevProps){
    if(this.props.centerMarker != null &&
      (prevProps.centerMarker== null || this.props.centerMarker.consumerId != prevProps.centerMarker.consumerId)){
      if(prevProps.centerMarker) {
        this.props.markerInfoClose(prevProps.centerMarker)
      }
      this.centerMarker(this.props.centerMarker);

    }
  },
  centerMarker:function(marker){
    var self = this;
    this._googleMapComponent.panTo(marker.position);
    // this listener allows us to wait for the clusters to form
    google.maps.event.addListenerOnce(this._googleMapComponent.props.map, 'idle', function(){
      self.props.markerInfoOpen(marker);
    })
  },
  makeErrorControl(controlDiv, error) {
    //clear div
    while (controlDiv.firstChild) controlDiv.removeChild(controlDiv.firstChild);

    if(error != null){
      var alertDiv = document.createElement('div');
      alertDiv.className="alert alert-danger alert-dismissible map-alert";
      alertDiv.innerHTML = error;
      controlDiv.appendChild(alertDiv);
    }
  },
  showError:function(error){
    // google-maps-react doesn't support custom controls, so this has to be
    // set up manually
    if(!this.alertDiv){
      var map = this._googleMapComponent.props.map;
      this.alertDiv = document.createElement('div');
      map.controls[google.maps.ControlPosition.TOP_CENTER].push(this.alertDiv);
    }
    this.makeErrorControl(this.alertDiv, error);

  },
  getInitialState:function(){
    return {
    }
  },
  handleMarkerClick: function(c_id){
    this.props.markerClick(c_id, this.props.markerLoading,
      this.props.consumersToVehiclesMap, this.props.activeVehicleId,
      this.props.vehicles, this.props.consumers);
  },
  renderInfoWindow(marker) {
    var assignedVehicleId = this.props.consumersToVehiclesMap[marker.consumerId];
    return (
      <InfoWindow onCloseclick={this.props.markerInfoClose.bind(null, marker)}>
        {
        // HACK:  Have to manually pass store down to component.  For some reason
        // when using google-maps-react, store stops getting passed down to
        // children
       }
        <ConsumerMarkerInfo consumerId={marker.consumerId} store={this.context.store}/>
      </InfoWindow>
    );

  },
  render: function() {
    var self = this;
    return (

        <div className="box box-widget map-height">
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
              if(map){
                self._googleMapComponent = map;
                self.showError(self.props.error);
              }
            }}
            defaultZoom={12}
            defaultCenter={self.props.optionsIncMarker.position}
            onZoomChanged={self.props.mapZoomChanged}
            controls={self.errorMessage}
            >
            <WMarker
              position={self.props.optionsIncMarker.position}
              title={self.props.optionsIncMarker.title}
              icon={self.props.optionsIncMarker.icon}/>
            {self.props.consumerMarkers.map(function(marker, index){
              return(
                <WMarker
                  key={index}
                  position={marker.position}
                  title = {marker.name}
                  icon={marker.icon}
                  onClick={self.handleMarkerClick.bind(null,marker.consumerId)}
                  onMouseover={self.props.markerMouseover.bind(null, marker)}
                  onMouseout={self.props.markerMouseout.bind(null, marker)}>
                </WMarker>
              )
            })}
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

  </div>
  );
  }

});

MapMain.contextTypes = {
  store: React.PropTypes.object.isRequired
};

import { colorMarkers } from '../../selectors'
var mapStateToProps = function(state, ownProps){
  var consumerMarkers = state.mapPage.consumerMarkers.filter(function(consumerMarker){
    return state.vehicles.consumersToVehiclesMap[consumerMarker.consumerId] == ownProps.vehicleId
  })
  return {
    //neededSeatings : neededSeatings(state.consumers.data),
    //availableSeatings : availableSeatings(state.vehicles.data),
    consumerMarkers: consumerMarkers,
    optionsIncMarker: state.mapPage.optionsIncMarker,
    consumersToVehiclesMap:state.vehicles.consumersToVehiclesMap,
    vehicles : state.vehicles.data,
    consumers: state.consumers.data,
    consumersIds: state.consumers.ids,
    activeVehicleId : state.mapPage.activeVehicleId,
    markerLoading: state.mapPage.markerLoading,
    displayDirections: state.mapPage.displayDirections,
    vehiclePath: google.maps.geometry.encoding.decodePath(state.directions.morningRoute.overview_polyline.points),
  }
}
var mapDispatchToProps = function(dispatch) {
  return {
    markerClick:function(c_id, markerLoading, consumersToVehiclesMap, activeVehicleId, vehicles, consumers){
      dispatch(mActions.markerClick(c_id, markerLoading, consumersToVehiclesMap, activeVehicleId, vehicles, consumers))
    },
    mapZoomChanged:function(){
      dispatch(mActions.mapZoomChanged())
    },
    markerMouseover:function(marker){
      dispatch(mActions.markerInfoOpen(marker))
    },
    markerInfoOpen:function(marker){
      dispatch(mActions.markerInfoOpen(marker))
    },
    markerMouseout:function(marker){
      dispatch(mActions.markerInfoClose(marker))
    },
    markerInfoClose:function(marker){
      dispatch(mActions.markerInfoClose(marker))
    }

  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(MapMain);
