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
const mapConst = require('../../constants/map');
var _ = require('lodash');
var clusterMouseoverTimer = null;
var _markerClusterer = null;
var repaintTimer = null;

/*
Marker Wrapper to speed up performance
*/
var WMarkerComponent = React.createClass({
  marker:null,
  //Needed to speed up marker performance
  shouldComponentUpdate(nextProps,nextState){
    return (nextProps.icon.fillColor != this.props.icon.fillColor ||
            nextProps.showInfo != this.props.showInfo)
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
  clusterMouseout:function(){
    clearTimeout(clusterMouseoverTimer);
  },
  clearClusterTimer:function(){
    clearTimeout(clusterMouseoverTimer);
  },
  componentDidMount:function(){
    var self = this;
    if(!_markerClusterer){
      _markerClusterer = new MarkerClusterer(self.marker.state.marker.map,[],{
        gridSize:1,
        averageCenter:true,
        enableRetinaIcons: true,
        clusterClass: 'cluster cluster_gray_circle'
      });

      google.maps.event.addListener(_markerClusterer, "mouseover", function (c) {
        self.clusterMouseover(c);
      });
      google.maps.event.addListener(_markerClusterer, "mouseout", function (c) {
        self.clusterMouseout(c);
      });
      google.maps.event.addListener(_markerClusterer, "clusteringend", self.props.onClusteringend);
    }
    if(self.marker && self.marker.state && self.props.consumerId){
      self.marker.state.marker.consumerId=self.props.consumerId;
      var index = _markerClusterer.markers_.findIndex(function(marker,index){
        return (marker.consumerId == self.props.consumerId)
      })
      if(index == -1){
        _markerClusterer.addMarker(self.marker.state.marker)
      }
    }
  },
  componentWillUnmount:function(){
    // Needed to make filtering work properly
    if(this.marker && _markerClusterer){
      var result = _markerClusterer.removeMarker(this.marker.state.marker, true)
      clearTimeout(repaintTimer);
      repaintTimer=setTimeout(function(){
        _markerClusterer.repaint();
      }, 200)
    }
  },
  componentDidUpdate:function(prevProps){
    if(prevProps.icon.fillColor != this.props.icon.fillColor){
      clearTimeout(repaintTimer);
      repaintTimer=setTimeout(function(){
        _markerClusterer.repaint();
      }, 200)
    }
  },
  render: function() {
    var self = this;
    return <Marker ref={function(marker){
        self.marker = marker;
      }
      }{...this.props}/>
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
  getClusterColor:function(markers){
    var self = this;
    var unassignedConsumerExists = markers.some(function(marker){
      return !self.props.consumersToVehiclesMap[marker.consumerId]
    })
    if(unassignedConsumerExists){
      return mapConst.UNASSIGNED_CONSUMER_COLOR;
    }
    var consumerOnActiveVehicleExists = markers.some(function(marker){
      var vehicleId = self.props.consumersToVehiclesMap[marker.consumerId]
      return self.props.activeVehicleId == vehicleId;
    })
    if(consumerOnActiveVehicleExists){
      return mapConst.SELECTED_ASSIGNED_CONSUMER_COLOR;
    }

    return mapConst.ASSIGNED_CONSUMER_COLOR;
  },
  componentDidMount: function() {
    var self = this;

    /*
    Overwrite the Cluster icon's createCss function to modify size and color of cluster
    */
    ClusterIcon.prototype.createCss = function(pos) {
      var color = self.getClusterColor(this.cluster_.getMarkers());
      var size = Math.min(this.cluster_.getMarkers().length + 10,
          100 //possible max-size of a cluster-icon
        ),
        style = ['border-radius : 50%',
          'line-height   : ' + size + 'px',
          'cursor        : pointer',
          'position      : absolute',
          'top           : ' + pos.y + 'px',
          'left          : ' + pos.x + 'px',
          'width         : ' + size + 'px',
          'height        : ' + size + 'px',
          'background    : ' + color
        ];
      return style.join(";") + ';';
    };
    /*
    Overwrite the Cluster icon's useStyle function to modify size and color of cluster
    */
    ClusterIcon.prototype.useStyle = function (sums) {
      var size = Math.min(this.cluster_.getMarkers().length + 10,
        100 //possible max-size of a cluster-icon
      );
      this.sums_ = sums;
      var index = Math.max(0, sums.index - 1);
      index = Math.min(this.styles_.length - 1, index);
      var style = this.styles_[index];
      this.url_ = "";
      this.height_ = size;
      this.width_ = size;
      this.anchorText_ = style.anchorText || [0, 0];
      this.anchorIcon_ = style.anchorIcon || [parseInt(this.height_ / 2, 10), parseInt(this.width_ / 2, 10)];
      this.textColor_ = style.textColor || "black";
      this.textSize_ = style.textSize || 11;
      this.textDecoration_ = style.textDecoration || "none";
      this.fontWeight_ = style.fontWeight || "bold";
      this.fontStyle_ = style.fontStyle || "normal";
      this.fontFamily_ = style.fontFamily || "Arial,sans-serif";
      this.backgroundPosition_ = style.backgroundPosition || "0 0";
    };
  },
  componentWillUnmount:function(){
    // This fixes a bug where clusters wouldn't show up after first render.
    // If a user clicks away from the map page, we must manually clear out the
    // clusterer
    _markerClusterer = null;
    //clear out all infowindows
    var self = this;
    self.props.consumerMarkers.forEach(function(marker){
      if(marker.showInfo){
        self.props.markerInfoClose(marker)
      }
    })
  },
  componentDidUpdate:function(prevProps){
    var self = this;
    if(this.props.centerMarker != null &&
      (prevProps.centerMarker== null || this.props.centerMarker.consumerId != prevProps.centerMarker.consumerId)){
      if(prevProps.centerMarker) {
        this.props.markerInfoClose(prevProps.centerMarker)
      }
      this.centerMarker(this.props.centerMarker, function(){
        self.props.centerMarkerSuccess();
      });
    }

    //HACK: force repaint of clusters when active vechicleId changes
    if(prevProps.activeVehicleId != this.props.activeVehicleId){
      _markerClusterer.repaint();
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
  centerMarker:function(marker, done){
    var self = this;
    this._googleMapComponent.panTo(marker.position);
    // this listener allows us to wait for the clusters to form
    google.maps.event.addListenerOnce(this._googleMapComponent.props.map, 'idle', function(){
      self.props.markerInfoOpen(marker);
      done();
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
  makeFilterControl(controlDiv){

    var filterButton = document.createElement('button');
    filterButton.type="button";
    filterButton.className="btn btn-default btn-sm filter-btn";
    filterButton.setAttribute("data-toggle", "modal");
    filterButton.setAttribute("data-target", "#myModal");
    filterButton.innerHTML="<i class='fa fa-filter'></i>&nbsp;Filter"

    controlDiv.appendChild(filterButton);
  },
  createControls:function(){
    // google-maps-react doesn't support custom controls, so this has to be
    // set up manually
    if(!this.alertDiv){
      var map = this._googleMapComponent.props.map;
      this.alertDiv = document.createElement('div');
      map.controls[google.maps.ControlPosition.TOP_CENTER].push(this.alertDiv);
    }
    this.makeErrorControl(this.alertDiv, this.props.error);


    if(!this.filterDiv){
      var map = this._googleMapComponent.props.map;
      this.filterDiv = document.createElement('div');
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.filterDiv);
      this.makeFilterControl(this.filterDiv);
    }
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
                self.createControls();
              }
            }}
            defaultZoom={12}
            defaultCenter={self.props.optionsIncMarker.position}
            onZoomChanged={self.props.mapZoomChanged}
            defaultOptions={{
              mapTypeControl: true,
              mapTypeControlOptions:{
                  style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                  position: google.maps.ControlPosition.LEFT_BOTTOM
              }
            }}
            controls={self.errorMessage}
            >
            <WMarker
              position={self.props.optionsIncMarker.position}
              title={self.props.optionsIncMarker.title}
              icon={self.props.optionsIncMarker.icon}/>
            {
            this.props.displayClusters.length > 0?
            self.renderClusterInfoWindows(this.props.displayClusters) : null

          }

            {self.props.consumerMarkers.map(function(marker, index){
              return(
                <WMarker
                  key={marker.consumerId}
                  consumerId={marker.consumerId}
                  position={marker.position}
                  title = {marker.name}
                  icon={marker.icon}
                  onClick={self.handleMarkerClick.bind(null,marker.consumerId)}
                  onMouseover={self.props.markerMouseover.bind(null, marker)}
                  onMouseout={self.props.markerMouseout.bind(null, marker)}
                  showInfo = {marker.showInfo}>
                  {marker.showInfo ? self.renderInfoWindow(marker) : null}
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
  );
  }

});

/*
TODO: Total seating calculations should be moved to selectors

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
*/

MapMain.contextTypes = {
  store: React.PropTypes.object.isRequired
};

import { colorMarkers, filterMarkers  } from '../../selectors/markerSelector'
var mapStateToProps = function(state){
  return {
    //neededSeatings : neededSeatings(state.consumers.data),
    //availableSeatings : availableSeatings(state.vehicles.data),
    consumerMarkers: filterMarkers(state),
    optionsIncMarker: state.mapPage.optionsIncMarker,
    consumersToVehiclesMap:state.vehicles.consumersToVehiclesMap,
    vehicles : state.vehicles.data,
    consumers: state.consumers.data,
    consumersIds: state.consumers.ids,
    activeVehicleId : state.mapPage.activeVehicleId,
    markerLoading: state.mapPage.markerLoading,
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
    },
    centerMarkerSuccess:function(){
      dispatch(mActions.centerMarkerSuccess())
    }
  }
}
var WMarker = connect(mapStateToProps, mapDispatchToProps)(WMarkerComponent);
module.exports = connect(mapStateToProps, mapDispatchToProps)(MapMain);
