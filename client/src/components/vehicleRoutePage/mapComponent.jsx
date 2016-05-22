'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var mActions = require('../../actions/mapActions');
var ConsumerMarkerInfo = require('../mapPage/consumerMarkerInfo.jsx');
var GoogleMapLoader = require('react-google-maps').GoogleMapLoader;
var GoogleMap = require('react-google-maps').GoogleMap;
var InfoWindow = require('react-google-maps').InfoWindow;
var Marker = require('react-google-maps').Marker;
var Polyline = require('react-google-maps').Polyline;

var fontawesome = require('fontawesome-markers');
const BASE = require('../../constants/map').SELECTED_ASSIGNED_CONSUMER_COLOR;
const HIGHLIGHT = require('../../constants/map').HIGHLIGHTED_CONSUMER_COLOR;

var wptIcon = {
      path: fontawesome.FLAG,
      scale: 0.4,
      strokeWeight: 1,
      strokeColor: '#111',
      strokeOpacity: 1,
      fillOpacity: 0.9,
      fillColor: BASE
}

var wptIconHighlight = Object.assign({}, wptIcon);
wptIconHighlight.fillColor = HIGHLIGHT;


var MapMain = React.createClass({
  _googleMapComponent:null,

  centerMarker:function(marker){
    this._googleMapComponent.panTo(marker.position);
    if(marker.consumerId.match('wpt_')) {
        this.props.wptInfoOpen(parseInt(marker.consumerId.replace('wpt_','')))
      } else {
        this.props.markerInfoOpen(marker);
      }
  },
  didCenterMarkerChange(newCenterMarker, prevCenterMarker){
    return (newCenterMarker != null &&
      (prevCenterMarker== null || newCenterMarker.consumerId != prevCenterMarker.consumerId))
  },
  componentDidUpdate:function(prevProps){
    var newCenterMarker = this.props.centerMarker;
    var prevCenterMarker = prevProps.centerMarker;
    if(this.didCenterMarkerChange(newCenterMarker, prevCenterMarker)){
      if(prevCenterMarker) {
        let marker = prevCenterMarker;
        if(marker.consumerId.match('wpt_')) {
            this.props.wptInfoClose(parseInt(marker.consumerId.replace('wpt_','')))
          } else {
            this.props.markerInfoClose(marker);
          }
      }
      this.centerMarker(newCenterMarker);
    }
  },
  getInitialState:function(){
    return {
    }
  },
  renderWptInfoWindow(waypoint) {
    return (
    <InfoWindow onCloseclick={this.props.wptInfoClose.bind(null, waypoint.index)}>
      <div>
        <div>{waypoint.name}</div>
        <div>{waypoint.address}</div>
        <div>{waypoint.description}</div>
      </div>
    </InfoWindow>
    )
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
              }
            }}
            defaultZoom={12}
            defaultCenter={self.props.optionsIncMarker.position}
            >
            <Marker
              position={self.props.optionsIncMarker.position}
              title={self.props.optionsIncMarker.title}
              icon={self.props.optionsIncMarker.icon}/>
            {self.props.consumerMarkers.map(function(marker, index){
              return(
                <Marker
                  key={marker.consumerId}
                  position={marker.position}
                  title = {marker.name}
                  icon={marker.icon}
                  onMouseover={self.props.markerMouseover.bind(null, marker)}
                  onMouseout={self.props.markerMouseout.bind(null, marker)}>
                  {marker.showInfo ? self.renderInfoWindow(marker) : null}
                </Marker>
              )
            })}
            {self.props.waypoints.map((w, i) =>
              <Marker
                key={'addWpt_' + i}
                position={w.position}
                title={w.name}
                icon={self.props.highlightedWpt === i ? wptIconHighlight : wptIcon}
                onMouseover={self.props.wptInfoOpen.bind(null, i)}
                onMouseout={self.props.wptInfoClose.bind(null, i)}
                >
                {this.props.wptInfo === i ?
                  self.renderWptInfoWindow(w) : null
                }
              </Marker>
            )}
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

import { colorMarkers } from '../../selectors/markerSelector'
var mapStateToProps = function(state, ownProps){
  var consumerMarkers = colorMarkers(state);
  consumerMarkers = consumerMarkers.filter(function(consumerMarker){
    return state.vehicles.consumersToVehiclesMap[consumerMarker.consumerId] == ownProps.vehicleId
  })
  return {
    waypoints: state.vehicles.data[ownProps.vehicleId].additionalWpts,
    consumerMarkers: consumerMarkers,
    optionsIncMarker: state.mapPage.optionsIncMarker,
    consumersToVehiclesMap:state.vehicles.consumersToVehiclesMap,
    displayDirections: state.mapPage.displayDirections,
    vehiclePath: google.maps.geometry.encoding.decodePath(state.directions.morningRoute.overview_polyline.points),
    centerMarker: state.mapPage.centerMarker,
    wptInfo: state.mapPage.openWptInfo,
    highlightedWpt: state.mapPage.highlightedWpt
  }
}
var mapDispatchToProps = function(dispatch) {
  return {
    markerMouseover:function(marker){
      dispatch(mActions.markerInfoOpen(marker))
    },
    markerInfoOpen:function(marker){
      dispatch(mActions.markerInfoOpen(marker))
    },
    wptInfoOpen: function(index) {
      dispatch(mActions.wptInfoOpen(index))
    },
    wptInfoClose: function(index) {
      dispatch(mActions.wptInfoClose(index))
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
