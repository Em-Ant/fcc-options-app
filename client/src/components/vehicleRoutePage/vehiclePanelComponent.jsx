'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var RouteBody = require('./routeBodyComponent.jsx')
var ModelActions = require('../../actions/modelActions.js');
var models = require('../../constants/models.js');
var actions = require('../../actions/mapActions')
var v_actions = new ModelActions(models.VEHICLES);

var vehicleUtils = require('../../utils/vehicleUtils');

var VehiclePanelComponent = React.createClass({

  render: function() {
    var vehicle = this.props.vehicle
    vehicle = vehicleUtils.setVehicleCapacity(vehicle, this.props.consumers);
    var availWheels = vehicle.occupiedWheelchairs < vehicle.wheelchairs
      ? 'avail-color'
      : 'unavail-color';
    var availSeats = vehicle.occupiedSeats < vehicle.seats
      ? 'avail-color'
      : 'unavail-color';
    var availFlexSeats = vehicle.occupiedFlexSeats < vehicle.flexSeats
      ? 'avail-color'
      : 'unavail-color';

    return (
          <div className="box box-widget map-height">
            <div className="box" >
              <div className="box-header with-border" >

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
              <div className="box-body" >
                <RouteBody vehicleId={vehicle._id}/>
              </div>
              <div className="box-footer">
                <div className="btn-group pull-right">

                  <button
                    className="btn btn-default btn-sm"
                    onClick={this.props.optimizeRoute.bind(null, this.props.vehicleId)}
                    >Optimize Route</button>
                  <button
                    className="btn btn-default btn-sm"
                    onClick={this.props.onDirectionsClick.bind(
                      null,this.props.vehicleId)}
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

var mapStateToProps = function(state, ownProps) {
  return {
    vehicle: state.vehicles.data[ownProps.vehicleId],
    isLoading: state.mapPage.vehicleLoading
  }
}
var mapDispatchToProps = function(dispatch) {
  return {
    optimizeRoute: function(v_id) {
      dispatch(actions.optimizeRoute(v_id));
    },
    onDirectionsClick: function(v_id) {
      dispatch(actions.displayDirections(v_id))
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(VehiclePanelComponent);
