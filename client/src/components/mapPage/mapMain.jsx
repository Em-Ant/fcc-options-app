'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var mActions = require('../../actions/mapActions');
var GoogleMapLoader = require('react-google-maps').GoogleMapLoader;
var GoogleMap = require('react-google-maps').GoogleMap;
var InfoWindow = require('react-google-maps').InfoWindow;
var Marker = require('react-google-maps').Marker;
var Polyline = require('react-google-maps').Polyline;
var ConsumerMarkerInfo = require('./consumerMarkerInfo.jsx');
var ClusterInfo = require('./clusterInfo.jsx');
var MarkerClusterer= require("react-google-maps/lib/addons/MarkerClusterer");
const mapConst = require('../../constants/map');

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
    window.addEventListener('resize', this.handleWindowResize);
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
  handleMarkerMouseover:function(marker){
    marker.showInfo = true;
    this.setState(this.state);
  },
  handleMarkerMouseout:function(marker){
    marker.showInfo = false;
    this.setState(this.state);
  },
  renderInfoWindow(marker) {
    var assignedVehicleId = this.props.consumersToVehiclesMap[marker.consumerId];
    return (
      <InfoWindow>
        {
        // HACK:  Have to manually pass store down to component.  For some reason
        // when using google-maps-react, store stops getting passed down to
        // children
       }
        <ConsumerMarkerInfo consumerId={marker.consumerId} store={this.context.store}/>
      </InfoWindow>
    );

  },
  renderClusterInfoWindow(cluster) {
    var self = this;
    return (
      <InfoWindow defaultPosition={cluster.center} onCloseclick={self.handleClusterInfoClose}>
        {
          // HACK:  Have to manually pass store down to component.  For some reason
          // when using google-maps-react, store stops getting passed down to
          // children
        }
        <ClusterInfo
          cluster = {cluster}
          consumers={self.props.consumers}
          vehicles={self.props.vehicles}
          consumersToVehiclesMap={self.props.consumersToVehiclesMap}
          markerClick={self.handleMarkerClick}
          store={self.context.store}
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
              if(map){
                self._googleMapComponent = map;
                self.showError(self.props.error);
              }
            }}
            defaultZoom={12}
            defaultCenter={self.props.optionsIncMarker.position}
            onZoomChanged={self.handleMapZoomChanged}
            controls={self.errorMessage}
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
TODO:  I think this should be in a reducer. I tried adding this to the consumer
reducer, but I couldn't find a way to access
*/
var colorMarkers = function(consumerMarkers, consumersToVehiclesMap, activeVehicleId, highlightedConsumerId, markerLoading) {
return consumerMarkers.map(function(marker){
    var c_id = marker.consumerId;
    var icon = marker.icon;
    if(markerLoading == c_id){
      icon = mapConst.LOADING_CONSUMER_ICON;
    } else if (consumersToVehiclesMap[c_id]) {
      // consumer is on board
      if (highlightedConsumerId == c_id) {
        icon = mapConst.HIGHLIGHTED_CONSUMER_ICON;
      }else if(activeVehicleId !== consumersToVehiclesMap[c_id]){
        icon = mapConst.ASSIGNED_CONSUMER_ICON;// not on the active bus
      }else{
        icon = mapConst.SELECTED_ASSIGNED_CONSUMER_ICON;// on the active bus
      }
    }
    return  Object.assign({}, marker, {
      icon:icon
    })
  });
}

MapMain.contextTypes = {
  store: React.PropTypes.object.isRequired
};
var mapStateToProps = function(state){
  return{
    consumerMarkers: colorMarkers(state.mapPage.consumerMarkers, state.vehicles.consumersToVehiclesMap,state.mapPage.activeVehicleId, state.mapPage.highlightedMarker, state.mapPage.markerLoading),
    optionsIncMarker: state.mapPage.optionsIncMarker,
    consumersToVehiclesMap:state.vehicles.consumersToVehiclesMap,
    vehicles : state.vehicles.data,
    consumers: state.consumers.data,
    activeVehicleId : state.mapPage.activeVehicleId,
    markerLoading: state.mapPage.markerLoading,
    displayDirections: state.mapPage.displayDirections,
    vehiclePath: google.maps.geometry.encoding.decodePath(state.directions.morningRoute.overview_polyline.points),
    error:state.mapPage.error
  }
}
var mapDispatchToProps = function(dispatch) {
  return {
    markerClick:function(c_id, markerLoading, consumersToVehiclesMap, activeVehicleId, vehicles, consumers){
      dispatch(mActions.markerClick(c_id, markerLoading, consumersToVehiclesMap, activeVehicleId, vehicles, consumers))
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(MapMain);
