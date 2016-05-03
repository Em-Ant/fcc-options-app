'use strict'

var React = require('react');
var connect = require('react-redux').connect;
//
 var RouteBody = require('./routeBodyComponent.jsx')
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

var VehiclePanelComponent = React.createClass({

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
          <div className="box box-widget map-height">
            <div className={" bus-box box "} >
              <div className="box-header with-border vpanel" >

                  <h4 className="box-title">
                    {vehicle.name} Route
                  </h4>
                <div className="pull-right">
                  {vehicle.needsMedications ?
                    <span
                      className="cust-label med"
                      title="Med Cert. staff needed">
                      <i className="fa fa-medkit"></i>
                    </span> : null}
                  <span
                    className={'cust-label ' + availSeats}
                    title="Seats">
                    <i className="fa fa-male"></i>&nbsp;
                    {vehicle.occupiedSeats}/{vehicle.seats}
                  </span>
                  {vehicle.flexSeats
                    ? <span
                        className={'cust-label ' + availFlexSeats}
                        title="Flex seats: 2 Seats / 1 Wheelchair">
                      <i className="fa fa-exchange"></i>&nbsp;
                    {vehicle.occupiedFlexSeats}/{vehicle.flexSeats}
                  </span>: null}
                  {vehicle.wheelchairs
                    ? <span
                        className={'cust-label ' + availWheels}
                        title="Wheelchairs">
                      <i className="fa fa-wheelchair"></i>&nbsp;
                    {vehicle.occupiedWheelchairs}/{vehicle.wheelchairs}
                  </span>: null}

                  <a href="#"  title="Print Data Table">
                    <i className="fa fa-print cust-btn"></i>
                  </a>
                </div>
              </div>
              <div className="box-body vpanel" >
                <RouteBody vehicle={vehicle}/>
              </div>
              <div className="box-footer vpanel">
                <div className="btn-group pull-right">

                  <button
                    className="btn btn-default btn-sm"

                    >Optimize Route</button>
                  <button
                    className="btn btn-default btn-sm"

                    >Get Directions</button>
                </div>
              </div>
              {this.props.isLoading
                ? <div className="overlay">
                    <i className="fa fa-refresh fa-spin"></i>
                  </div>
                : null}
            </div>

          </div>
      )
    }
});

var mapStateToProps = function(state){
  return{

  }
}
var mapDispatchToProps = function(dispatch) {
  return {

  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(VehiclePanelComponent);
