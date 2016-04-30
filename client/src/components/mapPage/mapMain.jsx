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
var _ = require('lodash');
var clusterMouseoverTimer = null;

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
  componentDidUpdate:function(prevProps){
    if(this.props.centerMarker != null &&
      (prevProps.centerMarker== null || this.props.centerMarker.consumerId != prevProps.centerMarker.consumerId)){
      if(prevProps.centerMarker) {
        this.props.markerInfoClose(prevProps.centerMarker)
      }
      this.centerMarker(this.props.centerMarker);

    }
  },
  clusterMouseover:function(cluster_){
    var self = this;
    this.clearClusterTimer();
    //Copy object because sometimes cluster_.markers_ changes when timer is up.
    var cluster = Object.assign({}, cluster_, {
      center:cluster_.getCenter(),
      markers_:cluster_.markers_.slice()
    } );
    clusterMouseoverTimer=setTimeout(function(){
      self.props.clusterMouseover(cluster);
    }, mapConst.CLUSTER_MOUSEOVER_TIMEOUT_INTERVAL)

  },
  clearClusterTimer:function(){
    clearTimeout(clusterMouseoverTimer);
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
  renderClusterInfoWindows(clusters) {
    var self = this;
    return clusters.map(function(cluster, index){
      return (
        <InfoWindow key={cluster.center.lat() + cluster.center.lng()} defaultPosition={cluster.center} onCloseclick={self.props.clusterInfoClose.bind(null, cluster)}>
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
    })

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
            onZoomChanged={self.props.mapZoomChanged}
            controls={self.errorMessage}
            >
            <Marker
              position={self.props.optionsIncMarker.position}
              title={self.props.optionsIncMarker.title}
              icon={self.props.optionsIncMarker.icon}/>
            {
            // <MarkerClusterer
            //   ref="markerClusterer"
            //   averageCenter
            //   enableRetinaIcons
            //   gridSize={ 1 }
            //   onMouseover={self.clusterMouseover}
            //   onMouseout={self.clearClusterTimer}
            //   onClusteringend={this.props.onClusteringend}
            // >
          }
            {
            // this.props.displayClusters.length > 0?
            // self.renderClusterInfoWindows(this.props.displayClusters) : null
            //
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
                  onMouseover={self.props.markerMouseover.bind(null, marker)}
                  onMouseout={self.props.markerMouseout.bind(null, marker)}>
                  {marker.showInfo ? self.renderInfoWindow(marker) : null}
                </Marker>
              )
            })}
            {
            //</MarkerClusterer>
            }
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
      icon.fillColor =  mapConst.LOADING_CONSUMER_COLOR;
    }
    else if (consumersToVehiclesMap[c_id]) {
      // consumer is on board
      if (highlightedConsumerId == c_id) {
        icon.fillColor =  mapConst.HIGHLIGHTED_CONSUMER_COLOR;
      }else if(activeVehicleId !== consumersToVehiclesMap[c_id]){
        icon.fillColor =  mapConst.ASSIGNED_CONSUMER_COLOR;// not on the active bus
      }else{
        icon.fillColor =  mapConst.SELECTED_ASSIGNED_CONSUMER_COLOR;// on the active bus
      }
    }
    else{
      //consumer not assigned to vehicle
      if (highlightedConsumerId == c_id) {
        icon.fillColor = mapConst.HIGHLIGHTED_UNASSIGNED_COLOR;
      }else{
        icon.fillColor = mapConst.UNASSIGNED_CONSUMER_COLOR;
      }
    }
    return  Object.assign({}, marker, {
      icon:icon
    })
  });
}

function neededSeatings(consumers) {
  var neededSeats = 0;
  var neededWheelchairs = 0;
  for (var key in consumers) {
    var c = consumers[key];
    if (c.hasWheelchair) {
      neededWheelchairs++;
    } else if (c.needsTwoSeats) {
      neededSeats += 2;
    } else {
      neededSeats++;
    }
  }
  var neededSeatings = {seats: neededSeats, wheelchairs: neededWheelchairs};
//  console.log('needs', neededSeatings);
  return neededSeatings;
}
function availableSeatings(vehicles) {
  var availableSeats = 0;
  var availableWheelchairs = 0;
  var availableFlexseats = 0;
  for (var key in vehicles) {
    var v = vehicles[key];
    availableSeats += v.seats;
    availableWheelchairs += v.wheelchairs;
    availableFlexseats += v.flexSeats;
  }
  var availableSeatings = {
    seats: availableSeats,
    wheelchairs: availableWheelchairs,
    flexSeats: availableFlexseats
  }
//  console.log('available', availableSeatings);
  return availableSeatings;
}

MapMain.contextTypes = {
  store: React.PropTypes.object.isRequired
};
var mapStateToProps = function(state){
  return {
    //neededSeatings : neededSeatings(state.consumers.data),
    //availableSeatings : availableSeatings(state.vehicles.data),
    consumerMarkers: colorMarkers(state.mapPage.consumerMarkers, state.vehicles.consumersToVehiclesMap,state.mapPage.activeVehicleId, state.mapPage.highlightedMarker, state.mapPage.markerLoading),
    optionsIncMarker: state.mapPage.optionsIncMarker,
    consumersToVehiclesMap:state.vehicles.consumersToVehiclesMap,
    vehicles : state.vehicles.data,
    consumers: state.consumers.data,
    consumersIds: state.consumers.ids,
    activeVehicleId : state.mapPage.activeVehicleId,
    markerLoading: state.mapPage.markerLoading,
    displayDirections: state.mapPage.displayDirections,
    vehiclePath: google.maps.geometry.encoding.decodePath(state.directions.morningRoute.overview_polyline.points),
    error:state.mapPage.error,
    displayClusters: state.mapPage.displayClusters,
    centerMarker: state.mapPage.centerMarker
  }
}
var mapDispatchToProps = function(dispatch) {
  return {
    markerClick:function(c_id, markerLoading, consumersToVehiclesMap, activeVehicleId, vehicles, consumers){
      dispatch(mActions.markerClick(c_id, markerLoading, consumersToVehiclesMap, activeVehicleId, vehicles, consumers))
    },
    clusterMouseover:function(cluster_){
      dispatch(mActions.clusterMouseover(cluster_))
    },
    clusterInfoClose:function(cluster){
      dispatch(mActions.clusterInfoClose(cluster))
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
    },
    onClusteringend:function(markerClusterer){
      dispatch(mActions.saveClusters(markerClusterer.clusters_))
    }

  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(MapMain);
