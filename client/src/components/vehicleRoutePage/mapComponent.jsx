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

var MapMain = React.createClass({
  _googleMapComponent:null,
  getInitialState:function(){
    return {
    }
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

var mapStateToProps = function(state, ownProps){
  var consumerMarkers = state.mapPage.consumerMarkers.filter(function(consumerMarker){
    return state.vehicles.consumersToVehiclesMap[consumerMarker.consumerId] == ownProps.vehicleId
  })
  return {
    consumerMarkers: consumerMarkers,
    optionsIncMarker: state.mapPage.optionsIncMarker,
    consumersToVehiclesMap:state.vehicles.consumersToVehiclesMap,
    displayDirections: state.mapPage.displayDirections,
    vehiclePath: google.maps.geometry.encoding.decodePath(state.directions.morningRoute.overview_polyline.points),
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
    markerMouseout:function(marker){
      dispatch(mActions.markerInfoClose(marker))
    },
    markerInfoClose:function(marker){
      dispatch(mActions.markerInfoClose(marker))
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(MapMain);
