'use strict'

var React = require('react');
var connect = require('react-redux').connect;
//
 var VehiclePanel = require('./vehiclePanelComponent.jsx')
// var UnassignedConsumerPanel = require('./unassignedConsumerPanel.jsx')
// var Directions = require('../directions/directions.jsx')
// var MapPage = require('./mapMain.jsx')
 var ModelActions = require('../../actions/modelActions.js');
 var models = require('../../constants/models.js');
// var PrintDiv = require('./printReport.jsx')
//
 var v_actions = new ModelActions(models.VEHICLES);

 var vehicleUtils = require('../../utils/vehicleUtils');
// var s_actions = new ModelActions(models.SETTINGS);
// var c_actions = new ModelActions(models.CONSUMERS);
//
// var PureRenderMixin = require('react-addons-pure-render-mixin');

// When the map is rendered, we are sure that all needed data
// are properly loaded so we can handle them in 'componentDidMount'

var VehicleRouteComponent = React.createClass({
  // mixins: [PureRenderMixin],
   componentDidMount: function () {
  //   if(this.props.consumersNeedToBeFetched)
  //     this.props.loadConsumers();
    if(this.props.vehiclesNeedToBeFetched)
      this.props.loadVehicles();
  //   if(this.props.settingsNeedToBeFetched)
  //     this.props.loadSettings();
   },
    render: function() {
    var vehicle = this.props.vehicle;
    if(vehicle){

      vehicle = vehicleUtils.setVehicleCapacity(vehicle, this.props.consumers);
      console.log(vehicle);
    var availWheels = vehicle.occupiedWheelchairs < vehicle.wheelchairs ?
      'avail-color' : 'unavail-color';
    var availSeats = vehicle.occupiedSeats < vehicle.seats ?
      'avail-color' : 'unavail-color';
    var availFlexSeats = vehicle.occupiedFlexSeats < vehicle.flexSeats ?
      'avail-color' : 'unavail-color';
    }
    return (
      !this.props.dataLoaded?
        <div id="map-loader">
          <i className="fa fa-refresh fa-spin"></i> Loading data...
        </div>
      :
      <div className="content-wrapper">
        <section className="content">
          <div className="row">
            <div className="col-md-5 col-sm-5 col-xs-5">
              <VehiclePanel vehicle={vehicle}/>
            </div>
            <div className="col-md-7 col-sm-7 col-xs-7">
              <div className="box box-widget map-height">

              </div>
            </div>
          </div>
        </section>
      </div>
      )
    }
});

var mapStateToProps = function(state){
  var vehicleId;
  if(this){
    vehicleId = this.props.params.vehicleId;
  }
  return {
    vehicle:state.vehicles.data[vehicleId],
    vehiclesNeedToBeFetched: state.vehicles.needToBeFetched,
    dataLoaded : state.vehicles.loaded
  }
}
var mapDispatchToProps = function(dispatch) {
  return {
    loadVehicles : function() {
      dispatch(v_actions.fetch());
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(VehicleRouteComponent);
